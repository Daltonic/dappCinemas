import React from 'react'
import { Menu } from '@headlessui/react'
import { FiEdit } from 'react-icons/fi'
import { TbCalendarPlus } from 'react-icons/tb'
import { FaRegCalendarCheck } from 'react-icons/fa'
import { TfiTicket } from 'react-icons/tfi'
import { BsTrash3 } from 'react-icons/bs'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { convertTimestampToDate, setGlobalState, truncate } from '../store'
import { Link } from 'react-router-dom'

const MoviesTable = ({ movies }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="border-b">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Genre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Release Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, i) => (
            <tr key={i} className="border-b">
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  className="h-16 w-16 object-cover rounded"
                  src={movie.imageUrl}
                  alt={movie.name}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-blue-500">
                <Link to={'/movie/' + movie.id}>{movie.name}</Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{movie.genre}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {convertTimestampToDate(movie.timestamp)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {truncate(movie.description, 50, 0, 53)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <MovieAction movie={movie} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const MovieAction = ({ movie }) => {
  const openEditMovie = () => {
    setGlobalState('movie', movie)
    setGlobalState('updateMovieModal', 'scale-100')
  }

  const openDeleteMovie = () => {
    setGlobalState('movie', movie)
    setGlobalState('deleteMovieModal', 'scale-100')
  }

  const openAddSlotMovie = () => {
    setGlobalState('singleMovie', movie)
    setGlobalState('addSlotModal', 'scale-100')
  }

  const openSlots = () => {
    setGlobalState('slotsModal', 'scale-100')
  }

  const openTicketsModal = () => {
    setGlobalState('ticketsModal', 'scale-100')
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
            <button
              className={`flex justify-start items-center space-x-1 ${
                active ? 'bg-gray-200 text-black' : 'text-gray-900'
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              onClick={openAddSlotMovie}
            >
              <TbCalendarPlus size={17} />
              <span>Add Time Slot</span>
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`flex justify-start items-center space-x-1 ${
                active ? 'bg-gray-200 text-black' : 'text-gray-900'
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              onClick={openTicketsModal}
            >
              <FaRegCalendarCheck size={17} />
              <span>All Slots</span>
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`flex justify-start items-center space-x-1 ${
                active ? 'bg-gray-200 text-black' : 'text-gray-900'
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              <TfiTicket size={17} />
              <span>All Holders</span>
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}

export default MoviesTable
