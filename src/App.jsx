
import Sidebar from './component/Sidebar'
import Header from './component/Header'
import BrowsePage from './pages/BrowsePage'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className='flex-1 overflow-auto '>
        <Header />
        <Routes>
          <Route path="/" element={<BrowsePage/>} />
         
        </Routes>
      </div>
    </div>
  )
}

export default App
