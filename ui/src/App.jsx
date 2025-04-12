import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import Navbar from './Navbar'
import Messages from './Messages'
import QualityRegister from './QualityRegister'
import Patient from './Patient'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/quality-register' element={<QualityRegister />} />
        <Route path='/patient/123' element={<Patient />} />
      </Routes>
    </>
  )
}

export default App
