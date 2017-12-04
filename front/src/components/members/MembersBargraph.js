import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MembersHistChart } from './MembersHistChart'
import { parties } from '../../utils'
import { PartySelector } from '../party-selector/PartySelector'

export class MembersBargraph extends Component {
  static propTypes = {
    members: PropTypes.array.isRequired
  }

  state = {
    party: parties[0]
  }

  partyChanged = party => {
    this.setState({ party })
  }

  render() {
    return (
      <div>
        <div className="label has-text-centered is-size-7">
          {this.state.party.label}
        </div>
        <div className="has-text-centered">
          <MembersHistChart
            dimension={'age'}
            filter={this.state.party.value}
            size={[600, 320]}
            data={this.props.members}
          />
        </div>
        <div style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
          <PartySelector onChange={this.partyChanged} />
        </div>
      </div>
    )
  }
}
