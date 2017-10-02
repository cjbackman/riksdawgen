import React, { Component } from 'react';
import api from '../data/votes.json';
import { Link } from 'react-router-dom';

export class VotesPage extends Component {
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
      <table style={styles.table}>
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
                <Link to={`/members/${v.intressent_id}`} >
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


const styles = {
  table: {
    margin: '10rem auto',
    width: '20%',
    textAlign: 'left'
  }
}