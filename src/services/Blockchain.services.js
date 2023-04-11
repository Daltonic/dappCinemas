import abi from "../abis/src/contracts/DappCinemas.sol/DappCinemas.json";
import address from "../abis/contractAddress.json";
import { getGlobalState, setGlobalState } from "../store";
import { ethers } from "ethers";

const { ethereum } = window;
const contractAddress = address.address;
const contractAbi = abi.abi;
let tx;

const toWei = (num) => ethers.utils.parseEther(num.toString());

const getEthereumContract = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);

  return contract;
};

const isWalletConnected = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0]);
    } else {
      alert("Please connect wallet.");
      console.log("No accounts found.");
    } 

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0]);

      await isWalletConnected().then(() => {
        window.location.reload();
      });
    });
    return accounts[0]
    
  } catch (error) {
    reportError(error);
  }
};

const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0]);
  } catch (error) {
    reportError(error);
  }
};

const addMovie = async ({ name, imageUrl, genre, description }) => {
  try {
    if (!ethereum) return alert("Please install metamask");

    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getEthereumContract();
    tx = await contract.addMovie(name, imageUrl, genre, description, {
      from: connectedAccount,
    });
    await tx.wait();
  } catch (err) {
    reportError(err);
  }
};

const updateMovie = async ({ id, name, imageUrl, genre, description }) => {
  try {
    if (!ethereum) return alert("Please install metamask");

    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getEthereumContract();
    tx = await contract.updateMovie(id, name, imageUrl, genre, description, {
      from: connectedAccount,
    });
    await tx.wait();
  } catch (err) {
    reportError(err);
  }
};

const deleteMovie = async (id) => {
  try {
    if (!ethereum) return alert("Please install metamask");

    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getEthereumContract();
    tx = await contract.deleteMovie(id, {
      from: connectedAccount,
    });
    await tx.wait();
  } catch (err) {
    reportError(err);
  }
};

const addSlot = async ({
  movieId,
  ticketCost,
  startTime,
  endTime,
  capacity,
  day,
}) => {
  try {
    if (!ethereum) return alert("Please install metamask");

    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getEthereumContract();

    tx = await contract.addSlot(movieId,toWei(ticketCost),startTime,endTime,capacity,day,
      {
        from: connectedAccount,
      }
    );

    await tx.wait();
  } catch (err) {
    reportError(err);
  }
};

const deleteSlot = async ({ id, day, movieId }) => {
  try {
    if (!ethereum) return alert("Please install metamask");

    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getEthereumContract();

    tx = contract.deleteSlot(id, day, movieId, {
      from: connectedAccount,
    });
    await tx.wait();
  } catch (err) {
    reportError(err);
  }
};

const publishTimeSlot = async ({ id, movieId }) => {
  try {
    if (!ethereum) return alert("Please install metamask");

    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getEthereumContract();
    tx = await contract.publishTimeSlot(id, movieId, {
      from: connectedAccount,
    });
    await tx.wait();
  } catch (err) {
    reportError(err);
  }
};

const buyTicket = async ({ movieId, day, id, ticketCost }) => {
  try {
    if (!ethereum) return alert("Please install metamask");

    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getEthereumContract();
    tx = await contract.buyTicket(movieId, day, id, {
      from: connectedAccount,
      value: toWei(ticketCost),
    });
    await tx.wait();
  } catch (err) {
    reportError(err);
  }
};

const movieToTicketHolders = async (movieId) => {
  try {
    if (!ethereum) return alert("Please install metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getEthereumContract();

    const result = await contract.movieToTicketHolders(movieId, {
      from: connectedAccount,
    });
    setGlobalState("movieToTicketHolderStatus", result);
  } catch (err) {
    reportError(err);
  }
};

const getMovies = async () => {
  try {
    if (!ethereum) return alert("Please install metamask");
    const contract = await getEthereumContract();
    const movies = await contract.getMovies();
    setGlobalState("movies", structuredMovie(movies));
    console.log(movies)
  } catch (err) {
    reportError(err);
  }
};

const getMovie = async (id) => {
  try {
    if (!ethereum) return alert("Please install metamask");
    const contract = await getEthereumContract();
    const movie = await contract.getMovie(id);
    setGlobalState("movie", structuredMovie([movie])[0]);
  } catch (err) {}
};

const getSlots = async (day) => {
  try {
    if (!ethereum) return alert("Please install metamask");
    const contract = await getEthereumContract();
    const slots = await contract.getSlots(day);
    setGlobalState("slotsForDay", structuredTimeslot(slots));
  } catch (err) {
    reportError(err);
  }
};

const getTicketHolders = async (movieId, day) => {
  try {
    if (!ethereum) return alert("Please install metamask");
    const contract = await getEthereumContract();
    const ticketHolders = await contract.getTicketHolders(movieId, day);
    setGlobalState("ticketHolders", structuredTicket(ticketHolders));
  } catch (err) {
    reportError(err);
  }
};

const movieSlots = async (movieId) => {
  try {
    if (!ethereum) return alert("Please install metamask");
    const contract = await getEthereumContract();
    const slots = await contract.getSlotsForMovie(movieId);
    setGlobalState("movieSlots", structuredTimeslot(slots));
  } catch (err) {
    reportError(err);
  }
};

const getOwner = async () => {
  try {
    if (!ethereum) return alert("Please install metamask");
    const contract = await getEthereumContract();
    const deployer = await contract.returnOwner()
    setGlobalState('deployer',deployer)
  } catch (err) {
    reportError(err);
  }
};

const structuredMovie = (movies) =>
  movies.map((movie) => ({
    id: Number(movie.id),
    name: movie.name,
    imageUrl: movie.imageUrl,
    genre: movie.genre,
    description: movie.description,
    timestamp: new Date(movie.timestamp).getTime(),
    deleted: movie.deleted,
  }));

const structuredTimeslot = (slots) =>
  slots.map((slot) => ({
    id: Number(slot.id),
    movieId: Number(slot.movieId),
    ticketCost: Number(slot.ticketCost),
    startTime: slot.startTime.toNumber(),
    endTime: slot.endTime.toNumber(),
    capacity: Number(slot.capacity),
    seatings: Number(slot.seatings),
    deleted: slot.deleted,
    published: slot.published,
    day: slot.day.toNumber(),
  }));

const structuredTicket = (tickets) =>
  tickets.map((ticket) => ({
    id: Number(ticket.id),
    movieId: Number(ticket.movieId),
    slotId: Number(ticket.slotId),
    owner: ticket.owner.toLowerCase(),
    cost: Number(ticket.cost),
    timestamp: new Date(ticket.timestamp).getTime(),
    day: new Date(ticket.day).getTime(),
    refunded: ticket.refunded,
  }));

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
  structuredTimeslot
};
