import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export const NavbarMenu = ({links}) => (
  <ul>
      { links.map(l =>
        <NavLink key={l.to} to={l.to} className="navbar-link" activeClassName="active">
          {l.title}
        </NavLink>)
      }
  </ul>
);

NavbarMenu.propTypes = {
  links: PropTypes.array.isRequired
}
