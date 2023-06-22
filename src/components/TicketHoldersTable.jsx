import React from 'react'

const TicketHoldersTable = ({ holders, slot }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="border-b">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Id
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cost
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Holder
            </th>
          </tr>
        </thead>
        <tbody>
          {holders.map((holder, i) => (
            <tr key={i} className="border-b">
              <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{slot.ticketCost} ETH</td>
              <td className="px-6 py-4 whitespace-nowrap">{holder}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TicketHoldersTable
