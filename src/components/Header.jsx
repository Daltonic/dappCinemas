import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdMenu } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { TbSearch } from 'react-icons/tb'
import { truncate, useGlobalState } from '../store'
import { connectWallet } from '../services/blockchain'

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <div className="flex flex-col justify-start border-b border-gray-200 p-2">
      <div className="flex content-center items-center justify-between w-full">
        <div className="flex p-2 sm:hidden">
          <Link to="/">
            Dapp<span className="text-red-500">Cinemas</span>
          </Link>
        </div>
        <div className="flex space-x-4 p-1">
          <form>
            <div className="hidden sm:flex border border-gray-200 text-gray-500 p-2 items-center rounded-full min-w-[25vw] max-w-[560px]">
              <TbSearch size={20} className="hidden md:flex" />
              <input
                placeholder="Search everything"
                className="border-none flex-1 text-m px-2 outline-none"
              />
            </div>
          </form>
        </div>
        <div className="flex m-4 sm:hidden">
          {toggleMenu ? (
            <AiOutlineClose
              size={20}
              onClick={() => setToggleMenu(false)}
              className="cursor-pointer"
            />
          ) : (
            <MdMenu
              size={30}
              onClick={() => setToggleMenu(true)}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
      {toggleMenu && <Menu />}
    </div>
  )
}
export default Header

const Menu = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')

  return (
    <div className="flex flex-col justify-center w-full p-2 space-y-2 sm:hidden">
      <div className="flex space-x-4 p-2 justify-center w-full  shadow-md">
        <form>
          <div className="flex border border-gray-200 text-gray-500 p-2 items-center rounded-full min-w-[25vw] max-w-[560px]">
            <TbSearch size={20} className="hidden md:flex" />
            <input
              placeholder="Search everything"
              className="border-none flex-1 text-m px-2 outline-none"
            />
          </div>
        </form>
      </div>

      <div className="flex flex-col space-y-4 items-center text-center w-full  ">
        <Link className="p-2 shadow-md w-full bg-white" to="/">
          Movies
        </Link>
        <Link className="p-2 shadow-md w-full bg-white" to="/manage/movies">
          Manage Movie
        </Link>
        <Link className="p-2 shadow-md w-full bg-white" to="/add/movies">
          Add Movie
        </Link>
        <div className="flex mt-4 list-none">
          {connectedAccount ? (
            <button
              type="button"
              className="inline-block px-8 py-2 border-2 border-red-600  text-xs leading-tight uppercase rounded-full focus:outline-none focus:ring-0 bg-gradient-to-r from-cyan-500 to-red-500 text-white font-bold"
            >
              {truncate(connectedAccount, 4, 4, 11)}
            </button>
          ) : (
            <button
              type="button"
              className="inline-block px-6 py-2 border-2 border-red-600  font-medium text-xs leading-tight uppercase rounded-full hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-gradient-to-r from-cyan-500 to-red-500 hover:text-white hover:border-white"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
