import { Menu } from '@headlessui/react'
import { FiEdit } from 'react-icons/fi'
import { TbCalendarPlus } from 'react-icons/tb'
import { FaRegCalendarCheck } from 'react-icons/fa'
import { BsTrash3 } from 'react-icons/bs'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { setGlobalState } from '../store'
import { Link } from 'react-router-dom'

const MovieAction = ({ movie }) => {
  const openEditMovie = () => {
    setGlobalState('movie', movie)
    setGlobalState('updateMovieModal', 'scale-100')
  }

  const openDeleteMovie = () => {
    setGlobalState('movie', movie)
    setGlobalState('deleteMovieModal', 'scale-100')
  }

  return (
    <Menu as="div" className="inline-block text-left">
      <Menu.Button
        className="inline-flex w-full justify-center
          rounded-md bg-black bg-opacity-10 px-4 py-2 text-sm
          font-medium text-black hover:bg-opacity-30 focus:outline-none
          focus-visible:ring-2 focus-visible:ring-white
          focus-visible:ring-opacity-75"
      >
        <BiDotsVerticalRounded size={17} />
      </Menu.Button>
      <Menu.Items
        className="absolute right-0 mt-2 w-56 origin-top-right
          divide-y divide-gray-100 rounded-md bg-white shadow-md 
          ing-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <Menu.Item>
          {({ active }) => (
            <button
              className={`flex justify-start items-center space-x-1 ${
                active ? 'bg-gray-200 text-black' : 'text-gray-900'
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              onClick={openEditMovie}
            >
              <FiEdit size={17} />
              <span>Edit</span>
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`flex justify-start items-center space-x-1 ${
                active ? 'bg-red-500 text-white' : 'text-red-500'
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              onClick={openDeleteMovie}
            >
              <BsTrash3 size={17} />
              <span>Delete</span>
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link
              to={'/timeslot/add/' + movie.id}
              className={`flex justify-start items-center space-x-1 ${
                active ? 'bg-gray-200 text-black' : 'text-gray-900'
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              <TbCalendarPlus size={17} />
              <span>Add Time Slot</span>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link
              to={'/timeslot/' + movie.id}
              className={`flex justify-start items-center space-x-1 ${
                active ? 'bg-gray-200 text-black' : 'text-gray-900'
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              <FaRegCalendarCheck size={17} />
              <span>All Slots</span>
            </Link>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}

export default MovieAction
