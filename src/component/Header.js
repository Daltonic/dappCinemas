import { React, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import VoiceChatIcon from '@mui/icons-material/VoiceChat'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import Avatar from '../asset/Avatar.jpg'

function Header() {
  const [burgerStatus, setBurgerStatus] = useState(false)
  return (
    <div className="flex flex-col justify-start  p-2">
      <div className="flex content-center items-center justify-between w-full">
        <div className="flex space-x-4 p-1">
          <form>
            <div className=" sm:flex border-2 text-gray-500 border-gray-300 p-2 items-center rounded-full min-w-[25vw] max-w-[560px]">
              <SearchIcon className="hidden" />
              <input
                placeholder="Search everything"
                className="border-none flex-1 text-m px-2 outline-none"
              />
              <TuneIcon />
            </div>
          </form>
        </div>
        <div className="mr-4">
          <div className="hidden md:flex items-center space-x-4">
            <VoiceChatIcon/>
            <NotificationsNoneIcon />
           
           <img
              src={Avatar}
              className="flex rounded-full h-8 w-8 object-cover border-solid border-2 border-red-500 cursor-pointer  "
            />
         
          </div>

          <img
              src={Avatar}
              className="hidden sm:flex md:hidden rounded-full h-8 w-8 object-cover border-solid border-2 border-red-500 cursor-pointer  "
            />
        </div>
        <div className="flex m-4 sm:hidden">
          <MenuIcon className="cursor-pointer" />
        </div>
      </div>

      <div className='flex justify-center w-full bg-gray-400 sm:hidden'>
        <ul className='flex flex-col space-y-4 items-center  '>
          <li className='p-2 cursor-pointer  shadow-xl hover:text-red-600'>Browse</li>
          <li className=' p-2 cursor-pointer'>Watchlist</li>
          <li className='p-2 cursor-pointer'>Coming soon</li>
          <li className='p-2 cursor-pointer'>Notification</li>
        </ul>
      </div>
    </div>
  )
}

export default Header
