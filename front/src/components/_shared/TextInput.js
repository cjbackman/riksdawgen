import React from 'react'
import PropTypes from 'prop-types'

export class TextInput extends React.Component {
  state = { text: '' }

  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
  }

  handleChange = event => {
    this.setState({ text: event.target.value })
    this.props.handleChange(event.target.value)
  }

  render() {
    return (
      <div className="control">
        <input
          className="input is-small"
          type="text"
          placeholder={this.props.placeholder}
          value={this.state.text}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
