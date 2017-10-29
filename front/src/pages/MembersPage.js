import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { MembersTableContainer } from '../components/members/MembersTableContainer'
import { MembersBargraph } from '../components/members/MembersBargraph'
import { Spinner } from '../components/_shared/Spinner'

class _MembersPage extends React.Component {
  render () {
    return (
      this.props.isFetching ? <Spinner />
        : <div className='columns'>
          <div className='column is-4 is-offset-1'>
            <h2 className='subtitle border-bottom'>Ledamöter</h2>
            <MembersTableContainer members={this.props.members} isFetching={this.props.isFetching} />
          </div>
          <div className='column is-4 is-offset-1'>
            <h2 className='subtitle border-bottom'>En smutt graf</h2>
            <MembersBargraph members={this.props.members} isFetching={this.props.isFetching} />
          </div>
        </div>
    )
  }
}

_MembersPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  members: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  isFetching: state.member.isFetching,
  members: state.member.members
})

export const MembersPage = connect(mapStateToProps)(_MembersPage)
