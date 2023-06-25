import { useEffect, useState } from 'react'
import { getMovie, getSlots } from '../services/blockchain'
import { useGlobalState } from '../store'
import { useParams } from 'react-router-dom'
import ChatModal from '../components/ChatModal'
import { getGroup } from '../services/chat'
import ChatActions from '../components/ChatActions'
import TimeSlotList from '../components/TimeSlotList'

const MovieDetails = () => {
  const [loaded, setLoaded] = useState(false)
  const [group, setGroup] = useState(null)
  const [movie] = useGlobalState('movie')
  const [slots] = useGlobalState('slotsForDay')
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      await getMovie(id)
      await getSlots(id)

      setLoaded(true)
      const GROUP = await getGroup(`guid_${id}`)
      setGroup(GROUP)
    }

    fetchData()
  }, [])

  const isValidTimeslot = (slot) => {
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    const currentTimestamp = currentDate.getTime()

    if (
      currentTimestamp <= slot.day &&
      !slot.completed &&
      slot.seats < slot.capacity
    ) {
      return true
    } else {
      return false
    }
  }

  return (
    loaded && (
      <div className="flex flex-col w-full p-4 space-y-4">
        <div className="flex w-full ">
          <img src={movie.imageUrl} className="w-full object-cover h-[30rem]" />
        </div>
        <div className="flex flex-col space-y-4 align-center text-center w-full">
          <div className="flex flex-col space-y-6">
            <h3 className="font-black text-2xl">{movie.name}</h3>
            <div className="flex space-x-2 my-2 justify-center">
              {movie.genre.split(',').map((genre, i) => (
                <span
                  key={i}
                  className="inline-block px-4 py-2 rounded-full bg-cyan-500 text-white
                  text-sm font-medium shadow-md transition-colors duration-300
                  hover:bg-cyan-600 cursor-pointer"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="text-gray-700 my-5 w-5/6 text-center mx-auto font-light">
              {movie.description}
            </p>

            <ChatActions movie={movie} group={group} />

            <TimeSlotList
              slots={slots.filter((slot) => isValidTimeslot(slot))}
            />
          </div>
        </div>
        <ChatModal movie={movie} />
      </div>
    )
  )
}

export default MovieDetails
