import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { MembersTable } from '../components/members/MembersTable'
import { MembersBargraph } from '../components/members/MembersBargraph'
import { GenderBarChart } from '../components/gender-bar-chart/GenderBarChart'
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
      <div className="columns">
        <div className="column is-6">
          <MembersTable members={members} />
        </div>
        <div className="column is-6">
          <MembersBargraph members={members} />
        </div>
      </div>
      <div className="columns">
        <div className="column is-6">
          <GenderBarChart members={members} />
        </div>
      </div>
    </div>
  )

_MembersPage.propTypes = propTypes

const mapStateToProps = state => ({
  isFetching: state.member.isFetching,
  members: state.member.members
})

export const MembersPage = connect(mapStateToProps)(_MembersPage)
