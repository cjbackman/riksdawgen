import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  member: PropTypes.object.isRequired
}

export const MemberProfileView = ({ member }) => (
  <div>
    <h2 className='subtitle'>{member.name}</h2>
    <div className='columns'>
      <div className='column is-4'>
        <img src={member.image} />
      </div>
      <div className='column is-8'>
        <div className='field is-grouped'>
          <label className='label control'>År</label>
          <p className='control'>{member.age}</p>
        </div>
        <div className='field is-grouped'>
          <label className='label control'>Parti</label>
          <p className='control'>{member.party}</p>
        </div>
        <div className='field is-grouped'>
          <label className='label control'>Valkrets</label>
          <p className='control'>{member.constituency}</p>
        </div>
      </div>
    </div>
  </div>
)

MemberProfileView.propTypes = propTypes
