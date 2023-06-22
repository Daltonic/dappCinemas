import React from 'react'
import { convertTimestampToDate, convertTimestampToTime } from '../store'
import { FaEthereum } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { buyTicket } from '../services/blockchain'

const TimeSlotList = ({ slots }) => {
  const handleTicketPurchase = async (slot) => {
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await buyTicket(slot)
          .then((res) => resolve(res))
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      }),
      {
        pending: 'Approve transaction...',
        success: 'Ticket successfully purchased 👌',
        error: 'Encountered error 🤯',
      }
    )
  }
  return (
    <div className="flex flex-col items-center mb-10 w-full sm:w-3/6 mx-auto">
      <h2 className="text-2xl font-bold mb-2">Available Time Slots</h2>
      {slots.length > 0 ? (
        <ul className="space-y-4 w-full">
          {slots.map((slot, i) => (
            <li
              key={i}
              className="bg-gray-100 p-4 rounded-md w-full flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">
                  {convertTimestampToDate(slot.day)}
                </h3>
                <p className="text-sm font-medium">
                  {convertTimestampToTime(slot.startTime)} -{' '}
                  {convertTimestampToTime(slot.endTime)}
                </p>
                <div className="flex justify-center items-center space-x-1 text-sm font-light">
                  <span>
                    {slot.seats} / {slot.capacity} left
                  </span>
                  <span className="flex justify-center items-center">
                    <FaEthereum /> <span>{slot.ticketCost}</span>
                  </span>
                </div>
              </div>

              <button
                className="inline-block px-3 py-2 border-2 border-red-600 font-medium text-xs
                leading-tight uppercase rounded-full hover:bg-opacity-5 focus:outline-none
                focus:ring-0 transition duration-150 ease-in-out hover:bg-gradient-to-r
                from-cyan-500 to-red-500 hover:text-white hover:border-white"
                onClick={() => handleTicketPurchase(slot)}
              >
                Buy Ticket
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700 font-light">
          Not available, check back later
        </p>
      )}
    </div>
  )
}

export default TimeSlotList
