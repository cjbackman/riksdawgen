import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Header } from './Header.js';
import { Sidebar } from './Sidebar.js';
import { Content } from './Content.js';
import { Footer } from './Footer.js';

export const _Layout = ({showSidebar}) => {
  const sidebar = classNames('sidebar', { 'hide': !showSidebar });
  const innerSidebar = classNames('box', { 'hide': !showSidebar });

  return (
    <div className="page-wrapper">
      <div className="header">
        <Header />
      </div>
      <div className="main">
        <div className={sidebar}>
          <div className={innerSidebar}>
            <Sidebar />
          </div>
        </div>
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
  showSidebar: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  showSidebar: state.menu.showSidebar
})

export const Layout = withRouter(connect(mapStateToProps)(_Layout));
