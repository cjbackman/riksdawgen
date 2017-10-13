import React, { Component } from 'react';
import api from '../../data/votes.json';
import { Dropdown } from '../_shared/Dropdown.js';

export class MembersBargraph extends Component {
  constructor() {
    super();
    this.state = {
      votes: [],
      options: [
        {value: 'AGE', label:'Ålder'},
        { value: 'VOTES', label: 'Antal röster'}],
      selected: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let votes = api.votering;
    this.setState({ votes });
  }

  handleChange(selected) {
    this.setState({selected});
  }

  render() {
    return (
      <div>
        <div>
          <label className="label">Sveriges riksdag efter: </label>
          <Dropdown
            options={this.state.options}
            valProp='value'
            labelProp='label'
            handleChange={this.handleChange}/>
        </div>
        <div>
          { this.state.selected.label }
        </div>
      </div>
    );
  }
}