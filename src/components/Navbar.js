import React, { Component } from 'react';
import { NavbarIcon } from './NavbarIcon';
import { NavbarLogo } from './NavbarLogo';
import { NavbarMenu } from './NavbarMenu';


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
          <div tyle={{flex:1}}>
            <NavbarIcon />
          </div>
          <div tyle={{flex:4}}>
            <NavbarMenu links={this.state.links}/>
          </div>
          <div style={{flex:1}}>
            <NavbarLogo />
          </div>
        </nav>
      </div>
    );
  }
}

const styles = {
  container: {
    fontFamily: 'Exo',
    fontSize: '1rem',
    lineHeight: '1.25',
    width: '100%'
  },
  nav: {
    boxShadow: '0 8px 20px 0 rgba(40,37,89,.6)',
    height: '3rem',
    padding: '1.25rem',
    background: '#3d3780',
    color: '#fff',
    margin: '0 auto',
    display: 'flex',
  }
};