import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [role, setRole] = useState('doctor')

  function activeClass(activeRole) {
    return role === activeRole ? 'active' : ''
  }

  function login() {
    localStorage.setItem('apotti-mock-token', 'mock-token')
    navigate('/messages')
  }

  return (
    <div className='container'>
      <div className='login-toggle'>
        <button className={activeClass('doctor')} onClick={() => setRole('doctor')}>
          Login as Doctor
        </button>
        <button onClick={() => setRole('patient')} className={activeClass('patient')}>
          Login as Patient
        </button>
      </div>
      <div className='form-wrapper'>
        {role === 'doctor' ? (
          <div className='form-section active' id='doctor'>
            <h2>Doctor Login</h2>
            <div className='input-group'>
              <input type='email' placeholder='Enter your email' />
            </div>
            <div className='input-group'>
              <input type='password' placeholder='Enter your password' />
            </div>
            <a href='#' className='forgot-password'>
              Forgot password?
            </a>
            <button className='login-btn' onClick={login}>Login</button>
            <div className='signup-link'>
              Don't have an account? <a href='#'>Signup now</a>
            </div>
          </div>
        ) : (
          <div className='form-section active' id='patient'>
            <h2>Patient Login</h2>
            <div className='input-group'>
              <input type='email' placeholder='Enter your email' />
            </div>
            <div className='input-group'>
              <input type='password' placeholder='Enter your password' />
            </div>
            <a href='#' className='forgot-password'>
              Forgot password?
            </a>
            <button className='login-btn'>Login</button>
            <div className='signup-link'>
              Don't have an account? <a href='#'>Signup now</a>
            </div>
          </div>
        )}
        <div className='image-section'></div>
      </div>
    </div>
  )
}
