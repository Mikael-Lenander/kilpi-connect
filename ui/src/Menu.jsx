import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <div className='container'>
      <h2>How do you want to report your symptoms?</h2>
      <div className='menu-container'>
        <Link to='/questionnaire' className='menu-link'>
          Questionnaire
          <hr />
          <p>Fill a quick form about your symptoms.</p>
        </Link>
        <Link to='/voice-chat' className='menu-link'>
          Voice Chat
          <hr />
          <p>Report your symptoms verbally.</p>
        </Link>
      </div>
    </div>
  )
}
