import React from 'react';
import { Navbar } from '../components/Navbar.js';

export const LayoutHeader = () => (
  <div style={styles.container}>
    <Navbar />
  </div>
);

const styles = {
  container: {
    zIndex:10
  }
}