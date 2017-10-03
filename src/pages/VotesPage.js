import React from 'react';
import { VotesTable } from '../components/VotesTable';

export const VotesPage = () => (
  <div style={styles.container}>
    <div style={styles.third}>
      <VotesTable />
    </div>
    <div style={styles.twoThirds}>
      2
    </div>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'wrap'
  },
  third: {
    flex: '0 0 30%',
    textAlign: 'center',
    background: '#3d3780',
    boxShadow: '0 8px 20px 0 rgba(40,37,89,.6)',
    borderRadius: '10px',
    marginLeft: '1%',
    minHeight: '40rem'
  },
  twoThirds: {
    flex: '0 0 67%',
    background: '#3d3780',
    boxShadow: '0 8px 20px 0 rgba(40,37,89,.6)',
    borderRadius: '10px',
    marginLeft: '1%',
  }
}