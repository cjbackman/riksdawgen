import React from 'react'
import PropTypes from 'prop-types'

export class Dropdown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: {}
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    let selected = this.props.options[0]
    this.updateSelected(selected)
  }

  handleChange (event) {
    let selected = this.props.options
      .find(o => o[this.props.valProp] === event.target.value)
    this.updateSelected(selected)
  }

  updateSelected (selected) {
    this.setState({selected})
    this.props.handleChange(selected)
  }

  render () {
    if (this.props.options.length === 0) { return null }

    const dropDownOptions = this.props.options.map(option => (
      <option
        key={option[this.props.valProp]}
        value={option[this.props.valProp]}>
        {option[this.props.labelProp]}
      </option>
    ))

    const value = this.state.selected[this.props.valProp]

    return (
      <select
        value={value}
        onChange={this.handleChange}>
        {dropDownOptions}
      </select>
    )
  }
}

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  valProp: PropTypes.string.isRequired,
  labelProp: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}
