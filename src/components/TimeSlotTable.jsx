import React from 'react'
import { convertTimestampToDate, convertTimestampToTime } from '../store'
import TimeslotActions from './TimeslotActions'
import { Link } from 'react-router-dom'

const TimeSlotTable = ({ slots }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="border-b">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Id
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Day
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ticket
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Balance
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Starts
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ends
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Capacity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, i) => (
            <tr key={i} className="border-b">
              <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-blue-500">
                <Link to={`/timeslot/${slot.movieId}/${slot.id}`}>
                  {convertTimestampToDate(slot.day)}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {slot.ticketCost} ETH
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {slot.balance} ETH
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {convertTimestampToTime(slot.startTime)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {convertTimestampToTime(slot.endTime)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {slot.seats} / {slot.capacity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <TimeslotActions slot={slot} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TimeSlotTable
