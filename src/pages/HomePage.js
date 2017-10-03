import React from 'react';

export const HomePage = () => (
  <div style={styles.container}>
    <div style={styles.half}>
      1
    </div>
    <div style={styles.half}>
      2
    </div>
    <div style={styles.half}>
      3
    </div>
    <div style={styles.half}>
      4
    </div>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'wrap'
  },
  half: {
    flex: '0 0 48%',
    textAlign: 'center',
    height: '20rem',
    background: '#3d3780',
    boxShadow: '0 8px 20px 0 rgba(40,37,89,.6)',
    borderRadius: '10px',
    marginLeft: '1%',
    marginRight: '1%',
    marginBottom: '1%'
  }
}