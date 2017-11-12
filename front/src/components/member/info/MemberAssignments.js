import React from 'react'
import PropTypes from 'prop-types'
import { MemberAssignmentsView } from './MemberAssignmentsView'
import { Pagination } from '../../_shared/Pagination'

const currentDate = new Date()

const propTypes = {
  member: PropTypes.object.isRequired
}

export class MemberAssignments extends React.Component {
  static propTypes = propTypes
  state = {
    active: [],
    previous: [],
    paged: [],
    showActive: true
  }

  componentWillMount () {
    this.props.member.assignments.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
    const active = this.props.member.assignments
      .filter(a => !a.end_date || new Date(a.end_date).getTime() > currentDate.getTime())
    const previous = this.props.member.assignments
      .filter(a => a.end_date && new Date(a.end_date).getTime() < currentDate.getTime())
    this.setState({
      active,
      previous
    })
  }

  onChangePage = (paged) => {
    this.setState({ paged })
  }

  toggleTab = (showActive) => {
    this.setState({ showActive })
  }

  render () {
    return (
      <div>
        <div className='tabs'>
          <ul>
            <li className={this.state.showActive ? 'is-active' : ''} onClick={() => this.toggleTab(true)}><a>Aktiva uppdrag</a></li>
            <li className={!this.state.showActive ? 'is-active' : ''} onClick={() => this.toggleTab(false)}><a>Tidigare uppdrag</a></li>
          </ul>
        </div>
        <MemberAssignmentsView assignments={this.state.paged} />
        <Pagination
          items={this.state.showActive ? this.state.active : this.state.previous}
          onChangePage={this.onChangePage}
          pageSize={5}
          size='small' />
      </div>
    )
  }
}
