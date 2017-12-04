import React from 'react'
import { Link } from 'react-router-dom'
import { ParliamentPie } from '../components/parliament-pie/ParliamentPie'
import { PartySelector } from '../components/party-selector/PartySelector'

export const HomePage = () => (
  <div>
    {/* <h3 className="title has-text-centered">Riksdawgen</h3> */}
    <div className="has-text-centered" id="parliament-pie-container">
      <ParliamentPie />
    </div>
    <div
      className="tabs is-centered is-fullwidth"
      style={{ marginTop: '3rem' }}
    >
      <ul>
        <li>
          <Link to={`members`}>Vad gör min politiker?</Link>
        </li>
        <li>
          <Link to={`votes`}>Hur röstar våra politiker?</Link>
        </li>
      </ul>
    </div>
    <div style={{ marginTop: '5rem' }}>
      <PartySelector onChange={() => {}} />
    </div>
  </div>
)
