const { ethers } = require('hardhat')
const fs = require('fs')

async function main() {
  const Contract = await ethers.getContractFactory('DappCinemas')
  const contract = await Contract.deploy()
  await contract.deployed()

  // You can remove this part if you wish

  const name = 'Spider-Man: Across the Spider-Verse'
  const imageUrl =
    'https://weliveentertainment.com/wp-content/uploads/2023/05/across-spider-verse-banner-4.jpg'
  const genre = 'Animated, Action, Adventure, Comedy, Sci-Fi'
  const description =
    'Miles Morales returns for an epic adventure across the multiverse, teaming up with Gwen Stacy and a new team of Spider-People to face a new threat.'

  await contract.addMovie(name, imageUrl, genre, description)

  // End...

  const address = JSON.stringify({ address: contract.address }, null, 4)
  fs.writeFile('./src/abis/contractAddress.json', address, 'utf8', (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Deployed contract address', contract.address)
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
