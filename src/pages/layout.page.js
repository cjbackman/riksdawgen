import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Navbar } from '../components/navbar.view.js';
import { HomePage } from './home.page.js';
import { VotesPage } from './votes.page.js';

export const Layout = () => (
  <div style={styles.container}>
    <Navbar />
    <Switch>
      <Redirect from="/" exact to="/home" />
      <Route exact path='/home' component={HomePage} />
      <Route exact path='/votes' component={VotesPage} />
      <Route component={() => <div>ERR</div>} />
    </Switch>
  </div>
);

const styles = {
  container: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    backgroundColor: 'darkslategrey',
    color: 'black',
    margin: '0 auto',
    textAlign: 'center'
  }
};
