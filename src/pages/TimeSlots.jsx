import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMovie, getSlots } from '../services/blockchain'
import { useGlobalState } from '../store'
import TimeSlotTable from '../components/TimeSlotTable'

const TimeSlots = () => {
  const { id } = useParams()
  const [movie] = useGlobalState('movie')
  const [slots] = useGlobalState('slotsForDay')

  useEffect(() => {
    const fetchData = async () => {
      await getMovie(id)
      await getSlots(id)
    }

    fetchData()
  }, [])

  return (
    <div className="w-full min-h-screen p-3 space-y-6 mb-10">
      <h3 className="my-3 text-3xl font-bold">
        Timeslots: <span className="text-gray-500">{movie?.name}</span>
      </h3>

      <TimeSlotTable slots={slots} />

      <div className="flex space-x-2">
        <Link
          to={'/timeslot/add/' + id}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Slots
        </Link>
        <Link
          to={'/manage/movies'}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </Link>
      </div>
    </div>
  )
}

export default TimeSlots
