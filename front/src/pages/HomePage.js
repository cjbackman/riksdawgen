import React from 'react'
import { Link } from 'react-router-dom'

export const HomePage = () => (
  <div className='container'>
    <h1 className='title has-text-centered'>Riksdawgen</h1>
    <div className='tabs is-centered is-fullwidth' style={{ marginTop: '10rem' }}>
      <ul>
        <li>
          <Link to={`members`}>
            Vad gör min politiker?
          </Link>
        </li>
        <li>
          <Link to={`budget`}>
            Vad kostar Sverige?
          </Link>
        </li>
      </ul>
    </div>
  </div>
)
