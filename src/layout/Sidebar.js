import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FaBank from 'react-icons/lib/fa/bank';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAlien from 'react-icons/lib/fa/reddit-alien';

export const _Sidebar = ({showSidebar}) => (
  <div style={showSidebar ? styles.sidebarContainer : Object.assign({}, styles.sidebarContainer, styles.hidden)}>
    <ul style={styles.sidebarList}>
      <li style={styles.header}>
        INSTÄLLNINGAR
      </li>
      <li style={styles.item}>
        <FaBank style={styles.img}/>
        <span style={styles.itemLabel}>Parti</span>
        <FaAngleDown style={styles.img} />
      </li>
      <li style={styles.item}>
        <FaAlien style={styles.img}/>
        <span style={styles.itemLabel}>Ledamot</span>
        <FaAngleDown style={styles.img} />
      </li>
    </ul>
  </div>
);

_Sidebar.propTypes = {
  showSidebar: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  showSidebar: state.menu.showSidebar
})

export const Sidebar = connect(mapStateToProps)(_Sidebar)

const styles = {
  img: {
    marginTop: '-0.1rem',
  },
  item: {
    alignItems: 'center',
    display: 'flex',
    fontSize:'1.5rem',
    margin: '2rem .5rem 0 0',
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
  },
  sidebarContainer: {
    flex: 1,
    height: '100vh',
    background: '#3d3780',
    boxShadow: '0 8px 20px 0 rgba(40,37,89,.6)',
    borderRadius: '10px'
  },
  hidden: {
    transition: 'opacity .25s ease-in-out',
    opacity: 0
  }
}
