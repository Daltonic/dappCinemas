import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMovie, getSlot, getTicketHolders } from '../services/blockchain'
import {
  convertTimestampToDate,
  setGlobalState,
  useGlobalState,
} from '../store'
import TicketHoldersTable from '../components/TicketHoldersTable'

const TicketHolders = () => {
  const { slotId, movieId } = useParams()
  const [slot] = useGlobalState('slot')
  const [movie] = useGlobalState('movie')
  const [holders] = useGlobalState('ticketHolders')

  useEffect(() => {
    const fetchData = async () => {
      await getSlot(slotId)
      await getMovie(movieId)
      await getTicketHolders(movieId, slotId)
    }

    fetchData()
  }, [])

  return (
    <div className="w-full min-h-screen p-3 space-y-6 mb-10">
      <h3 className="my-3 text-3xl font-bold">
        {movie?.name}:{' '}
        <span className="text-gray-500">
          {convertTimestampToDate(slot?.day)}
        </span>
      </h3>

      <TicketHoldersTable holders={holders} slot={slot} />

      <div className="flex space-x-2">
        <button
          onClick={() => setGlobalState('holderSearchModal', 'scale-100')}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Find Holder
        </button>
        <Link
          to={'/timeslot/' + movieId}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </Link>
      </div>
    </div>
  )
}

export default TicketHolders
