import React from 'react'
import ExploreIcon from '@mui/icons-material/Explore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Avatar from '../../asset/Avatar.jpg'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="hidden sm:flex">
      <div className=" w-64 h-screen bg-transparent border-r-2 border-grey-200">
        <div className="flex flex-col py-4 px-8 ">
          <Link to="/">
            dapp.<span className="text-red-500">Cinemas</span>
          </Link>
          <div className="mt-8">
            <h6 className="text-xs mb-4">News Feed</h6>
            <div className="flex flex-col space-y-2 ">
             <div className=' border-l-2 transparent hover:border-l-2 hover:border-red-400'>
             <Link
                to="/"
                className=" ml-8 cursor-pointer text-gray-600 hover:text-red-700 "
              >
                <ExploreIcon />
                <span className="ml-4 text-sm text-gray-700">Browse</span>
              </Link>
             </div>
             <div className='border-l-2 transparent hover:border-l-2 hover:border-red-400'>
             <Link
                to="/moviedetails"
                className=" ml-8 cursor-pointer text-gray-600 hover:text-red-700"
              >
                <FavoriteIcon />
                <span className="ml-4 text-sm text-gray-700">Watchlist</span>
              </Link>
             </div>
            
            <div  className='border-l-2 transparent hover:border-l-2 hover:border-red-400'>
            <Link
                to="/form"
                className=" ml-8 cursor-pointer text-gray-600 hover:text-red-700"
              >
                <CalendarMonthIcon />
                <span className="ml-4 text-sm text-gray-700">Coming Soon</span>
              </Link>
            </div>
             
            </div>
          </div>

          <div className="mt-8 border-t-2 border-grey">
            <div className="mt-6 ">
              <h6 className="text-xs mb-4">Following</h6>
              <ul className="flex flex-col justify-items-center	space-y-2">
                <li className="cursor-pointer flex items-center space-x-2">
                  <img src={Avatar} className="rounded-full h-6 w-6 " />
                  <span className="text-xs text-gray-700 ">Ikako.t</span>
                  <ArrowDropDownIcon className="flex-1" />
                </li>
                <li className="cursor-pointer flex items-center space-x-2">
                  <img src={Avatar} className="rounded-full h-6 w-6 " />
                  <span className=" text-xs text-gray-700">Nick.B</span>
                  <ArrowDropDownIcon className="flex-1" />
                </li>
                <li className="cursor-pointer flex items-center space-x-2">
                  <img src={Avatar} className="rounded-full h-6 w-6 " />
                  <span className="text-xs text-gray-700">Vika.J</span>
                  <ArrowDropDownIcon className="flex-1" />
                </li>
                <li className="cursor-pointer flex items-center space-x-2">
                  <img src={Avatar} className="rounded-full h-6 w-6 " />
                  <span className="text-xs text-gray-700">Alesandra.B</span>
                  <ArrowDropDownIcon className="flex-1" />
                </li>
                <li className="cursor-pointer flex items-center space-x-2">
                  <img src={Avatar} className="rounded-full h-6 w-6 " />
                  <span className="text-xs text-gray-700">Anna.s</span>
                  <ArrowDropDownIcon className="flex-1" />
                </li>
                <li className="cursor-pointer flex items-center space-x-2">
                  <img src={Avatar} className="rounded-full h-6 w-6 " />
                  <span className="text-xs text-gray-700">Dadd.H</span>
                  <ArrowDropDownIcon className="flex-1" />
                </li>
              </ul>
            </div>
          </div>

          <div className="flex mt-6 list-none">
            <li>
              <ArrowDropDownCircleIcon className="text-red-700" />
              <span className="ml-4 text-sm text-gray-700">Load more</span>
            </li>
          </div>

          <div className="mt-6 border-t-2 border-grey">
            <div className="flex mt-4 list-none">
            <button type="button" className="inline-block px-6 py-2 border-2 border-red-600  font-medium text-xs leading-tight uppercase rounded-full hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-gradient-to-r from-cyan-500 to-red-500 hover:text-white">Connect Wallet</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
