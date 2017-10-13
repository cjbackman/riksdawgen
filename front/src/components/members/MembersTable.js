import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../data/votes.json';

export class MembersTable extends Component {
  constructor() {
    super();
    this.state = {
      votes: []
    }
  }

  componentDidMount() {
    let votes = api.votering;
    this.setState({ votes });
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Namn</th>
            <th>Parti</th>
          </tr>
        </thead>
        <tbody>
          {this.state.votes.map(v =>
            <tr key={v.intressent_id}>
              <td>
                <Link to={`/members/${v.intressent_id}`}>
                {v.namn}
                </Link>
              </td>
              <td>
              {v.parti}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}