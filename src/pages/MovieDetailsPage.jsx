import { useEffect, useState } from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { getMovie, movieSlots, buyTicket } from '../services/blockchain'
import { useGlobalState } from '../store'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { toast } from 'react-toastify'
import ChatModal from '../components/ChatModal'
import { getGroup } from '../services/chat'
import ChatActions from '../components/ChatActions'

const MovieDetailsPage = () => {
  const [loaded, setLoaded] = useState(false)
  const [group, setGroup] = useState(null)
  const [movie] = useGlobalState('movie')
  const [slotsForMovie] = useGlobalState('slotsForMovie')
  const [filteredSlots, setFilteredSlots] = useState([])
  const { id } = useParams()

  useEffect(async () => {
    await getMovie(id)
    await movieSlots(id)

    const GROUP = await getGroup(`guid_${id}`)

    setGroup(GROUP)
    setLoaded(true)
  }, [])

  useEffect(() => {
    const filteredTimeSlots = slotsForMovie.filter(
      (slot) => !slot.deleted && slot.published
    )
    setFilteredSlots(filteredTimeSlots)
  }, [slotsForMovie])

  function convertTimestampToTime(timestamp) {
    return moment(timestamp).format('h:mm A')
  }
  function formatDateWithDayName(timestamp) {
    return moment(timestamp).format('dddd, MMMM Do YYYY')
  }

  const handleBuyTicket = async (day, Id, ticketCost) => {
    const params = {
      movieId: id,
      day,
      id: Id,
      ticketCost,
    }
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await buyTicket(params)
          .then(async () => {
            movieSlots(id)
            resolve()
          })
          .catch(() => reject())
      }),
      {
        pending: 'Approve transaction...',
        success: 'ticket bought successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
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
          </div>

          {filteredSlots.map((slot, i) => (
            <>
              <div
                key={i}
                className="flex text-center align-center mx-auto space-x-8 my-10"
              >
                <p className="font-bold">
                  DATE:{' '}
                  <span className="font-thin">
                    {formatDateWithDayName(slot.day)}
                  </span>
                </p>
                <CalendarMonthIcon className="text-gray-600" />
              </div>
              <div className="grid grid-cols-1  gap-4 p-2">
                <div className="flex flex-col space-y-4 items-center justify-center  md:flex-row align-center  space-x-4  bg-gray-300 rounded-md p-2  m-auto w-full md:w-2/3">
                  <p>{convertTimestampToTime(slot.startTime)}</p>
                  <div className="flex items-center">
                    <span>{slot.seatings}</span>/<span>{slot.capacity}</span>
                    <sub>spaces</sub>
                  </div>
                  <div>
                    {slot.seatings >= slot.capacity ? (
                      <button className="bg-transparent border-2 border-black text-gray-600 font-bold px-4 py-1">
                        Filled up
                      </button>
                    ) : (
                      <button
                        className="bg-black py-1 px-4 text-xs font-bold text-white border-2 border-black hover:bg-transparent  rounded-full hover:border-2 hover:border-red-600 hover:text-black "
                        onClick={() =>
                          handleBuyTicket(slot.day, slot.id, slot.ticketCost)
                        }
                      >
                        BUY TICKET
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
        <ChatModal movie={movie} />
      </div>
    )
  )
}

export default MovieDetailsPage
