import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { MembersTable } from '../components/members/MembersTable'
import { MembersBargraph } from '../components/members/MembersBargraph'
import { Spinner } from '../components/_shared/Spinner'

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  members: PropTypes.array.isRequired
}

const _MembersPage = ({ isFetching, members }) =>
  isFetching ? (
    <Spinner />
  ) : (
    <div className="columns">
      <div className="column is-6">
        <h2 className="subtitle border-bottom">Ledamöter</h2>
        <MembersTable members={members} />
      </div>
      <div className="column is-6">
        <h2 className="subtitle border-bottom">En smutt graf</h2>
        <MembersBargraph members={members} />
      </div>
    </div>
  )

_MembersPage.propTypes = propTypes

const mapStateToProps = state => ({
  isFetching: state.member.isFetching,
  members: state.member.members
})

export const MembersPage = connect(mapStateToProps)(_MembersPage)
