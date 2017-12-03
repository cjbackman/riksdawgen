import React from 'react'
import PropTypes from 'prop-types'
import { MemberVotesTable } from './MemberVotesTable'

const propTypes = {
  votes: PropTypes.array.isRequired
}

export const MemberVotesView = ({ votes }) => (
  <div>
    <h2 className="subtitle">Voteringar</h2>
    <MemberVotesTable votes={votes} />
  </div>
)

MemberVotesView.propTypes = propTypes
