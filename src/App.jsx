import './App.css' ;
import Sidebar from './component/Sidebar'
import Header from './component/Header'
import BrowsePage from './pages/BrowsePage'
import MovieDetailsPage from './pages/MovieDetailsPage'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className='flex-1 overflow-auto '>
        <Header />
        <Routes>
          <Route path="/" element={<BrowsePage/>} />
          <Route path="/moviedetails" element={<MovieDetailsPage/>} />
         
        </Routes>
      </div>
    </div>
  )
}

export default App
