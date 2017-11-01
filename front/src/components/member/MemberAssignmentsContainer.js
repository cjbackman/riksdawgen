import React from 'react'
import PropTypes from 'prop-types'
import { MemberAssignments } from './MemberAssignments'
import { Pagination } from '../_shared/Pagination'

export class MemberAssignmentsContainer extends React.Component {
  static propTypes = {
    member: PropTypes.object.isRequired
  }

  state = { pagedAssignments: [] }

  onChangePage = (pagedAssignments) => {
    this.setState({ pagedAssignments })
  }

  render () {
    return (
      <div>
        <h2 className='subtitle'>Uppdrag</h2>
        <MemberAssignments assignments={this.state.pagedAssignments} />
        <Pagination items={this.props.member.assignments} onChangePage={this.onChangePage} pageSize={10} />
      </div>
    )
  }
}
