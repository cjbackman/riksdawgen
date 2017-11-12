import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from '../../_shared/Spinner'
import { MemberProfileView } from './MemberProfileView'
import { MemberAssignments } from './MemberAssignments'
import { Config } from '../../../config'

const propTypes = {
  memberId: PropTypes.string.isRequired
}

export class MemberInfo extends React.Component {
  static propTypes = propTypes

  state = { loading: true, member: {} }

  componentDidMount () {
    const { memberId } = this.props
    fetch(Config.API_URL + '/api/member/' + memberId)
      .then(response => response.json())
      .then(
        member => this.setState({ loading: false, member }),
        error => console.log('An error occured.', error)
      )
  }

  render () {
    return this.state.loading ? <Spinner />
      : [
        <MemberProfileView key='profile' member={this.state.member} />,
        <MemberAssignments key='assignments' member={this.state.member} />
      ]
  }
}
