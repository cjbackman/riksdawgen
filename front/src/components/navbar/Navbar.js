import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleSidebar } from '../../actions/menuActions.js';
import { NavbarIcon } from './NavbarIcon';
import { NavbarLogo } from './NavbarLogo';
import { NavbarMenu } from './NavbarMenu';

class _Navbar extends Component {
  constructor() {
    super();
    this.state = {
      links: [
        { to: '/home', title: 'Hem' },
        { to: '/members', title: 'Ledamöter' },
        { to: '/votes', title: 'Voteringar' },
      ],
      showNavbarIcon: false
    }
  }

  componentDidMount () {
    const showNavbarIcon = this.props.location.pathname !== '/home';
    this.setState({showNavbarIcon});
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      const showNavbarIcon = this.props.location.pathname !== '/home';
      this.setState({showNavbarIcon});
    }
  }

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-icon">
          <NavbarIcon show={this.state.showNavbarIcon} toggle={this.props.actions.toggleSidebar} />
        </div>
        <div className="navbar-menu">
          <NavbarMenu links={this.state.links} />
        </div>
        <div className="navbar-logo">
          <NavbarLogo />
        </div>
      </nav>
    );
  }
}

_Navbar.propTypes = {
  actions: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({toggleSidebar}, dispatch)
})

export const Navbar = withRouter(connect(false, mapDispatchToProps)(_Navbar));
