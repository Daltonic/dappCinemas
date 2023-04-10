import {useEffect, useState} from "react";
import Emancipation from "../asset/emancipation.jpg";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { getMovie } from "../services/Blockchain.services";
import { useGlobalState } from "../store";
import { useParams } from "react-router-dom";

const MovieDetailsPage = () => {
  const [loaded,setLoaded] = useState(false)
  const [movie] = useGlobalState('movie')
  const { id } = useParams()

  useEffect(async()=>{
    await getMovie(id).then(()=>setLoaded(true))
  },[])

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
          <p className="text-gray-700 my-5 w-3/6 text-center mx-auto font-semibold">{movie.description}</p>
          <p className="text-gray-700">Runtime: 2h 2min</p>
        </div>

        <div className="flex text-center align-center m-auto space-x-8">
          <p className="font-bold">
            DATE: <span className="font-thin">February 9, Thursday</span>
          </p>
          <CalendarMonthIcon className="text-gray-600" />
        </div>
        <div className="grid grid-cols-1  gap-4 p-2 ">
          <div className="flex flex-col space-y-4 align-center items-center justify-center  md:flex-row align-center  space-x-4  bg-gray-300 rounded-md p-2  m-auto w-full md: 4/5 md:w-2/3">
            <div>
              {" "}
              <p>11:30 AM</p>
            </div>
            <div>
              {" "}
              <span>
                5/10 <sub>spaces</sub>
              </span>
            </div>
            <div>
              <button
                className="bg-black py-1 px-4 text-xs font-bold text-white border-2 border-black
            hover:bg-transparent  rounded-full
             hover:border-2 hover:border-red-600 hover:text-black "
              >
                BUY TICKET
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-4 align-center items-center justify-center  md:flex-row align-center  space-x-4  bg-gray-300 rounded-md p-2  m-auto w-full md: 4/5 md:w-2/3">
            <div>
              {" "}
              <p>2:30 PM</p>
            </div>
            <div>
              <span>
                5/10 <sub>spaces</sub>
              </span>
            </div>
            <div>
              <button
                className="bg-black py-1 px-4 text-xs font-bold text-white border-2 border-black
            hover:bg-transparent  rounded-full
             hover:border-2 hover:border-red-600 hover:text-black "
              >
                BUY TICKET
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-4 align-center items-center justify-center  md:flex-row align-center  space-x-4  bg-gray-300 rounded-md p-2  m-auto w-full md: 4/5 md:w-2/3">
            <div>
              <p>4:15 PM</p>
            </div>
            <div>
              {" "}
              <span>
                5/10 <sub>spaces</sub>
              </span>
            </div>
            <div>
              <button
                className="bg-black py-1 px-4 text-xs font-bold text-white border-2 border-black
            hover:bg-transparent  rounded-full
             hover:border-2 hover:border-red-600 hover:text-black "
              >
                BUY TICKET
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-4 align-center items-center justify-center  md:flex-row align-center  space-x-4  bg-gray-300 rounded-md p-2  m-auto w-full md: 4/5 md:w-2/3">
            <div>
              <p>8:30 PM</p>
            </div>
            <div>
              <span>
                5/10 <sub>spaces</sub>
              </span>
            </div>
            <div>
              <button
                className="bg-black py-1 px-4 text-xs font-bold text-white border-2 border-black
            hover:bg-transparent  rounded-full
             hover:border-2 hover:border-red-600 hover:text-black "
              >
                BUY TICKET
              </button>
            </div>
          </div>
        </div>

        <div className="flex align-center items-center justify-center mb-2">
          <h4 className="font-black text-2xl">Recent Bookings</h4>
        </div>
        <div className="grid grid-cols-1  gap-4 p-2">
          <div className="flex flex-col bg-gray-300 rounded-md p-2  m-auto w-full md: 4/5 md:w-2/3">
            <div className="flex flex-col space-y-4 align-center items-center justify-center  md:flex-row align-center  space-x-4 ">
              <p>0xe23....12df</p>
              <p>11:30AM - 1:30PM</p>
            </div>
          </div>

          <div className="flex flex-col bg-gray-300 rounded-md p-2  m-auto w-full md: 4/5 md:w-2/3">
            <div className="flex space-x-4 justify-center p-2">
              <p>0xe23....12df</p>
              <p>11:30AM - 1:30PM</p>
            </div>
          </div>

          <div className="flex flex-col bg-gray-300 rounded-md p-2  m-auto w-full md: 4/5 md:w-2/3">
            <div className="flex space-x-4 justify-center p-2">
              <p>0xe23....12df</p>
              <p>11:30AM - 1:30PM</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  ) : null;
}

export default MovieDetailsPage;
