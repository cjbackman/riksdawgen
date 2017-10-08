import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { HomePage } from '../pages/HomePage.js';
import { VotesPage } from '../pages/VotesPage.js';
import { MembersPage } from '../pages/MembersPage.js';
import { MemberPage } from '../pages/MemberPage.js';
import { ErrorPage } from '../pages/ErrorPage.js';

export const Content = () => (
  <Switch>
    <Redirect from="/" exact to="/home" />
    <Route exact path='/home' component={HomePage} />
    <Route exact path='/votes' component={VotesPage} />
    <Route exact path='/members' component={MembersPage} />
    <Route path='/members/:id' component={MemberPage} />
    <Route component={ErrorPage} />
  </Switch>
);