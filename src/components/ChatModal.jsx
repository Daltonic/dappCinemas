import { FaTimes } from "react-icons/fa";
import { setGlobalState, useGlobalState } from "../store";
import Identicon from "react-identicons";
import { truncate } from "../store";
import { getMessages, sendMessage, listenForMessage } from "../services/Chat";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChatModal = () => {
  const [chatModal] = useGlobalState("chatModal");
  const [message, setMessage] = useState("");
  const [messages] = useGlobalState("messages");
  const { id } = useParams();

  const onSendMessage = async (e) => {
    e.preventDefault();
    if (!message) return;

    new Promise(async (resolve, reject) => {
      await sendMessage(`guid_${id}`, message)
        .then((msg) => {
          setGlobalState("messages", (prevMessages) => [...prevMessages, msg]);
          setMessage("");
          resolve(msg);
        })
        .catch(() => reject());
    });
  };

  useEffect(async () => {
    await getMessages(`guid_${id}`).then((msgs) => {
      if (msgs.length > 0) {
        setGlobalState("messages", msgs);
      } else {
        console.log("empty");
      }
    });
    await listenForMessage(`guid_${id}`).then((msg) => {
      setGlobalState("messages", (prevMessages) => [...prevMessages, msg]);
    });
  }, []);

  const handleClose = () => {
    setGlobalState("chatModal", "scale-0");
  };

  return (
    <div
      className={`fixed -top-4 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${chatModal}`}
    >
      <div className="bg-slate-200 shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-3/5 h-[30rem] p-6  relative">
        <div className="flex justify-between items-center">
          <h2 className="capitalize">Join the live chat session</h2>
          <FaTimes className="cursor-pointer" onClick={handleClose} />
        </div>

        <div className="overflow-y-scroll overflow-x-hidden h-[20rem] scroll-bar mt-5 px-4 py-3">
          <div className="w-11/12">
            {messages.length > 0 ? (
              messages.map((msg, i) => (
                <Message message={msg.text} uid={msg.sender.uid} key={i} />
              ))
            ) : (
              <div> Leave a message </div>
            )}
          </div>
        </div>

        <form
          className="absolute bottom-5 left-[2%] h-[2rem] w-11/12 "
          onSubmit={onSendMessage}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="h-full w-full py-5 focus:outline-none focus:ring-0 rounded-md border-none bg-[rgba(0,0,0,0.7)] text-white placeholder-white"
            placeholder="Leave a message..."
          />
        </form>
      </div>
    </div>
  );
};

const Message = ({ message, uid }) => {
  return (
    <div className="flex items-center space-x-4 mb-1">
      <div className="flex items-center space-x-2">
        <Identicon string={uid} size={15} className="rounded-full" />
        <p className="font-bold text-sm">{truncate(uid, 4, 4, 11)}</p>
      </div>
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default ChatModal;

{
  /* salt page unable inject planet clap blame legend wild blade wine casual */
}
