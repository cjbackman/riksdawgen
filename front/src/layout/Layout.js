import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Header } from './Header.js';
import { Sidebar } from './Sidebar.js';
import { Content } from './Content.js';
import { Footer } from './Footer.js';
import { Config } from '../config';

export const _Layout = ({showSidebar, location}) => {
  console.log(Config.API_URL);
  return (
    <div className="page-wrapper">
      <div className="header">
        <Header />
      </div>
      <div className="main">
        <Sidebar path={location.pathname} show={showSidebar} />
        <div className="content">
          <div>
            <Content />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
};

_Layout.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  showSidebar: state.menu.showSidebar
})

export const Layout = withRouter(connect(mapStateToProps)(_Layout));
