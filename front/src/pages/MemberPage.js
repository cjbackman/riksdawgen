import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MemberInfo } from '../components/member/MemberInfo'
import { Spinner } from '../components/_shared/Spinner'
import { fetchMember } from '../actions/memberActions'
import { MemberVotes } from '../components/member/MemberVotes'
import { MemberAssignmentsContainer } from '../components/member/MemberAssignmentsContainer'

export class _MemberPage extends React.Component {
  static propTypes = {
    memberId: PropTypes.string.isRequired,
    fetchMember: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    member: PropTypes.object
  }

  componentDidMount () {
    const { memberId } = this.props
    this.props.fetchMember(memberId)
  }

  render () {
    return (
      this.props.isFetching || !this.props.member ? <Spinner /> : <div>
        <div className='columns'>
          <div className='column is-one-third'>
            <MemberInfo member={this.props.member} />
            <MemberAssignmentsContainer member={this.props.member} />
            <h2 className='subtitle'>Dokument</h2>
          </div>
          <div className='column is-two-thirds'>
            <MemberVotes member={this.props.member} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  memberId: ownProps.match.params.id,
  isFetching: state.member.isFetching,
  member: state.member.member
})

export const MemberPage = connect(mapStateToProps, { fetchMember })(_MemberPage)
