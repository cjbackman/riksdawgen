import React from 'react';
import { LayoutHeader } from './LayoutHeader.js';
import { LayoutContent } from './LayoutContent.js';
import { LayoutFooter } from './LayoutFooter.js';

export const Layout = () => (
  <div style={styles.pageContainer}>
    <div style={{ flex: '1 100%', marginBottom: '2rem' }}>
      <LayoutHeader/>
    </div>
    <div style={{ flex: '4', margin: '0 1rem', marginBottom: '2rem' }}>
      <LayoutContent/>
    </div>
    <div style={{ flex: '1 100%' }}>
      <LayoutFooter/>
    </div>
  </div>
);

const styles = {
  pageContainer: {
    fontFamily: 'Exo',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    background: '#2f296b'
  }
}