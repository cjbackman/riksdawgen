import React from 'react'
import PropTypes from 'prop-types'
import { parties } from '../../utils'

const propTypes = {
  onChange: PropTypes.func.isRequired
}

export const PartySelector = ({ onChange }) => (
  <div className="columns">
    {parties.map((p, i) => (
      <div
        key={i}
        className="column has-text-centered"
        onClick={() => onChange(p)}
      >
        <img
          src={p.logo}
          style={{ width: '40px', height: '40px', cursor: 'pointer' }}
        />
      </div>
    ))}
  </div>
)

PartySelector.propTypes = propTypes
