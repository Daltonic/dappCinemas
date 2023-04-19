const { expect } = require('chai')

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)


describe('Contracts',()=>{
    const name = 'Terminator salvation'
    const imageUrl = 'https://image.png'
    const genre = 'thrill'
    const description = 'Really cool movie'
    const newName = 'Terminators salvation'
    const newImageUrl = 'https://img.jpg'
    const id = 1
    
    const ticketCost = toWei(3),
    capacity = 13

    const startTime = 1680264000000,
    endTime = 1680267600000,
    day = 1680220800000


    beforeEach(async () => {
    const Contract = await ethers.getContractFactory('DappCinemas')
    ;[deployer, buyer1, buyer2] = await ethers.getSigners()

    contract = await Contract.deploy()
    await contract.deployed()
  })

  describe('Movie',()=>{
    beforeEach(async()=>{
        await contract.connect(deployer).addMovie(
          name,imageUrl,genre,description
        )
    })

    it('should confirm movie in array',async()=>{
      result = await contract.getMovies()
      expect(result).to.have.lengthOf(1)
    })

    it('should confirm fetching movie appropriately',async ()=> {
        result = await contract.getMovie(id)
        expect(result.name).to.be.equal(name)
        expect(result.imageUrl).to.be.equal(imageUrl)
        expect(result.genre).to.be.equal(genre)
        expect(result.description).to.be.equal(description)
    })

    it('should confirm apartment update',async () => {
        result = await contract.getMovie(id)
        expect(result.name).to.be.equal(name)
        expect(result.imageUrl).to.be.equal(imageUrl)

        await contract.connect(deployer).updateMovie(
          id,
          newName,
          newImageUrl,
          genre,
          description
        )

        result = await contract.getMovie(id)
        expect(result.name).to.be.equal(newName)
        expect(result.imageUrl).to.be.equal(newImageUrl)
    })
  })

  describe('Slots',()=>{
      beforeEach(async()=>{
        await contract.connect(deployer).addMovie(
          name,imageUrl,genre,description
        )
    })
    it('should confirm adding slots correctly',async ()=> {
       result = await contract.getSlotsForMovie(id)
       expect(result).to.have.lengthOf(0)

       await contract.addSlot(id,ticketCost,startTime,endTime,capacity,day)
       result = await contract.getSlotsForMovie(id)
       secondResult = await contract.getSlots(day)
       expect(result).to.have.lengthOf(1)
       expect(secondResult).to.have.lengthOf(1)
    })

    it('should confirm slots deleting',async ()=> {
      await contract.addSlot(id,ticketCost,startTime,endTime,capacity,day)
      result = await contract.getSlot(id,0)
      expect(result.deleted).to.be.equal(false)

      await contract.deleteSlot(0,id)
      result = await contract.getSlot(id,0)
      secondResult = await contract.getSlotForDay(0,day)
      expect(result.deleted).to.be.equal(true)
      expect(secondResult.deleted).to.be.equal(true)
    })
  })

  describe('Ticket buying',()=> {
    beforeEach(async()=>{
        await contract.connect(deployer).addMovie(
          name,imageUrl,genre,description
        )

        await contract.connect(deployer).addSlot(
          id,ticketCost,startTime,endTime,capacity,day
        )
    })

    it('should confirm publishing slots', async ()=> {
       await contract.connect(deployer).publishTimeSlot(0,id,day)
       result = await contract.getSlot(id,0)
       expect(result.published).to.be.equal(true)
    })

    it('should confirm ticket buying', async ()=> {
        await contract.connect(deployer).publishTimeSlot(0,id,day)
        await contract.connect(buyer1).buyTicket(id,day,0,{
          value: ticketCost
        })
        result = await contract.getTicketHolders(id,0)
        expect(result).to.have.lengthOf(1)
    })

  })
}) 