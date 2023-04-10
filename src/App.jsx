import {useState,useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  isWalletConnected
} from "./services/Blockchain.services";
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Addmovie from './components/Addmovie'
import Timeslot from './components/Timeslot'
import BrowsePage from './pages/BrowsePage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageMovies from './pages/ManageMovies';

const App = () => {
  const [loaded,setLoaded] = useState(false)

  useEffect(async ()=>{
    await isWalletConnected().then(()=> setLoaded(true));
  },[])

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header />
        {loaded ? (
          <Routes>
            <Route path="/" element={<BrowsePage />} />
            <Route path="/moviedetails/:id" element={<MovieDetailsPage />} />
            <Route path="/addmovies" element={<Addmovie />} />
            <Route path="/timeslot" element={<Timeslot />} />
            <Route path='/managemovies' element={<ManageMovies/>}/>
          </Routes>
        ) : null}
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App
