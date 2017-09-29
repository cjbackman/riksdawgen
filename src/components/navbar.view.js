import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      links: [
        { to: '/home', title: 'Hem' },
        { to: '/votes', title: 'Voteringar' }
      ]
    }
  }

  render() {
    return (
      <nav>
        <ul>
          {this.state.links.map(l =>
            <NavLink
              key={l.to}
              to={l.to}
              style={styles.link}
              activeStyle={styles.selected}>
              {l.title}
            </NavLink>)
          }
        </ul>
      </nav>
    );
  }
}

const styles = {
  link: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: 'black',
    margin: '0 50px',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 4
  },
  selected: {
    borderBottom: '3px solid black'
  }
};