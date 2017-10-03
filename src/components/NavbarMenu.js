import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export const NavbarMenu = ({links}) => (
  <div>
    <ul style={styles.ul}>
      { links.map(l =>
        <NavLink key={l.to} to={l.to} style={styles.link} activeStyle={styles.selected}>
          {l.title}
        </NavLink>)
      }
    </ul>
  </div>
);

NavbarMenu.propTypes = {
  links: PropTypes.array.isRequired
}

const styles = {
  ul: {
    margin:0,
    padding:0,
    marginLeft: '16.25rem'
  },
  link: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: '#fff',
    margin: '0 20px',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    letterSpacing: 4
  },
  selected: {
    borderBottom: '3px solid #fff'
  }
};
