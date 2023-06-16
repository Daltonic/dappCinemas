import { FaTimes } from 'react-icons/fa'
import { setGlobalState, useGlobalState } from '../store'
import TicketBuyersBySlots from './TicketBuyersBySlots'

const TicketBuyers = ({ filteredSlots }) => {
  const [ticketsModal] = useGlobalState('ticketsModal')

  const handleClose = () => {
    setGlobalState('ticketsModal', 'scale-0')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
        bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${ticketsModal}`}
    >
      <div className="bg-white shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col overflow-y-scroll">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Slots</p>
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

          {filteredSlots.map((slot, i) => (
            <TicketBuyersBySlots
              key={i}
              movieId={slot.movieId}
              id={slot.id}
              startTime={slot.startTime}
              endTime={slot.endTime}
              day={slot.day}
            />
          ))}
        </form>
      </div>
    </div>
  )
}

export default TicketBuyers
