import abi from '../abis/src/contracts/DappCinemas.sol/DappCinemas.json'
import address from '../abis/contractAddress.json'
import { setGlobalState } from '../store'
import { ethers } from 'ethers'

const { ethereum } = window
const ContractAddress = address.address
const ContractAbi = abi.abi
let tx

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

const getEthereumContract = async () => {
  const accounts = await ethereum.request({ method: 'eth_accounts' })
  const provider = accounts[0]
    ? new ethers.providers.Web3Provider(ethereum)
    : new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545')
  const wallet = accounts[0] ? null : ethers.Wallet.createRandom()
  const signer = provider.getSigner(accounts[0] ? undefined : wallet.address)

  const contract = new ethers.Contract(ContractAddress, ContractAbi, signer)
  return contract
}

const isWalletConnected = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0])
    } else {
      alert('Please connect wallet.')
      console.log('No accounts found.')
    }

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0])

      await isWalletConnected().then(() => {
        window.location.reload()
      })

      await logOutWithCometChat().then(() => {
        setGlobalState('currentUser', null)
      })
    })
    return accounts[0]
  } catch (error) {
    reportError(error)
  }
}

const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0])
  } catch (error) {
    reportError(error)
  }
}

const addMovie = async ({ name, imageUrl, genre, description }) => {
  if (!ethereum) return alert('Please install metamask')

  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract()
      tx = await contract.addMovie(name, imageUrl, genre, description)
      await tx.wait()
      resolve(tx)
    } catch (error) {
      reportError(error)
      reject(error)
    }
  })
}

const updateMovie = async ({ id, name, imageUrl, genre, description }) => {
  if (!ethereum) return alert('Please install metamask')

  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract()
      tx = await contract.updateMovie(id, name, imageUrl, genre, description)
      await tx.wait()
      resolve(tx)
    } catch (error) {
      reportError(error)
      reject(error)
    }
  })
}

const deleteMovie = async (id) => {
  if (!ethereum) return alert('Please install metamask')

  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract()
      tx = await contract.deleteMovie(id)
      await tx.wait()
      resolve(tx)
    } catch (error) {
      reportError(error)
      reject(error)
    }
  })
}

const addSlot = async ({
  movieId,
  ticketCost,
  startTime,
  endTime,
  capacity,
  day,
}) => {
  if (!ethereum) return alert('Please install metamask')

  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract()

      tx = await contract.addSlot(
        movieId,
        toWei(ticketCost),
        startTime,
        endTime,
        capacity,
        day
      )

      await tx.wait()
      await getMovies()
      resolve(tx)
    } catch (error) {
      reportError(error)
      reject(error)
    }
  })
}

const deleteSlot = async ({ id, movieId }) => {
  if (!ethereum) return alert('Please install metamask')

  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract()

      tx = await contract.deleteSlot(id, movieId)
      await tx.wait()
      resolve(tx)
    } catch (error) {
      reportError(error)
      reject(error)
    }
  })
}

const publishTimeSlot = async ({ id, movieId, day }) => {
  if (!ethereum) return alert('Please install metamask')

  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract()
      tx = await contract.publishTimeSlot(id, movieId, day)
      await tx.wait()
      resolve(tx)
    } catch (error) {
      reportError(error)
      reject(error)
    }
  })
}

const buyTicket = async ({ movieId, day, id, ticketCost }) => {
  if (!ethereum) return alert('Please install metamask')

  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract()
      tx = await contract.buyTicket(movieId, day, id, {
        value: toWei(ticketCost),
      })
      await tx.wait()
      resolve(tx)
    } catch (error) {
      reportError(error)
      reject(error)
    }
  })
}

const withdraw = async ({ movieId, id }) => {
  if (!ethereum) return alert('Please install metamask')

  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract()
      tx = await contract.withdraw(movieId, id)
      await tx.wait()
      resolve(tx)
    } catch (error) {
      reportError(error)
      reject(error)
    }
  })
}

const movieToTicketHolders = async (movieId) => {
  if (!ethereum) return alert('Please install metamask')

  try {
    const contract = await getEthereumContract()
    const result = await contract.checkForTicketHolders(movieId)
    setGlobalState('movieToTicketHolderStatus', result)
  } catch (err) {
    reportError(err)
  }
}

const getMovies = async () => {
  if (!ethereum) return alert('Please install metamask')

  try {
    const contract = await getEthereumContract()
    const movies = await contract.getMovies()
    setGlobalState('movies', structuredMovie(movies))
  } catch (err) {
    reportError(err)
  }
}

const getMovie = async (id) => {
  if (!ethereum) return alert('Please install metamask')

  try {
    const contract = await getEthereumContract()
    const movie = await contract.getMovie(id)
    setGlobalState('movie', structuredMovie([movie])[0])
  } catch (err) {
    reportError(err)
  }
}

const getSlots = async (day) => {
  if (!ethereum) return alert('Please install metamask')
  try {
    const contract = await getEthereumContract()
    const slots = await contract.getSlots(day)
    setGlobalState('slotsForDay', structuredTimeslot(slots))
  } catch (err) {
    reportError(err)
  }
}

const getTicketHolders = async (movieId, id) => {
  if (!ethereum) return alert('Please install metamask')
  try {
    const contract = await getEthereumContract()
    const ticketHolders = await contract.getTicketHolders(movieId, id)
    setGlobalState('ticketHolders', structuredTicket(ticketHolders))
  } catch (err) {
    reportError(err)
  }
}

const movieSlots = async (movieId) => {
  try {
    if (!ethereum) return alert('Please install metamask')
    const contract = await getEthereumContract()
    const slots = await contract.getSlotsForMovie(movieId)
    setGlobalState('slotsForMovie', structuredTimeslot(slots))
  } catch (err) {
    reportError(err)
  }
}

const getOwner = async () => {
  if (!ethereum) return alert('Please install metamask')
  try {
    const contract = await getEthereumContract()
    const deployer = await contract.returnOwner()
    setGlobalState('deployer', deployer)
  } catch (err) {
    reportError(err)
  }
}

const structuredMovie = (movies) =>
  movies.map((movie) => ({
    id: Number(movie.id),
    name: movie.name,
    imageUrl: movie.imageUrl,
    genre: movie.genre,
    description: movie.description,
    timestamp: new Date(movie.timestamp).getTime(),
    deleted: movie.deleted,
  }))

const structuredTimeslot = (slots) =>
  slots.map((slot) => ({
    id: Number(slot.id),
    movieId: Number(slot.movieId),
    ticketCost: fromWei(slot.ticketCost),
    startTime: slot.startTime.toNumber(),
    endTime: slot.endTime.toNumber(),
    capacity: Number(slot.capacity),
    seatings: Number(slot.seatings),
    deleted: slot.deleted,
    published: slot.published,
    day: slot.day.toNumber(),
  }))

const structuredTicket = (tickets) =>
  tickets.map((ticket) => ({
    id: Number(ticket.id),
    movieId: Number(ticket.movieId),
    slotId: Number(ticket.slotId),
    owner: ticket.owner.toLowerCase(),
    cost: fromWei(ticket.cost),
    timestamp: new Date(ticket.timestamp).getTime(),
    day: new Date(ticket.day).getTime(),
    refunded: ticket.refunded,
  }))

export {
  connectWallet,
  isWalletConnected,
  getEthereumContract,
  addMovie,
  updateMovie,
  deleteMovie,
  addSlot,
  deleteSlot,
  publishTimeSlot,
  buyTicket,
  getMovies,
  getMovie,
  getSlots,
  movieSlots,
  movieToTicketHolders,
  getTicketHolders,
  getOwner,
  withdraw,
}
