import {useState,useEffect} from 'react'
import AntMan from '../asset/emancipation.jpg'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PublishIcon from "@mui/icons-material/Publish";
import AssignmentTurnedIn  from '@mui/icons-material/AssignmentTurnedIn';
import {
  getMovies,
  movieSlots,
  publishTimeSlot,
  deleteSlot,
  withdraw
} from "../services/Blockchain.services";
import { useGlobalState, setGlobalState } from '../store';
import UpdateMovie from '../components/UpdateMovie';
import DeleteMovie from '../components/DeleteMovie';
import AddSlot from '../components/AddSlot';
import moment from 'moment'
import { toast } from 'react-toastify'

const ManageMovies = () => {
  const [loaded,setLoaded] = useState(false)
  const [movies] = useGlobalState('movies')
  const [singleMovie] = useGlobalState("singleMovie");

  useEffect(async()=>{
    await getMovies().then(()=>setLoaded(true))
    
  },[])

  

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
}

export default ManageMovies

const MovieWithDetails = ({movie})=> {
  const [slotsForMovie] = useGlobalState("slotsForMovie");
  const [filteredSlots, setFilteredSlots] = useState([]);
  

  function convertTimestampToTime(timestamp) {
    return moment(timestamp).format("h:mm A");
  }
  function formatDateWithDayName(timestamp) {
    return moment(timestamp).format("dddd, MMMM Do YYYY");
  }

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
  }

  const handleOpenDeleteMovie = () => {
    setGlobalState("singleMovie", movie);
    setGlobalState("deleteMovieModal", "scale-100");
  }

  const handleOpenAddSlotMovie = () => {
    setGlobalState("singleMovie", movie);
    setGlobalState("addSlotModal", "scale-100");
  }

  const handlePublish = async (id,day)=> {
    const params = {
      id,
      movieId: movie.id,
      day
    }
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
  }
  const handleDelete = async (id)=> {
    const params = {
      id,
      movieId: movie.id
    }
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
  }

  const handleClaim = async (id)=> {
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
  }

    return (
      <div className="w-5/6 border-2 border-gray-300 shadow-lg rounded-lg my-5">
        <div className="flex">
          <div className="w-1/2 p-3">
            <img
              src={movie.imageUrl}
              alt=""
              className="w-full rounded-lg object-cover h-64"
            />
          </div>

          <div className="w-1/2 p-4">
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
            <div className="flex space-x-3">
              <button
                className="border-2 border-gray-300 flex items-center space-x-3 p-2 rounded-md"
                onClick={handleOpenUpdateMovie}
              >
                <EditIcon className="text-cyan-700" /> Update
              </button>

              <button
                className="border-2 border-gray-300 flex items-center space-x-3 p-2 rounded-md"
                onClick={handleOpenDeleteMovie}
              >
                <DeleteIcon className="text-red-700" /> Delete
              </button>
              <button
                className="border-2 border-gray-300 flex items-center space-x-3 p-2 rounded-md"
                onClick={handleOpenAddSlotMovie}
              >
                <AddIcon className="text-gray-600" /> Add slot
              </button>
            </div>
          </div>
        </div>
        <div className="px-3">
          {filteredSlots.length > 0 ? (
            <>
              <h1 className="text-xl font-bold mx-4">Slots</h1>
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
                      className="py-1 px-2 border-[1px] border-gray-300 rounded-md"
                      onClick={() => handleDelete(slot.id)}
                    >
                      <DeleteIcon className="text-red-700 cursor-pointer" />{" "}
                      delete
                    </button>
                    {!slot.published ? (
                      <button
                        className="py-1 px-2 border-[1px] border-gray-300 rounded-md"
                        onClick={() => handlePublish(slot.id, slot.day)}
                      >
                        <PublishIcon className="text-cyan-600 cursor-pointer text-2xl" />{" "}
                        publish
                      </button>
                    ) : null}

                    {new Date().getTime() > new Date(slot.endTime).getTime() &&
                    slot.seating > 0 ? (
                      <button
                        className="py-1 px-2 border-[1px] border-gray-300 rounded-md"
                        onClick={() => handleClaim(slot.id)}
                      >
                        <AssignmentTurnedIn className="text-green-500" /> claim
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
    );
}