import React from 'react';
import FaCog from 'react-icons/lib/fa/cog';
import PropTypes from 'prop-types';

export const NavbarIcon = ({toggle, show}) => ( show ?
  <FaCog className="icon pointer" onClick={toggle} /> : null
);

NavbarIcon.propTypes = {
  toggle: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
}