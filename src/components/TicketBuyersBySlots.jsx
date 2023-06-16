import { useEffect } from 'react'
import { getTicketHolders } from '../services/blockchain'

const TicketBuyersBySlots = ({ movieId, id, startTime, endTime, day }) => {
  const [ticketHolders] = useGlobalState('ticketHolders')
  const [filteredTicketHolders, SetFilteredTicketHolders] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(async () => {
    await getTicketHolders(movieId, id).then(() => setLoaded(true))
  }, [])

  useEffect(() => {
    const filteredBuyers = ticketHolders.filter(
      (buyer) => !buyer.refunded && buyer.slotId == id
    )
    SetFilteredTicketHolders(filteredBuyers)
  }, [ticketHolders])

  function convertTimestampToTime(timestamp) {
    return moment(timestamp).format('h:mm A')
  }
  function formatDateWithDayName(timestamp) {
    return moment(timestamp).format('dddd, MMMM Do YYYY')
  }

  return loaded ? (
    <div>
      {filteredTicketHolders.length > 0 ? (
        filteredTicketHolders.map((buyer, i) => (
          <div>
            <div className="my-4 px-4" key={i}>
              <h3 className="text-gray-700">{formatDateWithDayName(day)}</h3>
              <div className="flex space-x-2 items-center">
                <h4>{convertTimestampToTime(startTime)}</h4>
                <div className="w-3 h-[0.3px] bg-black"></div>
                <h4>{convertTimestampToTime(endTime)}</h4>
              </div>
            </div>
            <div className="flex space-x-3 px-3" key={i}>
              <Identicon string={buyer.owner} size={25} />
              <p>{truncate(buyer.owner, 4, 4, 11)}</p>
            </div>
          </div>
        ))
      ) : (
        <div>
          <div className="my-4 px-4">
            <h3 className="text-gray-700">{formatDateWithDayName(day)}</h3>
            <div className="flex space-x-2 items-center">
              <h4>{convertTimestampToTime(startTime)}</h4>
              <div className="w-3 h-[0.3px] bg-black"></div>
              <h4>{convertTimestampToTime(endTime)}</h4>
            </div>
          </div>
          <h3 className="px-3">No ticket buyers yet.</h3>
        </div>
      )}
    </div>
  ) : null
}

export default TicketBuyersBySlots
