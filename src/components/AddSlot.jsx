import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaTimes } from 'react-icons/fa'
import { useGlobalState, setGlobalState } from '../store'
import { getSlots, addTimeslot, toWei } from '../services/blockchain'
import { toast } from 'react-toastify'

const AddSlot = () => {
  const [addSlotModal] = useGlobalState('addSlotModal')
  const [movie] = useGlobalState('movie')
  const [slotsForDay] = useGlobalState('slotsForDay')

  const [ticketCost, setTicketCost] = useState('')
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [capacity, setCapacity] = useState('')
  const [seletedDay, setSeletedDay] = useState(null)

  const [blockedStamps, setBlockedStamps] = useState([])

  const [ticketCosts, setTicketCosts] = useState([])
  const [startTimes, setStartTimes] = useState([])
  const [endTimes, setEndTimes] = useState([])
  const [capacities, setCapacities] = useState([])
  const [viewingDays, setViewingDays] = useState([])

  const timeInterval = 30

  const handleSelectedDay = (date) => {
    const day = new Date(date)
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    const newDate = new Date(
      `${day.toLocaleDateString('en-US', options).replace(/\//g, '-')}`
    ).getTime()

    setSeletedDay(newDate)
    const startOfDay = new Date(seletedDay)
    startOfDay.setHours(0, 0, 0, 0)

    if (startOfDay.toLocaleDateString() === new Date().toLocaleDateString()) {
      setStartTime(new Date())
      setEndTime(new Date())
    } else {
      setStartTime(new Date(seletedDay))
      setEndTime(new Date(seletedDay))
    }
  }

  const handleClose = () => {
    setGlobalState('addSlotModal', 'scale-0')
  }

  useEffect(async () => {
    if (!seletedDay) return
    await getSlots(movie.id)
    initAvailableSlot()
  }, [seletedDay])

  const dateMax = () => {
    const startOfDay = new Date(seletedDay)
    startOfDay.setHours(0, 0, 0, 0)
    const minStartTime =
      startOfDay.toLocaleDateString() === new Date().toLocaleDateString()
        ? new Date()
        : startOfDay

    const maxStartTime = new Date(seletedDay).setHours(23, 59, 59, 999)
    const minEndTime = new Date(startTime)
    const maxEndTime = new Date(seletedDay).setHours(23, 59, 59, 999)

    return { startOfDay, minStartTime, maxStartTime, maxEndTime, minEndTime }
  }

  const initAvailableSlot = () => {
    const slotsAvailable = slotsForDay.some((slot) => !slot.deleted)

    if (slotsAvailable) {
      const filteredTimeSlots = slotsForDay.filter((slot) => !slot.deleted)
      const timestamps = []

      filteredTimeSlots.forEach((slot) => {
        const { startTime, endTime } = slot
        let currTime = new Date(startTime)

        while (currTime < endTime) {
          timestamps.push(currTime.getTime())
          currTime.setMinutes(currTime.getMinutes() + 10)
        }
      })

      setBlockedStamps(timestamps)
    } else {
      setBlockedStamps([])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!seletedDay || !startTime || !endTime || !capacity || !ticketCost)
      return

    setTicketCosts((prev) => [toWei(ticketCost), ...prev])
    setStartTimes((prev) => [new Date(startTime).getTime(), ...prev])
    setEndTimes((prev) => [new Date(endTime).getTime(), ...prev])
    setCapacities((prev) => [capacity, ...prev])
    setViewingDays((prev) => [seletedDay, ...prev])

    resetForm()
  }

  const saveMovieSlot = async () => {
    if (
      viewingDays.length < 1 ||
      startTimes.length < 1 ||
      endTimes.length < 1 ||
      capacities.length < 1 ||
      ticketCosts.length < 1
    )
      return

    await toast.promise(
      new Promise(async (resolve, reject) => {
        const params = {
          movieId: movie.id,
          ticketCosts,
          startTimes,
          endTimes,
          capacities,
          viewingDays,
        }

        await addTimeslot(params)
          .then((res) => {
            setTicketCosts([])
            setStartTimes([])
            setEndTimes([])
            setCapacities([])
            setViewingDays([])
            handleClose()
            resolve(res)
          })
          .catch((error) => reject(error))
      }),
      {
        pending: 'Approve transaction...',
        success: 'Time slot added successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const resetForm = () => {
    setSeletedDay(null)
    setStartTime(null)
    setEndTime(null)
    setTicketCost('')
    setCapacity('')
  }

  const removeSlot = (index) => {
    ticketCosts.splice(index, 1)
    startTimes.splice(index, 1)
    endTimes.splice(index, 1)
    capacities.splice(index, 1)
    viewingDays.splice(index, 1)

    setTicketCosts((prevState) => [...prevState])
    setStartTimes((prevState) => [...prevState])
    setEndTimes((prevState) => [...prevState])
    setCapacities((prevState) => [...prevState])
    setViewingDays((prevState) => [...prevState])
  }

  const convertTimestampToTime = (timestamp) => {
    const date = new Date(timestamp)
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const amPm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')} ${amPm}`

    return formattedTime
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
      bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${addSlotModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Add movie slot</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={handleClose}
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center rounded-xl mt-5 mb-5">
            <div className="flex justify-center items-center rounded-full overflow-hidden h-10 w-64 shadow-md shadow-slate-300 p-4">
              <p className="text-slate-700">
                {' '}
                Dapp <span className="text-red-700">Cinemas</span>
              </p>
            </div>
          </div>
          <div
            className="flex flex-row justify-between items-center
          bg-gray-300 rounded-xl mt-5 p-2"
          >
            <DatePicker
              selected={seletedDay}
              onChange={(date) => handleSelectedDay(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select Day..."
              minDate={Date.now()}
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5 p-2">
            <DatePicker
              selected={startTime}
              onChange={setStartTime}
              showTimeSelect
              showTimeSelectOnly
              minDate={new Date(seletedDay)}
              maxDate={new Date(seletedDay)}
              minTime={dateMax().minStartTime}
              maxTime={dateMax().maxStartTime}
              timeCaption="Start Time"
              excludeTimes={blockedStamps}
              timeIntervals={timeInterval}
              dateFormat="h:mm aa"
              placeholderText="Select start time..."
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5 p-2">
            <DatePicker
              selected={endTime}
              onChange={setEndTime}
              showTimeSelect
              showTimeSelectOnly
              timeFormat="p"
              timeIntervals={timeInterval}
              excludeTimes={blockedStamps}
              minDate={new Date(seletedDay)}
              maxDate={new Date(seletedDay)}
              minTime={dateMax().minEndTime}
              maxTime={dateMax().maxEndTime}
              timeCaption="End Time"
              dateFormat="h:mm aa"
              placeholderText="Select end time..."
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5 p-2">
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="cost"
              placeholder="Ticket Cost e.g. 0.02 ETH"
              value={ticketCost}
              onChange={(e) => setTicketCost(e.target.value)}
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5 p-2">
            <input
              className="block w-full text-sm text-slate-500 bg-transparent
              border-0 focus:outline-none focus:ring-0"
              type="number"
              name="capacity"
              placeholder="Capacity e.g. 20"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>

          {startTimes.length > 0 && (
            <div className="flex flex-wrap justify-start items-center mt-5 space-x-2 text-xs">
              {startTimes.slice(0, 2).map((time, i) => (
                <span
                  key={i}
                  className="flex space-x-1 px-2 py-1 mt-1 font-semibold text-gray-700 bg-gray-200 rounded-full"
                >
                  <span>
                    {convertTimestampToTime(time)} -{' '}
                    {convertTimestampToTime(endTimes[i])}
                  </span>
                  <button onClick={() => removeSlot(i)}>
                    <FaTimes />
                  </button>
                </span>
              ))}
              {startTimes.length - startTimes.slice(0, 2).length > 0 && (
                <span
                  className="flex items-center justify-center px-2 py-1 
              font-semibold text-gray-700 bg-gray-200 rounded-full
            hover:bg-gray-300 mt-1"
                >
                  +{startTimes.length - startTimes.slice(0, 2).length}
                </span>
              )}
            </div>
          )}

          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Day
            </button>

            <button
              onClick={saveMovieSlot}
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit({ticketCosts.length})
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddSlot
