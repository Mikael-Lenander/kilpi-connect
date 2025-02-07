import { Routes, Route, useNavigate } from 'react-router-dom'
import Questionnaire from './Questionnaire'
import VoiceChat from './VoiceChat'
import Menu from './Menu'

function App() {
  const navigate = useNavigate()

  return (
    <>
      <nav className='navbar'>
        <h1 onClick={() => navigate('/')} className='navbar-brand'>
          Maisa
        </h1>
      </nav>
      <Routes>
        <Route path='/' element={<Menu />} />
        <Route path='/questionnaire' element={<Questionnaire />} />
        <Route path='/voice-chat' element={<VoiceChat />} />
      </Routes>
    </>
  )
}

export default App
