import React from 'react'
import Emancipation from '../../asset/emancipation.jpg'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

function MovieDetailsPage() {
  return (
    <div className="flex flex-col w-full p-4 space-y-4">
      <div className="flex w-full ">
        <img src={Emancipation} className="h-80 w-full object-cover" />
      </div>
      <div className="flex flex-col space-y-4 align-center text-center w-full">
        <div className="flex flex-col space-y-2">
          <h3 className="font-black text-2xl">Emancipation</h3>
          <p className="text-gray-700">Crime,Drama,Thrill</p>
          <p className="text-gray-700">Runtime: 2h 2min</p>
        </div>
        <div className="flex text-center align-center m-auto space-x-8">
          <p className="font-bold">
            DATE: <span className="font-thin">February 9, Thursday</span>
          </p>
          <CalendarMonthIcon className="text-gray-600" />
        </div>
        <div className="grid grid-cols-1  gap-4 p-2">
          <div className="flex align-center items-center justify-center  space-x-4  bg-gray-300 rounded-md p-2  m-auto w-full md: 4/5 md:w-2/3">
            <p className="">11:30 AM</p>
            <sub>
              5/10 <span>spaces</span>
            </sub>
            <button
              className="bg-black py-1 px-4 text-xs font-bold text-white border-2 border-black
            hover:bg-transparent  rounded-full
             hover:border-2 hover:border-red-600 hover:text-black "
            >
              BUY TICKET
            </button>
          </div>

          <div className="flex align-center items-center justify-center  space-x-4  bg-gray-300 rounded-md p-2  m-auto w-full md: 4/5 md:w-2/3">
            <p>2:30 PM</p>
            <sub>
              5/10 <span>spaces</span>
            </sub>
            <button
              className="bg-black py-1 px-4 text-xs font-bold text-white border-2 border-black
            hover:bg-transparent  rounded-full
             hover:border-2 hover:border-red-600 hover:text-black "
            >
              BUY TICKET
            </button>
          </div>

          <div className="flex align-center items-center justify-center  space-x-4  bg-gray-300 rounded-md p-2  m-auto w-full md: 4/5 md:w-2/3">
            <p>4:15 PM</p>
            <sub>
              5/10 <span>spaces</span>
            </sub>
            <button
              className="bg-black py-1 px-4 text-xs font-bold text-white border-2 border-black
            hover:bg-transparent  rounded-full
             hover:border-2 hover:border-red-600 hover:text-black "
            >
              BUY TICKET
            </button>
          </div>

          <div className="flex align-center items-center justify-center  space-x-4  bg-gray-300 rounded-md p-2  m-auto w-full md: 4/5 md:w-2/3">
            <p>8:30 PM</p>
            <sub>
              5/10 <span>spaces</span>
            </sub>
            <button
              className="bg-black py-1 px-4 text-xs font-bold text-white border-2 border-black
            hover:bg-transparent  rounded-full
             hover:border-2 hover:border-red-600 hover:text-black "
            >
              BUY TICKET
            </button>
          </div>
        </div>

        <div className="flex align-center items-center justify-center mb-2">
          <h4 className="font-black text-2xl">Recent Bookings</h4>
        </div>
        <div className="grid grid-cols-1  gap-4 p-2">
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

          <div className="flex flex-col bg-gray-300 rounded-md p-2  m-auto w-full md: 4/5 md:w-2/3">
            <div className="flex space-x-4 justify-center p-2">
              <p>0xe23....12df</p>
              <p>11:30AM - 1:30PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailsPage
