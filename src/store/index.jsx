import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  movies: [],
  movie: null,
  slotsForDay: [],
  slotsForMovie: [],
  ticketHolders: [],
  movieToTicketHolderStatus: null,
  connectedAccount: '',
  slot: null,
  messages: [],
  deployer: null,
  updateMovieModal: 'scale-0',
  deleteMovieModal: 'scale-0',
  deleteSlotModal: 'scale-0',
  slotsModal: 'scale-0',
  ticketsModal: 'scale-0',
  addSlotModal: 'scale-0',
  holderSearchModal: 'scale-0',
  currentUser: null,
  chatModal: 'scale-0',
  chatCommandModal: 'scale-0',
  authChatModal: 'scale-0',
  group: null,
  messages: [],
})

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars)
    let end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}

const convertTimestampToDate = (timestamp) => {
  const date = new Date(timestamp)
  const options = { month: 'long', day: 'numeric', year: 'numeric' }
  return date.toLocaleDateString('en-US', options)
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

export {
  setGlobalState,
  useGlobalState,
  getGlobalState,
  truncate,
  convertTimestampToDate,
  convertTimestampToTime,
}
