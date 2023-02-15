import { BrowsePage, MovieDetailsPage } from './pages'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Header,Sidebar,Form} from './component'

import './App.css'

const App = () => {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 overflow-auto ">
        <Header/>
        <Routes>
          <Route path="/" element={<BrowsePage />} />
          <Route path="/moviedetails" element={<MovieDetailsPage />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
