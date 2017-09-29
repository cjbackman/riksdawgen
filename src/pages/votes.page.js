import React, { Component } from 'react';
import api from '../data/votes.json';

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
      <div style={styles.container}>
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
                  {v.namn}
                </td>
                <td>
                  {v.parti}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const styles = {
  container: {
    marginTop: '10%',
    width: '100%'
  },
  table: {
    margin: '0 auto',
    width: '20%',
    textAlign: 'left'
  }
}