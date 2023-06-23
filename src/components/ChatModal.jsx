import { FaTimes } from 'react-icons/fa'
import { setGlobalState, useGlobalState } from '../store'
import Identicon from 'react-identicons'
import { truncate } from '../store'
import { getMessages, sendMessage, listenForMessage } from '../services/chat'
import { useState, useEffect } from 'react'

const ChatModal = ({ movie }) => {
  const [chatModal] = useGlobalState('chatModal')
  const [message, setMessage] = useState('')
  const [messages] = useGlobalState('messages')

  const onSendMessage = async (e) => {
    e.preventDefault()
    if (!message) return

    await sendMessage('guid_' + movie.id, message).then((msg) => {
      setGlobalState('messages', (prevState) => [...prevState, msg])
      setMessage('')
      scrollToEnd()
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      await getMessages('guid_' + movie.id).then((msgs) => {
        setGlobalState('messages', msgs)
        scrollToEnd()
      })
      await listenForMessage('guid_' + movie.id).then((msg) => {
        setGlobalState('messages', (prevState) => [...prevState, msg])
        scrollToEnd()
      })
    }

    fetchData()
  }, [])

  const scrollToEnd = () => {
    const elmnt = document.getElementById('messages-container')
    elmnt.scrollTop = elmnt.scrollHeight
  }

  return (
    <div
      className={`fixed -top-4 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${chatModal}`}
    >
      <div className="bg-slate-200 shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-3/5 h-[30rem] p-6 relative">
        <div className="flex justify-between items-center">
          <h2 className="capitalize">{movie.name}: Chat Room</h2>
          <FaTimes
            className="cursor-pointer"
            onClick={() => setGlobalState('chatModal', 'scale-0')}
          />
        </div>

        <div
          id="messages-container"
          className="overflow-y-scroll overflow-x-hidden h-[20rem] scroll-bar mt-5 px-4 py-3 bg-gray-300 rounded-md"
        >
          <div className="w-11/12">
            {messages.map((msg, i) => (
              <Message message={msg.text} uid={msg.sender.uid} key={i} />
            ))}
          </div>
        </div>

        <form className="h-[4rem] w-full mt-4" onSubmit={onSendMessage}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="h-full w-full p-5 focus:outline-none focus:ring-0 rounded-md border-none
            bg-[rgba(0,0,0,0.7)] text-white placeholder-white"
            placeholder="Leave a message..."
          />
        </form>
      </div>
    </div>
  )
}

const Message = ({ message, uid }) => {
  return (
    <div className="flex justify-start items-center space-x-3 space-y-3">
      <div className="flex items-center space-x-2">
        <Identicon string={uid} size={15} className="rounded-full" />
        <p className="font-semibold text-sm">{truncate(uid, 4, 4, 11)}</p>
      </div>
      <p className="text-xs">{message}</p>
    </div>
  )
}

export default ChatModal
