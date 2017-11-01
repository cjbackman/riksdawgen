import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from '../_shared/Dropdown.js'
import { HistChart } from '../histchart/HistChart'
import { Spinner } from '../_shared/Spinner'
import { parties } from '../../utils'

const filters = [{ value: 'all', label: 'Alla' }, ...parties]
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

  handleDimChange = (selectedDimension) => {
    this.setState({ selectedDimension })
  }

  handleFilterChange = (selectedFilter) => {
    this.setState({ selectedFilter })
  }

  render () {
    return (
      <div>
        <div className='field'>
          <span className='has-text-left'>Hur ser</span>
          <span className='control'>
            <span className='select'>
              <Dropdown
                options={dimensions}
                valProp='value'
                labelProp='label'
                handleChange={this.handleDimChange} />
            </span>
          </span> ut, bland <span className='control'>
            <span className='select'>
              <Dropdown
                options={filters}
                valProp='value'
                labelProp='label'
                handleChange={this.handleFilterChange} />
            </span>
          </span> ledamöter i Riksdagen?
        </div>
        <div className='has-text-centered'>
          {(!this.state.selectedDimension.value || !this.state.selectedFilter) ? <Spinner /> : <HistChart
            dimension={this.state.selectedDimension.value}
            filter={this.state.selectedFilter.value}
            from={this.state.selectedDimension.from}
            to={this.state.selectedDimension.to}
            size={[500, 600]}
            data={this.props.members} />
          }
        </div>
      </div>
    )
  }
}
