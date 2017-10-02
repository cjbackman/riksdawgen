import React from 'react';

export const LayoutFooter = () => (
  <div style={styles.container}>
    <nav style={styles.nav}>
      FOOTER
    </nav>
  </div>
);

const styles = {
  container: {
    flex: '0 0 auto',
    fontFamily: 'Exo',
    fontSize: '1rem',
    lineHeight: '1.25'
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
}
