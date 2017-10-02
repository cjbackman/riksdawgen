import React from 'react';
import { LayoutHeader } from './LayoutHeader.js';
import { LayoutContent } from './LayoutContent.js';
import { LayoutFooter } from './LayoutFooter.js';

export const Layout = () => (
  <div style={styles.pageContainer}>
    <LayoutHeader style={{flex: '0 0 auto'}} />
    <LayoutContent style={{flex: '1 1 auto'}} />
    <LayoutFooter style={{flex: '0 0 auto'}} />
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