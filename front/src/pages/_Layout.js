import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MembersPage } from './MembersPage.js';
import { MemberPage } from './MemberPage.js';
import { PartyPage } from './PartyPage.js';
import { ErrorPage } from './ErrorPage.js';

export const Layout = () => {
  return (
    <section className="section">
      <div className="container">
        <Switch>
          <Route exact path='/' component={MembersPage} />
          <Route path='/members/:id' component={MemberPage} />
          <Route path='/party/:id' component={PartyPage} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </section>
  )
};
