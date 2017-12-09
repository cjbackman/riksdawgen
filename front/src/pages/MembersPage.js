import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { MembersTable } from '../components/members/MembersTable'
import { Spinner } from '../components/_shared/Spinner'

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  members: PropTypes.array.isRequired
}

const _MembersPage = ({ isFetching, members }) =>
  isFetching ? (
    <Spinner />
  ) : (
    <div>
      <MembersTable members={members} />
    </div>
  )

_MembersPage.propTypes = propTypes

const mapStateToProps = state => ({
  isFetching: state.member.isFetching,
  members: state.member.members
})

export const MembersPage = connect(mapStateToProps)(_MembersPage)
