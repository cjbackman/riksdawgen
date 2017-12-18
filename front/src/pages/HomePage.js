import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ParliamentPie } from '../components/parliament-pie/ParliamentPie'
// import { PartySelector } from '../components/party-selector/PartySelector'
import { GenderBarChart } from '../components/gender-bar-chart/GenderBarChart'
import { GenderDonutChart } from '../components/gender-donut-chart/GenderDonutChart'
import { AgeHistChart } from '../components/age-hist-chart/AgeHistChart'
import { Spinner } from '../components/_shared/Spinner'
import { AgeBarChart } from '../components/age-bar-chart/AgeBarChart'

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  members: PropTypes.array.isRequired
}

class _HomePage extends Component {
  static propTypes = propTypes

  state = {
    party: null
  }

  partyChanged = party => {
    this.setState({ party })
  }

  render() {
    return (
      <div>
        {/* <div style={{ marginTop: '3rem' }}>
          <PartySelector onChange={this.partyChanged} />
        </div> */}
        <div
          className="tabs is-centered is-fullwidth"
          style={{ marginTop: '3rem' }}
        >
          <ul>
            <li>
              <Link to={`members`}>Vad gör min politiker?</Link>
            </li>
            <li>
              <Link to={`votes`}>Hur röstar våra politiker?</Link>
            </li>
          </ul>
        </div>

        <div className="columns">
          <div className="column has-text-centered in-middle">
            {this.props.isFetching ? (
              <Spinner />
            ) : this.state.party ? (
              <GenderDonutChart
                members={this.props.members}
                party={this.state.party}
              />
            ) : (
              <GenderBarChart members={this.props.members} />
            )}
          </div>
          <div
            className="column has-text-centered in-middle"
            id="parliament-pie-container"
          >
            {this.props.isFetching ? (
              <Spinner />
            ) : (
              <ParliamentPie
                party={this.state.party}
                members={this.props.members}
                onChange={this.partyChanged}
              />
            )}
          </div>
          <div className="column has-text-centered in-middle">
            {this.props.isFetching ? (
              <Spinner />
            ) : this.state.party ? (
              <AgeHistChart
                dimension={'age'}
                filter={this.state.party}
                size={[400, 240]}
                data={this.props.members}
              />
            ) : (
              <AgeBarChart members={this.props.members} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

_HomePage.propTypes = propTypes

const mapStateToProps = state => ({
  isFetching: state.member.isFetching,
  members: state.member.members
})

export const HomePage = connect(mapStateToProps)(_HomePage)
