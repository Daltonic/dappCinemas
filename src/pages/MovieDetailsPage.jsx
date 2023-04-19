import {useEffect, useState} from "react";
import Emancipation from "../asset/emancipation.jpg";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { getMovie, movieSlots, buyTicket, getOwner } from "../services/Blockchain.services";
import { setGlobalState, useGlobalState } from "../store";
import { useParams } from "react-router-dom";
import moment from "moment";
import { toast } from 'react-toastify'
import ChatIcon from "@mui/icons-material/Chat";
import ChatCommand from "../components/ChatCommand";
import AuthChat from "../components/AuthChat";
import ChatModal from "../components/ChatModal";
import { getGroup } from "../services/Chat";

const MovieDetailsPage = () => {
  const [loaded,setLoaded] = useState(false)
  const [movie] = useGlobalState('movie')
  const [slotsForMovie] = useGlobalState('slotsForMovie')
  const [group] = useGlobalState('group')
  const [currentUser] = useGlobalState("currentUser");
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [filteredSlots,setFilteredSlots] = useState([])
  const { id } = useParams()
  const [isOnline, setIsOnline] = useState(false);

  useEffect(async()=>{
    
    await getMovie(id).then(async ()=>{
      await movieSlots(id).then(()=>setLoaded(true))
    })
    await getGroup(`guid_${id}`).then((Group) => {
      setGlobalState("group", Group);
    });
  },[])


  useEffect(()=>{
    setIsOnline(currentUser?.uid.toLowerCase() == connectedAccount);
  },[currentUser])

  const handleChat = () => {
    if (isOnline && (!group || !group.hasJoined)) {
      setGlobalState("chatCommandModal", "scale-100");
    } else if (isOnline && group && group.hasJoined) {
      setGlobalState("chatModal", "scale-100");
    } else{
      setGlobalState("authChatModal", "scale-100");
      alert(currentUser?.uid.toLowerCase() + connectedAccount)
    }
  };

  useEffect(() => {
      const filteredTimeSlots = slotsForMovie.filter(
        (slot) => !slot.deleted && slot.published
      );
      setFilteredSlots(filteredTimeSlots);
  }, [slotsForMovie]);


  function convertTimestampToTime(timestamp) {
    return moment(timestamp).format("h:mm A");
  }
  function formatDateWithDayName(timestamp) {
    return moment(timestamp).format("dddd, MMMM Do YYYY");
  }

  const handleBuyTicket = async (day, Id, ticketCost)=> {
      const params = {
        movieId: id,
        day,
        id: Id,
        ticketCost
      }
        await toast.promise(
          new Promise(async (resolve, reject) => {
            await buyTicket(params)
              .then(async () => {
                movieSlots(id)
                resolve();
              })
              .catch(() => reject());
          }),
          {
            pending: "Approve transaction...",
            success: "ticket bought successfully 👌",
            error: "Encountered error 🤯",
          }
        );
  }

  return loaded ? (
    <div className="flex flex-col w-full p-4 space-y-4">
      <div className="flex w-full ">
        <img src={movie.imageUrl} className="w-full object-cover h-[30rem]" />
      </div>
      <div className="flex flex-col space-y-4 align-center text-center w-full">
        <div className="flex flex-col space-y-2">
          <h3 className="font-black text-2xl">{movie.name}</h3>
          <div className="flex space-x-2 my-2 justify-center">
            {movie.genre.split(",").map((genre, i) => (
              <button
                className="px-4 py-1 text-white rounded-md bg-cyan-700"
                key={i}
              >
                {genre}
              </button>
            ))}
          </div>
          <p className="text-gray-700 my-5 w-3/6 text-center mx-auto font-semibold">
            {movie.description}
          </p>
          <button
            className="border-2 border-gray-300 flex items-center space-x-3 p-1 rounded-md cursor-pointer mx-auto"
            onClick={handleChat}
          >
            <ChatIcon /> &nbsp; Chats
          </button>
        </div>

        {filteredSlots.length > 0
          ? filteredSlots.map((slot, i) => (
              <>
                <div
                  key={i}
                  className="flex text-center align-center mx-auto space-x-8 my-10"
                >
                  <p className="font-bold">
                    DATE:{" "}
                    <span className="font-thin">
                      {formatDateWithDayName(slot.day)}
                    </span>
                  </p>
                  <CalendarMonthIcon className="text-gray-600" />
                </div>
                <div className="grid grid-cols-1  gap-4 p-2">
                  <div className="flex flex-col space-y-4 items-center justify-center  md:flex-row align-center  space-x-4  bg-gray-300 rounded-md p-2  m-auto w-full md:w-2/3">
                    <div>
                      {" "}
                      <p>{convertTimestampToTime(slot.startTime)}</p>
                    </div>
                    <div className="flex items-center">
                      <span>{slot.seatings}</span>/<span>{slot.capacity}</span>
                      <sub>spaces</sub>
                    </div>
                    <div>
                      {slot.seatings >= slot.capacity ? (
                        <button className="bg-transparent border-2 border-black text-gray-600 font-bold px-4 py-1">
                          Filled up
                        </button>
                      ) : (
                        <button
                          className="bg-black py-1 px-4 text-xs font-bold text-white border-2 border-black hover:bg-transparent  rounded-full hover:border-2 hover:border-red-600 hover:text-black "
                          onClick={() =>
                            handleBuyTicket(slot.day, slot.id, slot.ticketCost)
                          }
                        >
                          BUY TICKET
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ))
          : "No slots yet"}
      </div>
      <ChatCommand movie={movie} />
      <AuthChat />
      <ChatModal />
    </div>
  ) : null;
}

export default MovieDetailsPage;
