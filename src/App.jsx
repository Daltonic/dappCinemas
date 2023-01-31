
import Aside from './component/Aside'
import Header from './component/Header'
import BrowsePage from './pages/BrowsePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="min-h-screen flex">
      <Aside />
      <div className='flex-1'>
        <Header />
        <Routes>
          <Route path="/" element={<BrowsePage/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
