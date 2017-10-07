import React from 'react';
import FaBank from 'react-icons/lib/fa/bank';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAlien from 'react-icons/lib/fa/reddit-alien';

export const Sidebar = () => (
  <ul style={styles.sidebarList}>
      <li style={styles.header}>
        INSTÄLLNINGAR
      </li>
      <li style={styles.item}>
        <FaBank />
        <span style={styles.itemLabel}>Parti</span>
        <FaAngleDown />
      </li>
      <li style={styles.item}>
        <FaAlien />
        <span style={styles.itemLabel}>Ledamot</span>
        <FaAngleDown />
      </li>
    </ul>
);

const styles = {
  item: {
    alignItems: 'center',
    display: 'flex',
    fontSize:'1rem',
    margin: '1rem',
    color: '#a1a1e5',
  },
  itemLabel: {
    flex: '1',
    marginLeft: '1rem'
  },
  header: {
    fontWeight: '500',
    fontSize: '.875rem',
    color: '#fff',
    padding: '1rem 1.25rem',
  },
  sidebarList: {
    paddingTop: '2rem'
  }
}
