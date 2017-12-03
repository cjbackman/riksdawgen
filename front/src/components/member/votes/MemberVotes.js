import React from 'react'
import PropTypes from 'prop-types'
import { Config } from '../../../config'
import { Spinner } from '../../_shared/Spinner'
import { MemberVotesView } from './MemberVotesView'

const propTypes = {
  memberId: PropTypes.string.isRequired
}

export class MemberVotes extends React.Component {
  static propTypes = propTypes

  state = { loading: true, votes: [] }

  onYearChanged = selectedYear => {
    this.setState({ selectedYear })
  }

  componentDidMount() {
    const { memberId } = this.props
    fetch(Config.API_URL + '/api/member/voting/' + memberId)
      .then(response => response.json())
      .then(
        res => this.setState({ loading: false, votes: res.votes }),
        error => console.log(error)
      )
  }

  render() {
    return this.state.loading ? (
      <Spinner />
    ) : (
      <MemberVotesView votes={this.state.votes} />
    )
  }
}
