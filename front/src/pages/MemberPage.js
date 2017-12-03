import React from 'react'
import PropTypes from 'prop-types'
import { MemberInfo } from '../components/member/info/MemberInfo'
import { MemberVotes } from '../components/member/votes/MemberVotes'

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
}

export const MemberPage = ({ match }) => (
  <div className="columns">
    <div className="column is-one-third">
      <MemberInfo memberId={match.params.id} />
      <h2 className="subtitle">Dokument</h2>
    </div>
    <div className="column is-two-thirds">
      <MemberVotes memberId={match.params.id} />
    </div>
  </div>
)

MemberPage.propTypes = propTypes
