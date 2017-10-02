import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { HomePage } from '../pages/HomePage.js';
import { VotesPage } from '../pages/VotesPage.js';
import { MembersPage } from '../pages/MembersPage.js';
import { MemberPage } from '../pages/MemberPage.js';

export const Content = () => (
  <div style={styles.container}>
    <Switch>
      <Redirect from="/" exact to="/home" />
      <Route exact path='/home' component={HomePage} />
      <Route exact path='/votes' component={VotesPage} />
      <Route exact path='/members' component={MembersPage} />
      <Route path='/members/:id' component={MemberPage} />
      <Route component={() => <div>ERR</div>} />
    </Switch>
  </div>
);

const styles = {
  container: {
    flex: 5,
    marginTop: '5rem'
  }
}