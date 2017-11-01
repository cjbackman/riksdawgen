import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  member: PropTypes.object.isRequired
}

export const MemberGraph = ({ member }) => (
  <div>
    <h2 className='subtitle'>Voteringar</h2>
  </div>
)

MemberGraph.propTypes = propTypes
