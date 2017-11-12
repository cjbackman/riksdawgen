import React from 'react'
import PropTypes from 'prop-types'
import { MemberVotesTableView } from './MemberVotesTableView'
import { Pagination } from '../../_shared/Pagination'

const propTypes = {
  votes: PropTypes.array.isRequired
}

export class MemberVotesTable extends React.Component {
  static propTypes = propTypes
  state = {
    pagedVotes: []
  }

  onChangePage = pagedVotes => {
    this.setState({ pagedVotes })
  }

  render () {
    return [
      <MemberVotesTableView key='votestable' votes={this.state.pagedVotes} />,
      <Pagination key='pagination' items={this.props.votes} onChangePage={this.onChangePage} pageSize={15} />
    ]
  }
}
