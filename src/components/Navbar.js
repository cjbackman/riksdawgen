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
      <nav style={styles.nav}>
        <div tyle={{ flex: 1 }}>
          <NavbarIcon />
        </div>
        <div tyle={{ flex: 4 }}>
          <NavbarMenu links={this.state.links} />
        </div>
        <div style={{ flex: 1 }}>
          <NavbarLogo />
        </div>
      </nav>
    );
  }
}

const styles = {
  nav: {
    height: '3rem',
    padding: '1.25rem',
    color: '#fff',
    margin: '0 auto',
    display: 'flex',
  }
};