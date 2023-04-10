import {useState,useEffect} from 'react'
import AntMan from '../asset/emancipation.jpg'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getMovies } from '../services/Blockchain.services';
import { useGlobalState, setGlobalState } from '../store';
import UpdateMovie from '../components/UpdateMovie';
import DeleteMovie from '../components/DeleteMovie';
import AddSlot from '../components/AddSlot';

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
      </div>
    );
}