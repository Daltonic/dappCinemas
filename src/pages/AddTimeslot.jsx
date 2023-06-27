import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addTimeslot, getSlotsByDay, toWei } from '../services/blockchain'
import { convertTimestampToTime, useGlobalState } from '../store'
import { FaTimes } from 'react-icons/fa'

const AddTimeslot = () => {
  const [currentSlots] = useGlobalState('currentSlots')

  const [ticketCost, setTicketCost] = useState('')
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [capacity, setCapacity] = useState('')
  const [selectedDay, setSelectedDay] = useState(null)

  const [blockedStamps, setBlockedStamps] = useState([])

  const [ticketCosts, setTicketCosts] = useState([])
  const [startTimes, setStartTimes] = useState([])
  const [endTimes, setEndTimes] = useState([])
  const [capacities, setCapacities] = useState([])
  const [viewingDays, setViewingDays] = useState([])

  const { id } = useParams()
  const router = useNavigate()
  const timeInterval = 30

  const handleSelectedDay = async (date) => {
    const day = new Date(date)
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    const newDate = new Date(
      `${day.toLocaleDateString('en-US', options).replace(/\//g, '-')}`
    ).getTime()

    setSelectedDay(newDate)
  }

  useEffect(() => {
    const fetchData = async () => {
      await getSlotsByDay(selectedDay)
      initAvailableSlot()
    }

    if (selectedDay) fetchData()
  }, [selectedDay])

  useEffect(() => {
    if (currentSlots.length > 0) {
      initAvailableSlot()
    }
  }, [currentSlots])

  const dateMax = () => {
    const startOfDay = new Date(selectedDay)
    startOfDay.setHours(0, 0, 0, 0)
    const minStartTime =
      startOfDay.toLocaleDateString() === new Date().toLocaleDateString()
        ? new Date()
        : startOfDay

    const maxStartTime = new Date(selectedDay).setHours(23, 59, 59, 999)
    const minEndTime = new Date(startTime)
    const maxEndTime = new Date(selectedDay).setHours(23, 59, 59, 999)

    return { startOfDay, minStartTime, maxStartTime, maxEndTime, minEndTime }
  }

  const initAvailableSlot = () => {
    const timestamps = []

    currentSlots.forEach((slot) => {
      const { startTime, endTime } = slot
      let currTime = new Date(startTime)

      while (currTime < endTime) {
        timestamps.push(currTime.getTime())
        currTime.setMinutes(currTime.getMinutes() + 10)
      }
    })

    setBlockedStamps(timestamps)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedDay || !startTime || !endTime || !capacity || !ticketCost)
      return

    setTicketCosts((prev) => [toWei(ticketCost), ...prev])
    setStartTimes((prev) => [new Date(startTime).getTime(), ...prev])
    setEndTimes((prev) => [new Date(endTime).getTime(), ...prev])
    setCapacities((prev) => [Number(capacity), ...prev])
    setViewingDays((prev) => [selectedDay, ...prev])

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
          movieId: id,
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
            router('/timeslot/' + id)
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
    setSelectedDay(null)
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

  return (
    <div className="flex justify-center items-center py-12 m-auto w-full">
      <div className="block rounded-lg justify-center items-center m-auto sm:shadow-md p-6 shadow-gray-400 w-full sm:w-3/5">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex items-center justify-center mb-4">
            <h2>Add Time Slot</h2>
          </div>
          <div
            className="flex flex-row justify-between items-center
            bg-gray-300 rounded-xl mt-5 p-2"
          >
            <DatePicker
              selected={selectedDay}
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
              minDate={new Date(selectedDay)}
              maxDate={new Date(selectedDay)}
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
              minDate={new Date(selectedDay)}
              maxDate={new Date(selectedDay)}
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

export default AddTimeslot
