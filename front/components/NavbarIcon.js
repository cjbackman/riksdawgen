import React, { Component } from 'react';
import Hamburger from 'react-icons/lib/fa/align-justify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { toggleSidebar } from '../actions/menuActions.js';

export class _NavbarIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={this.props.actions.toggleSidebar}>
        <Hamburger style={styles.icon} />
      </div>
    );
  }
}

const styles = {
  icon: {
    height: '2rem',
    width: '2rem',
    cursor: 'pointer'
  }
};

_NavbarIcon.propTypes = {
  actions: PropTypes.any.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({toggleSidebar}, dispatch)
})

export const NavbarIcon = connect(false, mapDispatchToProps)(_NavbarIcon)