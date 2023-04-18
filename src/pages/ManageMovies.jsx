import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PublishIcon from "@mui/icons-material/Publish";
import AssignmentTurnedIn from "@mui/icons-material/AssignmentTurnedIn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon  from "@mui/icons-material/People";
import {
  getMovies,
  movieSlots,
  publishTimeSlot,
  deleteSlot,
  withdraw,
  getTicketHolders,
} from "../services/Blockchain.services";
import { useGlobalState, setGlobalState, truncate } from "../store";
import UpdateMovie from "../components/UpdateMovie";
import DeleteMovie from "../components/DeleteMovie";
import AddSlot from "../components/AddSlot";
import moment from "moment";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import Identicon from 'react-identicons'

const ManageMovies = () => {
  const [loaded, setLoaded] = useState(false);
  const [movies] = useGlobalState("movies");
  const [singleMovie] = useGlobalState("singleMovie");

  useEffect(async () => {
    await getMovies().then(() => setLoaded(true));
  }, []);

  return loaded ? (
    <div className="w-full min-h-[89vh] ">
      <h3 className="my-3 p-3 text-3xl font-bold">Manage movies</h3>
      <div className="mt-9 px-3">
        {movies.length > 0 ? (
          movies.map((movie, index) =>
            !movie.deleted ? (
              <MovieWithDetails key={index} movie={movie} />
            ) : null
          )
        ) : (
          <div className="text-lg">No movies found</div>
        )}
      </div>
      {singleMovie ? (
        <>
          <UpdateMovie />
          <DeleteMovie />
          <AddSlot />
        </>
      ) : null}
    </div>
  ) : null;
};

export default ManageMovies;

const MovieWithDetails = ({ movie }) => {
  const [slotsForMovie] = useGlobalState("slotsForMovie");
  const [filteredSlots, setFilteredSlots] = useState([]);

  

  useEffect(async () => {
    await movieSlots(movie.id);
  }, [slotsForMovie]);

  useEffect(() => {
    const filteredTimeSlots = slotsForMovie.filter((slot) => !slot.deleted);
    setFilteredSlots(filteredTimeSlots);
  }, [slotsForMovie]);

  const handleOpenUpdateMovie = () => {
    setGlobalState("singleMovie", movie);
    setGlobalState("updateMovieModal", "scale-100");
  };

  const handleOpenDeleteMovie = () => {
    setGlobalState("singleMovie", movie);
    setGlobalState("deleteMovieModal", "scale-100");
  };

  const handleOpenAddSlotMovie = () => {
    setGlobalState("singleMovie", movie);
    setGlobalState("addSlotModal", "scale-100");
  };

  const handleOpenSlots = ()=> {
    setGlobalState('slotsModal','scale-100')
  }

  const handleOpenTicketsModal = ()=> {
    setGlobalState("ticketsModal",'scale-100');
  }

  

  return (
    <div className="w-5/6 shadow-md rounded-lg border-2 border-gray-300 my-5">
      <div className="flex">
        <div className="w-1/2 p-3">
          <img
            src={movie.imageUrl}
            alt=""
            className="w-full rounded-lg object-cover h-64"
          />
        </div>
        <div className="w-1/2 p-3">
          <h3 className="text-xl font-bold">{movie.name}</h3>
          <div className="flex space-x-2 my-2">
            {movie.genre.split(",").map((genre, i) => (
              <button
                className="px-4 py-1 text-white rounded-md bg-cyan-700"
                key={i}
              >
                {genre}
              </button>
            ))}
          </div>
          <p className="my-3">{movie.description}</p>
          <div className="flex space-x-3 my-2 flex-wrap">
            <button
              className="border-2 border-gray-300 flex items-center space-x-3 p-1 rounded-md cursor-pointer text-sm"
              onClick={handleOpenUpdateMovie}
            >
              <EditIcon className="text-cyan-700" /> Update
            </button>

            <button
              className="border-2 border-gray-300 flex items-center space-x-3 p-1 rounded-md cursor-pointer text-sm"
              onClick={handleOpenDeleteMovie}
            >
              <DeleteIcon className="text-red-700" /> Delete
            </button>
            <button
              className="border-2 border-gray-300 flex items-center space-x-3 p-1 rounded-md cursor-pointer text-sm"
              onClick={handleOpenAddSlotMovie}
            >
              <AddIcon className="text-gray-600" /> Add slot
            </button>
          </div>

          <div className="flex space-x-3 my-2 flex-wrap">
            <button
              className="border-2 border-gray-300 flex items-center space-x-3 p-1 rounded-md cursor-pointer text-sm"
              onClick={handleOpenSlots}
            >
              <CalendarMonthIcon className="text-gray-600" /> View slot
            </button>
            <button
              className="border-2 border-gray-300 flex items-center space-x-3 p-1 rounded-md cursor-pointer text-sm"
              onClick={handleOpenTicketsModal}
            >
              <PeopleIcon className="text-gray-600" /> ticket buyers
            </button>
          </div>
        </div>
      </div>
      <Slots filteredSlots={filteredSlots} movie={movie} />
      <TicketBuyers filteredSlots={filteredSlots} />
    </div>
  );
};

const Slots = ({ filteredSlots, movie }) => {
  const [slotsModal] = useGlobalState("slotsModal");
  const handleClose = ()=> {
    setGlobalState("slotsModal",'scale-0');
  }

  function convertTimestampToTime(timestamp) {
    return moment(timestamp).format("h:mm A");
  }
  function formatDateWithDayName(timestamp) {
    return moment(timestamp).format("dddd, MMMM Do YYYY");
  }

   const handlePublish = async (id, day) => {
     const params = {
       id,
       movieId: movie.id,
       day,
     };
     await toast.promise(
       new Promise(async (resolve, reject) => {
         await publishTimeSlot(params)
           .then(async () => {
             resolve();
           })
           .catch(() => reject());
       }),
       {
         pending: "Approve transaction...",
         success: "slot published successfully 👌",
         error: "Encountered error 🤯",
       }
     );
   };
   const handleDelete = async (id) => {
     const params = {
       id,
       movieId: movie.id,
     };
     await toast.promise(
       new Promise(async (resolve, reject) => {
         await deleteSlot(params)
           .then(async () => {
             resolve();
           })
           .catch(() => reject());
       }),
       {
         pending: "Approve transaction...",
         success: "slot deleted successfully 👌",
         error: "Encountered error 🤯",
       }
     );
   };

   const handleClaim = async (id) => {
     const params = {
       id,
       movieId: movie.id,
     };
     await toast.promise(
       new Promise(async (resolve, reject) => {
         await withdraw(params)
           .then(async () => {
             resolve();
           })
           .catch(() => reject());
       }),
       {
         pending: "Approve transaction...",
         success: "funds claimed successfully 👌",
         error: "Encountered error 🤯",
       }
     );
   };



  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
      bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${slotsModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col overflow-y-scroll">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Slots</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={handleClose}
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center rounded-xl mt-5 mb-5">
            <div className="flex justify-center items-center rounded-full overflow-hidden h-10 w-64 shadow-md shadow-slate-300 p-4">
              <p className="text-slate-700">
                {" "}
                Dapp <span className="text-red-700">Cinemas</span>
              </p>
            </div>
          </div>
          <div>
            {filteredSlots.length > 0 ? (
              <>
                {filteredSlots.map((slot, i) => (
                  <div className="my-4 px-4" key={i}>
                    <h3 className="text-gray-700">
                      {formatDateWithDayName(slot.day)}
                    </h3>
                    <div className="flex space-x-2 items-center">
                      <h4>{convertTimestampToTime(slot.startTime)}</h4>
                      <div className="w-3 h-[0.3px] bg-black"></div>
                      <h4>{convertTimestampToTime(slot.endTime)}</h4>
                    </div>

                    <div className="flex items-center space-x-2 my-2">
                      <button
                        className="border-2 border-gray-300 flex items-center space-x-3 p-1 rounded-md cursor-pointer text-sm"
                        onClick={() => handleDelete(slot.id)}
                      >
                        <DeleteIcon className="text-red-700 cursor-pointer" />{" "}
                        delete
                      </button>
                      {!slot.published ? (
                        <button
                          className="border-2 border-gray-300 flex items-center space-x-3 p-1 rounded-md cursor-pointer text-sm"
                          onClick={() => handlePublish(slot.id, slot.day)}
                        >
                          <PublishIcon className="text-cyan-600 cursor-pointer text-2xl" />{" "}
                          publish
                        </button>
                      ) : null}

                      {new Date().getTime() >
                        new Date(slot.endTime).getTime() && slot.seating > 0 ? (
                        <button
                          className="border-2 border-gray-300 flex items-center space-x-3 p-1 rounded-md cursor-pointer text-sm"
                          onClick={() => handleClaim(slot.id)}
                        >
                          <AssignmentTurnedIn className="text-green-500" />{" "}
                          claim
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              "No slots available"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TicketBuyers = ({ filteredSlots })=> {
  const [ticketsModal] = useGlobalState("ticketsModal");

  const handleClose = ()=> {
    setGlobalState("ticketsModal",'scale-0');
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
      bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${ticketsModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col overflow-y-scroll">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Slots</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={handleClose}
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center rounded-xl mt-5 mb-5">
            <div className="flex justify-center items-center rounded-full overflow-hidden h-10 w-64 shadow-md shadow-slate-300 p-4">
              <p className="text-slate-700">
                {" "}
                Dapp <span className="text-red-700">Cinemas</span>
              </p>
            </div>
          </div>
            {
              filteredSlots.length > 0 ? (
                filteredSlots.map((slot,i)=>(
                  <TicketBuyersBySlots key={i} movieId={slot.movieId} id={slot.id} startTime={slot.startTime} endTime={slot.endTime} day={slot.day}/>
                ))
              ) : 'No slots yet'
            }
        </form>
      </div>
    </div>
  )
}

const TicketBuyersBySlots = ({ movieId,id, startTime, endTime, day })=> {
  const [ticketHolders] = useGlobalState("ticketHolders");
  const [filteredTicketHolders,SetFilteredTicketHolders] = useState([])
  const [loaded,setLoaded] = useState(false)

  useEffect(async ()=>{
    await getTicketHolders(movieId,id).then(()=>setLoaded(true))
  },[])

  useEffect(()=>{
    const filteredBuyers = ticketHolders.filter((buyer) => !buyer.refunded && buyer.slotId == id);
    SetFilteredTicketHolders(filteredBuyers);
  },[ticketHolders])

  function convertTimestampToTime(timestamp) {
    return moment(timestamp).format("h:mm A");
  }
  function formatDateWithDayName(timestamp) {
    return moment(timestamp).format("dddd, MMMM Do YYYY");
  }
  
  return loaded ? (
    <div>
      {filteredTicketHolders.length > 0 ? (
        filteredTicketHolders.map((buyer, i) => (
          <div>
            <div className="my-4 px-4" key={i}>
              <h3 className="text-gray-700">{formatDateWithDayName(day)}</h3>
              <div className="flex space-x-2 items-center">
                <h4>{convertTimestampToTime(startTime)}</h4>
                <div className="w-3 h-[0.3px] bg-black"></div>
                <h4>{convertTimestampToTime(endTime)}</h4>
              </div>
            </div>
            <div className="flex space-x-3 px-3" key={i}>
              <Identicon string={buyer.owner} size={25} />
              <p>{truncate(buyer.owner, 4, 4, 11)}</p>
            </div>
          </div>
        ))
      ) : (
        <div>
          <div className="my-4 px-4">
            <h3 className="text-gray-700">{formatDateWithDayName(day)}</h3>
            <div className="flex space-x-2 items-center">
              <h4>{convertTimestampToTime(startTime)}</h4>
              <div className="w-3 h-[0.3px] bg-black"></div>
              <h4>{convertTimestampToTime(endTime)}</h4>
            </div>
          </div>
          <h3 className="px-3">No ticket buyers yet.</h3>
        </div>
      )}
    </div>
  ) : null;
}