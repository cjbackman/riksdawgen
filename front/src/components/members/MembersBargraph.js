import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from '../_shared/Dropdown.js'
import { MembersHistChart } from './MembersHistChart'
import { Spinner } from '../_shared/Spinner'
import { parties } from '../../utils'

const filters = [...parties]
const dimensions = [
  { value: 'age', label: 'åldersfördelningen' },
  { value: 'assignment_count', label: 'uppdragsfördelningen' }
]

export class MembersBargraph extends Component {
  static propTypes = {
    members: PropTypes.array.isRequired
  }

  state = {
    selectedDimension: {},
    selectedFilter: {}
  }

  handleDimChange = selectedDimension => {
    this.setState({ selectedDimension })
  }

  handleFilterChange = selectedFilter => {
    this.setState({ selectedFilter })
  }

  render() {
    return (
      <div>
        <div className="label has-text-centered is-size-7">Frågeställning</div>
        <div className="level">
          <div className="level-item">
            <span style={{ marginRight: '1rem' }}>Hur ser</span>
            <Dropdown
              options={dimensions}
              valProp="value"
              labelProp="label"
              handleChange={this.handleDimChange}
            />
            <span style={{ marginLeft: '1rem', marginRight: '1rem' }}>
              ut, bland
            </span>
            <Dropdown
              options={filters}
              valProp="value"
              labelProp="label"
              handleChange={this.handleFilterChange}
            />
          </div>
        </div>
        <div className="has-text-centered">
          {!this.state.selectedDimension.value || !this.state.selectedFilter ? (
            <Spinner />
          ) : (
            <MembersHistChart
              dimension={this.state.selectedDimension.value}
              filter={this.state.selectedFilter.value}
              from={this.state.selectedDimension.from}
              to={this.state.selectedDimension.to}
              size={[600, 450]}
              data={this.props.members}
            />
          )}
        </div>
      </div>
    )
  }
}
