import React from 'react'
import PropTypes from 'prop-types'

export class TextInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({text: event.target.value})
    this.props.handleChange(event.target.value)
  }

  render () {
    return (
      <input
        className='input'
        type='text'
        placeholder={this.props.placeholder}
        value={this.state.text}
        onChange={this.handleChange} />
    )
  }
}

TextInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}
