import React, { useState } from 'react'

const messages = [
  {
    id: 1,
    date: '2025-04-07',
    text: "Patient Faiza's TSH is not measured for 12 months.",
    button: 'Schedule a lab test',
  },
  {
    id: 2,
    date: '2025-04-09',
    text: "Patient Nadim's TSH is out of reference range.",
    button: 'Schedule an appointment',
  },
  {
    id: 3,
    date: '2025-04-10',
    text: 'Patient Mikael reported severe symptoms.',
    button: 'Schedule an appointment',
  },
]

export default function Messages() {
  const [visibleMessages, setVisibleMessages] = useState(messages.reduce((obj, message) => ({ ...obj, [message.id]: true }), {}))

  return (
    <div className='content'>
      <h2 style={{ margin: '10px', fontSize: 30 }}>Messages</h2>
      {messages
        .filter(message => visibleMessages[message.id])
        .map(message => (
          <div className='alert-box' key={message.id}>
            <h4 style={{ marginBottom: 5 }}>{message.text}</h4>
            <p style={{ paddingBottom: 10 }}>{message.date}</p>
            <button className='primary-btn'>{message.button}</button>
            <button className='primary-btn'>See the details</button>
            <button className='primary-btn'>Renew prescription</button>
            <button className='secondary-btn' onClick={() => setVisibleMessages({ ...visibleMessages, [message.id]: false })}>
              Ignore
            </button>
          </div>
        ))}
    </div>
  )
}
