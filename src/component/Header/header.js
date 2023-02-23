import { React, useState } from 'react'
import { Link } from 'react-router-dom'

import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import VoiceChatIcon from '@mui/icons-material/VoiceChat'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { Avatar } from '@mui/material'

import Avatarimg from '../../asset/Avatar.jpg'
const Menu = () => (
  <>
    <div className="flex flex-col justify-center w-full p-2 space-y-2 sm:hidden bounce-in-fwd">
      <div className="flex space-x-4 p-2 justify-center w-full  shadow-md">
        <form>
          <div className="flex border-2 text-gray-500 border-gray-300 p-2 items-center rounded-full min-w-[25vw] max-w-[560px]">
            <SearchIcon className="hidden md:flex" />
            <input
              placeholder="Search everything"
              className="border-none flex-1 text-m px-2 outline-none"
            />
            <TuneIcon />
          </div>
        </form>
      </div>

      <div className="flex flex-col space-y-4 items-center text-center w-full  ">
        <p className="p-2   shadow-md w-full bg-white">
          <Link to="/">
            <span className="p-2 cursor-pointer  hover: shadow-md rounded-md bg-white hover:bg-gray-300 ">
              Browse
            </span>
          </Link>
        </p>
        <Link
          to="/moviedetails"
          className="p-2 cursor-pointer  shadow-md w-full bg-white hover:text-red-400"
        >
          Watchlist
        </Link>
        <Link
          to=""
          className="p-2 cursor-pointer  shadow-md w-full bg-white hover:text-red-400"
        >
          Coming soon
        </Link>
        <Link
          to=""
          className="p-2 cursor-pointer  shadow-md w-full bg-white hover:text-red-400"
        >
          Notification
        </Link>
      </div>
    </div>
  </>
)
function Header() {
  const [toggleMenu, setToggleMenu] = useState(false)
  return (
    <div className="flex flex-col justify-start  p-2">
      <div className="flex content-center items-center justify-between w-full">
        <div className="flex p-2 sm:hidden">
          <Link to="/">
            dapp.<span className="text-red-500">Cinemas</span>
          </Link>
        </div>
        <div className="flex space-x-4 p-1">
          <form>
            <div className="hidden sm:flex border-2 text-gray-500 border-gray-300 p-2 items-center rounded-full min-w-[25vw] max-w-[560px]">
              <SearchIcon className="hidden md:flex" />
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
            <VoiceChatIcon />
            <NotificationsNoneIcon />

            <Avatar
              alt="Remy Sharp"
              src={Avatarimg}
              sx={{ width: 42, height: 42 }}
              className=" border-solid border-2 border-red-500 cursor-pointer "
            />
          </div>
          <div className="hidden sm:flex md:hidden lg:hidden">
            <Avatar
              alt="Remy Sharp"
              src={Avatarimg}
              sx={{ width: 56, height: 56 }}
              className=" border-solid border-2 border-red-500 cursor-pointer "
            />
          </div>
        </div>
        <div className="flex m-4 sm:hidden">
          {toggleMenu ? (
            <CloseIcon
              onClick={() => setToggleMenu(false)}
              className="cursor-pointer"
            />
          ) : (
            <MenuIcon
              onClick={() => setToggleMenu(true)}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
      {toggleMenu ? <Menu /> : null}
      <div style={{ borderBottom: '1px solid #B2BEB5' }} className="p-2"></div>
    </div>
  )
}

export default Header
