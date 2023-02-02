import React from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import VoiceChatIcon from '@mui/icons-material/VoiceChat'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Avatar from '../asset/Avatar.jpg'

function Header() {
  return (
    <div className="flex content-center items-center justify-between p-2">
      <div className="flex space-x-4">
       

        <form>
        <div className="flex border-2 text-gray-500 border-gray-300 p-2 items-center rounded-full min-w-[25vw] max-w-[560px]">
          <SearchIcon />
          <input
            placeholder="Search everything"
            className="border-none flex-1 text-m px-2 outline-none"
          />
          <TuneIcon/>
        </div>

        </form>
      </div>
      <div className="mr-4">
        <div className="flex items-center space-x-4">
          <VoiceChatIcon />
          <NotificationsNoneIcon />
          <img
            src={Avatar}
            className="rounded-full h-8 w-8 object-cover border-solid border-2 border-red-500 cursor-pointer  "
          />
        </div>
      </div>
    </div>
  )
}

export default Header
