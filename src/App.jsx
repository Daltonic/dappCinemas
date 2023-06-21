import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { isWalletConnected, loadBlockchainData } from './services/blockchain'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Addmovie from './pages/Addmovie'
import ListMovies from './pages/ListMovies'
import MovieDetails from './pages/MovieDetails'
import ManageMovies from './pages/ManageMovies'
import { ToastContainer } from 'react-toastify'
import UpdateMovie from './components/UpdateMovie'
import DeleteMovie from './components/DeleteMovie'
import { checkAuthState } from './services/chat'
import TimeSlots from './pages/TimeSlots'
import AddTimeslot from './pages/AddTimeslot'
import DeleteSlot from './components/DeleteSlot'

const App = () => {
  useEffect(async () => {
    await isWalletConnected()
    await loadBlockchainData()
    await checkAuthState()
  }, [])

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header />
        <Routes>
          <Route path="/" element={<ListMovies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/timeslot/:id" element={<TimeSlots />} />
          <Route path="/timeslot/add/:id" element={<AddTimeslot />} />
          <Route path="/add/movies" element={<Addmovie />} />
          <Route path="/manage/movies" element={<ManageMovies />} />
        </Routes>
      </div>

      <UpdateMovie />
      <DeleteMovie />
      <DeleteSlot />

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
  )
}

export default App
