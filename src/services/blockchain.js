import abi from '../abis/src/contracts/DappCinemas.sol/DappCinemas.json'
import address from '../abis/contractAddress.json'
import { setGlobalState } from '../store'
import { ethers } from 'ethers'
import { logOutWithCometChat } from './chat'

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
      await isWalletConnected()
      await logOutWithCometChat()
    })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0])
    } else {
      setGlobalState('connectedAccount', '')
      console.log('No accounts found')
    }
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
      await loadBlockchainData()
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
      await loadBlockchainData()
      resolve(tx)
    } catch (error) {
      reportError(error)
      reject(error)
    }
  })
}

const deleteMovie = async (movieId) => {
  if (!ethereum) return alert('Please install metamask')

  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract()
      tx = await contract.deleteMovie(movieId)
      await tx.wait()
      await loadBlockchainData()
      resolve(tx)
    } catch (error) {
      reportError(error)
      reject(error)
    }
  })
}

const addTimeslot = async ({
  movieId,
  ticketCosts,
  startTimes,
  endTimes,
  capacities,
  viewingDays,
}) => {
  if (!ethereum) return alert('Please install metamask')
  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract()

      tx = await contract.addTimeslot(
        movieId,
        ticketCosts,
        startTimes,
        endTimes,
        capacities,
        viewingDays
      )

      await tx.wait()
      resolve(tx)
    } catch (error) {
      reportError(error)
      reject(error)
    }
  })
}

const deleteSlot = async ({ movieId, id }) => {
  if (!ethereum) return alert('Please install metamask')

  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract()

      tx = await contract.deleteTimeSlot(movieId, id)
      await tx.wait()
      await getSlots(movieId)
      resolve(tx)
    } catch (error) {
      reportError(error)
      reject(error)
    }
  })
}

const markSlot = async ({ movieId, id }) => {
  if (!ethereum) return alert('Please install metamask')

  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract()

      tx = await contract.markTimeSlot(movieId, id)
      await tx.wait()
      await getSlots(movieId)
      resolve(tx)
    } catch (error) {
      reportError(error)
      reject(error)
    }
  })
}

const buyTicket = async ({ movieId, id, ticketCost }) => {
  if (!ethereum) return alert('Please install metamask')

  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract()

      tx = await contract.buyTicket(movieId, id, 1, {
        value: toWei(ticketCost),
      })

      await tx.wait()
      await getSlots(movieId)
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

const getSlots = async (movieId) => {
  if (!ethereum) return alert('Please install metamask')
  try {
    const contract = await getEthereumContract()
    const slots = await contract.getTimeSlots(movieId)
    setGlobalState('slotsForDay', structuredTimeslot(slots))
  } catch (err) {
    reportError(err)
  }
}

const getSlot = async (slotId) => {
  if (!ethereum) return alert('Please install metamask')
  try {
    const contract = await getEthereumContract()
    const slot = await contract.getTimeSlot(slotId)
    setGlobalState('slot', structuredTimeslot([slot])[0])
  } catch (err) {
    reportError(err)
  }
}

const getTicketHolders = async (movieId, id) => {
  if (!ethereum) return alert('Please install metamask')
  try {
    const contract = await getEthereumContract()
    const ticketHolders = await contract.getMovieTicketHolders(movieId, id)
    setGlobalState('ticketHolders', ticketHolders)
  } catch (error) {
    reportError(error)
  }
}

const getOwner = async () => {
  if (!ethereum) return alert('Please install metamask')
  try {
    const contract = await getEthereumContract()
    const deployer = await contract.owner()
    setGlobalState('deployer', deployer.toLowerCase())
  } catch (err) {
    reportError(err)
  }
}

const loadBlockchainData = async () => {
  await getMovies()
  await getOwner()
}

const structuredMovie = (movies) =>
  movies
    .map((movie) => ({
      id: Number(movie.id),
      name: movie.name,
      imageUrl: movie.imageUrl,
      genre: movie.genre,
      description: movie.description,
      timestamp: Number(movie.timestamp),
      deleted: movie.deleted,
    }))
    .sort((a, b) => b.timestamp - a.timestamp)

const structuredTimeslot = (slots) =>
  slots
    .map((slot) => ({
      id: Number(slot.id),
      movieId: Number(slot.movieId),
      ticketCost: fromWei(slot.ticketCost),
      startTime: Number(slot.startTime),
      endTime: Number(slot.endTime),
      capacity: Number(slot.capacity),
      seats: Number(slot.seats),
      deleted: slot.deleted,
      completed: slot.completed,
      day: Number(slot.day),
      balance: fromWei(slot.balance),
    }))
    .sort((a, b) => {
      if (a.day !== b.day) {
        return a.day - b.day
      }
      return a.startTime - b.startTime
    })

export {
  connectWallet,
  isWalletConnected,
  getEthereumContract,
  loadBlockchainData,
  addMovie,
  updateMovie,
  deleteMovie,
  addTimeslot,
  deleteSlot,
  buyTicket,
  getMovie,
  getSlots,
  getSlot,
  markSlot,
  getTicketHolders,
  getOwner,
  toWei,
  withdraw,
}
