import React, { Component } from 'react';
import api from '../data/votes.json';
import { Link } from 'react-router-dom';

export class MembersPage extends Component {
  constructor() {
    super();
    this.state = {
      members: []
    }
  }

  componentDidMount() {
    let members = api.votering;
    this.setState({ members });
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
            {this.state.members.map(m =>
              <tr key={m.intressent_id}>
                <td>
                  <Link to={`/members/${m.intressent_id}`} >
                    { m.namn }
                  </Link>
                </td>
                <td>
                  {m.parti}
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