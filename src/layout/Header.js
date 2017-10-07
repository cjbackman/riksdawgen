import React from 'react';
import { Navbar } from '../components/Navbar.js';

export const Header = () => (
  <div style={styles.container}>
    <Navbar />
  </div>
);

const styles = {
  container: {
    zIndex:10,
    position: 'fixed',
    width: '100%'
  }
}