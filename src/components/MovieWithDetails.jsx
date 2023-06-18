import { useState, useEffect } from 'react'
import { useGlobalState, setGlobalState } from '../store'
import { movieSlots, movieToTicketHolders } from '../services/blockchain'
import moment from 'moment'
import Slots from './Slots'
import TicketBuyers from './TicketBuyers'

const MovieWithDetails = ({ movie }) => {
  const [slotsForMovie] = useGlobalState('slotsForMovie')
  const [filteredSlots, setFilteredSlots] = useState([])
  const [movieToTicketHolderStatus] = useGlobalState(
    'movieToTicketHolderStatus'
  )

  useEffect(() => {
    const fetchSlotsAndTicketHolders = async () => {
      await movieSlots(movie.id)
      await movieToTicketHolders(movie.id)
    }

    fetchSlotsAndTicketHolders()
  }, [])

  useEffect(() => {
    const filteredTimeSlots = slotsForMovie.filter((slot) => !slot.deleted)
    setFilteredSlots(filteredTimeSlots)
  }, [slotsForMovie])

  const handleOpenUpdateMovie = () => {
    setGlobalState('singleMovie', movie)
    setGlobalState('updateMovieModal', 'scale-100')
  }

  const handleOpenDeleteMovie = () => {
    setGlobalState('singleMovie', movie)
    setGlobalState('deleteMovieModal', 'scale-100')
  }

  const handleOpenAddSlotMovie = () => {
    setGlobalState('singleMovie', movie)
    setGlobalState('addSlotModal', 'scale-100')
  }

  const handleOpenSlots = () => {
    setGlobalState('slotsModal', 'scale-100')
  }

  const handleOpenTicketsModal = () => {
    setGlobalState('ticketsModal', 'scale-100')
  }

  return (
    <div className="w-5/6 shadow">
      <div className="w-5/6 p-4 m-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-bold">{movie.title}</h4>
          <div className="flex space-x-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleOpenUpdateMovie}
            >
              Update
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleOpenDeleteMovie}
            >
              Delete
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleOpenAddSlotMovie}
            >
              Add Slot
            </button>
          </div>
        </div>
        <div className="mt-4">
          <p>
            <span className="font-bold">Genre:</span> {movie.genre}
          </p>
          <p>
            <span className="font-bold">Director:</span> {movie.director}
          </p>
          <p>
            <span className="font-bold">Release Date:</span>{' '}
            {moment(movie.releaseDate).format('MMMM Do, YYYY')}
          </p>
          <p>
            <span className="font-bold">Description:</span> {movie.description}
          </p>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-bold">Time Slots</h4>
          {filteredSlots.length > 0 ? (
            <Slots filteredSlots={filteredSlots} />
          ) : (
            <p>No time slots available</p>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={handleOpenSlots}
          >
            View All Slots
          </button>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-bold">Ticket Holders</h4>
          {movieToTicketHolderStatus === 'loading' ? (
            <p>Loading ticket holders...</p>
          ) : movieToTicketHolderStatus === 'error' ? (
            <p>Error retrieving ticket holders</p>
          ) : (
            <TicketBuyers filteredSlots={filteredSlots} />
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={handleOpenTicketsModal}
          >
            View All Ticket Holders
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieWithDetails
