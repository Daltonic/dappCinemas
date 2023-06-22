const { expect } = require('chai')
const { ethers } = require('hardhat')

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe('Contracts', () => {
  const name = 'Terminator salvation'
  const imageUrl = 'https://image.png'
  const genre = 'thrill'
  const description = 'Really cool movie'
  const movieId = 1
  const slotId = 1

  let contract, result
  beforeEach(async () => {
    const Contract = await ethers.getContractFactory('DappCinemas')
    ;[deployer, buyer1, buyer2] = await ethers.getSigners()

    contract = await Contract.deploy()
    await contract.deployed()
  })

  describe('Movie Management', () => {
    beforeEach(async () => {
      await contract.addMovie(name, imageUrl, genre, description)
    })

    it('should create a movie and verify its details', async () => {
      result = await contract.getMovies()
      expect(result).to.have.lengthOf(1)

      result = await contract.getMovie(movieId)
      expect(result.name).to.be.equal(name)
      expect(result.imageUrl).to.be.equal(imageUrl)
      expect(result.genre).to.be.equal(genre)
      expect(result.description).to.be.equal(description)
    })

    it('should update movie details and verify the changes', async () => {
      const updatedName = 'Terminator 2: Judgment Day'
      const updatedImageUrl = 'https://updated-image.jpg'
      const updatedGenre = 'Action'
      const updatedDescription = 'One of the best action movies ever'

      await contract.updateMovie(
        movieId,
        updatedName,
        updatedImageUrl,
        updatedGenre,
        updatedDescription
      )

      const result = await contract.getMovie(movieId)
      expect(result.name).to.be.equal(updatedName)
      expect(result.imageUrl).to.be.equal(updatedImageUrl)
      expect(result.genre).to.be.equal(updatedGenre)
      expect(result.description).to.be.equal(updatedDescription)
    })

    it('should delete a movie and ensure it is no longer accessible', async () => {
      result = await contract.getMovie(movieId)
      expect(result.deleted).to.be.equal(false)

      await contract.deleteMovie(movieId)

      result = await contract.getMovie(movieId)
      expect(result.deleted).to.be.equal(true)
    })
  })

  describe('Showtime Management', () => {
    const ticketCosts = [toWei(0.02), toWei(0.04)]
    const days = [1687305600000, 1687405600000]
    const startTimes = [1687309200000, 1687309200000]
    const endTimes = [1687314600000, 1687314600000]
    const capacities = [5, 7]

    beforeEach(async () => {
      await contract.addMovie(name, imageUrl, genre, description)
      await contract.addTimeslot(
        movieId,
        ticketCosts,
        startTimes,
        endTimes,
        capacities,
        days
      )
    })

    it('should add a showtime and ensure it is added successfully', async () => {
      result = await contract.getTimeSlots(movieId)
      expect(result).to.have.lengthOf(2)

      result = await contract.getTimeSlotsByDay(days[0])
      expect(result).to.have.lengthOf(1)

      result = await contract.getTimeSlot(slotId)
      expect(result.day).to.be.equal(days[0])
      expect(result.startTime).to.be.equal(startTimes[0])
      expect(result.endTime).to.be.equal(endTimes[0])
      expect(result.ticketCost).to.be.equal(ticketCosts[0])
    })

    it('should delete a showtime and verify that it is no longer available.', async () => {
      result = await contract.getTimeSlots(movieId)
      expect(result).to.have.lengthOf(2)

      result = await contract.getTimeSlot(slotId)
      expect(result.deleted).to.be.equal(false)

      await contract.deleteTimeSlot(movieId, slotId)

      result = await contract.getTimeSlots(movieId)
      expect(result).to.have.lengthOf(1)

      result = await contract.getTimeSlot(slotId)
      expect(result.deleted).to.be.equal(true)
    })
  })

  describe('Ticket Booking', () => {
    const ticketCosts = [toWei(0.02), toWei(0.04)]
    const days = [1687305600000, 1687305600000]
    const startTimes = [1687309200000, 1687309200000]
    const endTimes = [1687314600000, 1687314600000]
    const capacities = [5, 7]

    beforeEach(async () => {
      await contract.addMovie(name, imageUrl, genre, description)
      await contract.addTimeslot(
        movieId,
        ticketCosts,
        startTimes,
        endTimes,
        capacities,
        days
      )
    })

    it('should book a ticket for a specific movie and verify that it is booked successfully', async () => {
      result = await contract.getMovieTicketHolders(movieId, slotId)
      expect(result).to.have.lengthOf(0)

      const tickets = 2
      await contract.connect(buyer1).buyTicket(movieId, slotId, tickets, {
        value: toWei(fromWei(ticketCosts[0]) * tickets),
      })

      result = await contract.getMovieTicketHolders(movieId, slotId)
      expect(result).to.have.lengthOf(tickets)
    })

    it('should calculate the total revenue generated by a movie, verify and turn over to company balance', async () => {
      result = await contract.balance()
      expect(result).to.be.equal(0)

      result = await contract.getTimeSlot(slotId)
      expect(result.balance).to.be.equal(0)

      const tickets = 2
      await contract.connect(buyer1).buyTicket(movieId, slotId, tickets, {
        value: toWei(fromWei(ticketCosts[0]) * tickets),
      })

      result = await contract.balance()
      expect(result).to.be.equal(0)

      result = await contract.getTimeSlot(slotId)
      expect(result.balance).to.be.equal(
        toWei(fromWei(ticketCosts[0]) * tickets)
      )

      await contract.markTimeSlot(movieId, slotId)

      result = await contract.balance()
      expect(result).to.be.equal(toWei(fromWei(ticketCosts[0]) * tickets))

      result = await contract.getTimeSlot(slotId)
      expect(result.balance).to.be.equal(0)
    })

    it('should Cancel a booked ticket and verify that it is no longer valid.', async () => {
      result = await contract.getTimeSlot(slotId)
      expect(result.balance).to.be.equal(0)

      const tickets = 2
      await contract.connect(buyer1).buyTicket(movieId, slotId, tickets, {
        value: toWei(fromWei(ticketCosts[0]) * tickets),
      })

      result = await contract.getTimeSlot(slotId)
      expect(result.balance).to.be.equal(
        toWei(fromWei(ticketCosts[0]) * tickets)
      )

      await contract.deleteTimeSlot(movieId, slotId)

      result = await contract.getTimeSlot(slotId)
      expect(result.balance).to.be.equal(0)
    })

    it('should withdraw from company balance and verify account value', async () => {
      result = await contract.balance()
      expect(result).to.be.equal(0)

      const tickets = 2
      await contract.connect(buyer1).buyTicket(movieId, slotId, tickets, {
        value: toWei(fromWei(ticketCosts[0]) * tickets),
      })

      await contract.markTimeSlot(movieId, slotId)

      result = await contract.balance()
      expect(result).to.be.equal(toWei(fromWei(ticketCosts[0]) * tickets))

      await contract.withdrawTo(deployer.address, ticketCosts[0])

      result = await contract.balance()
      expect(result).to.be.equal(ticketCosts[0])
    })
  })
})
