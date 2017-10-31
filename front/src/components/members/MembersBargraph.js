import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from '../_shared/Dropdown.js'
import { HistChart } from '../histchart/HistChart'
import { Spinner } from '../_shared/Spinner'

export class MembersBargraph extends Component {
  constructor () {
    super()
    this.state = {
      dimensions: [
        { value: 'age', label: 'åldersfördelningen' },
        { value: 'assignment_count', label: 'uppdragsfördelningen' }
      ],
      filters: [
        { value: 'all', label: 'alla' },
        { value: 'S', label: 'Socialdemokraternas' },
        { value: 'M', label: 'Moderaternas' },
        { value: 'SD', label: 'Sverigedemokraternas' },
        { value: 'MP', label: 'Miljöpartiets' },
        { value: 'C', label: 'Centerpartiets' },
        { value: 'V', label: 'Vänsterpartiets' },
        { value: 'L', label: 'Liberalernas' },
        { value: 'KD', label: 'Kristdemokraternas' }
      ],
      selectedDimension: {},
      selectedFilter: {}
    }
    this.handleDimChange = this.handleDimChange.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  handleDimChange (selectedDimension) {
    this.setState({ selectedDimension })
  }

  handleFilterChange (selectedFilter) {
    this.setState({ selectedFilter })
  }

  render () {
    return (
      <div>
        <div className='field'>
          Hur ser
          <span className='control'>
            <span className='select'>
              <Dropdown
                options={this.state.dimensions}
                valProp='value'
                labelProp='label'
                handleChange={this.handleDimChange} />
            </span>
          </span> ut, bland <span className='control'>
            <span className='select'>
              <Dropdown
                options={this.state.filters}
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
            size={[500, 500]}
            data={this.props.members} />
          }
        </div>
      </div>
    )
  }
}

MembersBargraph.propTypes = {
  members: PropTypes.array.isRequired
}
