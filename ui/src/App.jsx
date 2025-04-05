import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './Login'
import Navbar from './Navbar'
import Messages from './Messages'
import QualityRegister from './QualityRegister'

function App() {
  const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/quality-register' element={<QualityRegister />} />
      </Routes>
    </>
  )
}

export default App
