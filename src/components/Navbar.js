import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { NavbarIcon } from './NavbarIcon';

export class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      links: [
        { to: '/home', title: 'Hem' },
        { to: '/votes', title: 'Voteringar' },
        { to: '/members', title: 'Ledamöter' }
      ]
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <nav style={styles.nav}>
          <NavbarIcon/>
          <ul style={styles.ul}>
            {this.state.links.map(l =>
              <NavLink key={l.to} to={l.to} style={styles.link} activeStyle={styles.selected}>{l.title}</NavLink>)
            }
          </ul>
        </nav>
      </div>
    );
  }
}

const styles = {
  ul: {
    margin:0,
    padding:0,
    marginLeft: '16.25rem'
  },
  container: {
    fontFamily: 'Exo',
    fontSize: '1rem',
    lineHeight: '1.25',
    position:'fixed',
    left: '0',
    right: '0',
  },
  nav: {
    boxShadow: '0 8px 20px 0 rgba(40,37,89,.6)',
    height: '3rem',
    padding: '1.25rem',
    background: '#3d3780',
    color: '#fff',
    margin: '0 auto',
    display: 'flex',
  },
  link: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: '#fff',
    margin: '0 20px',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    letterSpacing: 4
  },
  selected: {
    borderBottom: '3px solid #fff'
  }
};