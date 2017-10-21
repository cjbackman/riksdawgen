import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MembersPage } from './MembersPage.js';
import { MemberPage } from './MemberPage.js';
import { ErrorPage } from './ErrorPage.js';

export const Layout = () => {
  return (
    <div className="page-wrapper">
       <Switch>
        <Route exact path='/' component={MembersPage} />
        <Route path='/members/:id' component={MemberPage} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  )
};
