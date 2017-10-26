import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '../_shared/Dropdown.js';
import { HistChart } from '../histchart/HistChart';
import { Spinner } from '../_shared/Spinner';

export class MembersBargraph extends Component {
  constructor() {
    super();
    this.state = {
      options: [
        { value: 'age', label: 'Ålder' },
        // { value: 'party', label: 'Parti'},
      ],
      selected: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selected) {
    this.setState({ selected });
  }

  render() {
    return (
      <div>
        <div className="field">
          <label className="label">Sortera efter</label>
          <div className="control">
            <div className="select">
              <Dropdown
                options={this.state.options}
                valProp='value'
                labelProp='label'
                handleChange={this.handleChange} />
            </div>
          </div>
        </div>
        <div className="has-text-centered">
          {!this.state.selected.value ? <Spinner /> :
            <HistChart
              dimension={this.state.selected.value}
              from={this.state.selected.from}
              to={this.state.selected.to}
              size={[300, 300]}
              data={this.props.members} />
          }
        </div>
      </div>
    );
  }
}

MembersBargraph.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  members: PropTypes.array.isRequired,
}