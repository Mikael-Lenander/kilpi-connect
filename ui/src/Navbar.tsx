import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('apotti-mock-token')
    navigate('/login')
  }

  return (
    <nav>
      <div className='logo'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/4/41/Apotti-j%C3%A4rjestelm%C3%A4n_logo.png' alt='Apotti Logo' style={{ height: '50px' }} />
      </div>

      <div className='nav-links'>
        {isAuthenticated() ? (
          <>
            <Link to='/messages'>Messages</Link>
            <Link to='/quality-register'>Quality register</Link>
            <a href='#' onClick={handleLogout}>Log out</a>
          </>
        ) : (
          <>
            <a href='#'>Apotti</a>
            <a href='#'>Careers at Apotti</a>
            <a href='#'>Ecosystem</a>
            <a href='#'>Maisa</a>
            <a href='#'>Contact</a>
            <a href='#'>EN</a>
          </>
        )}
      </div>
    </nav>
  )
}

function isAuthenticated() {
  return localStorage.getItem('apotti-mock-token') != null
}
