import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../data/votes.json';

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
      <table style={styles.table}>
        <thead style={styles.head}>
          <tr>
            <th>Namn</th>
            <th>Parti</th>
          </tr>
        </thead>
        <tbody>
          {this.state.votes.map(v =>
            <tr key={v.intressent_id}>
              <td>
                <Link to={`/members/${v.intressent_id}`} style={styles.link} >
                  <span style={styles.text}>{v.namn}</span>
                </Link>
              </td>
              <td>
                <span style={styles.text}>{v.parti}</span>
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
    marginTop: '3rem',
    width: '80%',
  },
  head: {
    color:'#fff'
  },
  link: {
    textDecoration: 'none'
  },
  text: {
    color:'lightgray'
  }
}