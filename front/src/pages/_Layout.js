import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { HomePage } from './HomePage'
import { MembersPage } from './MembersPage'
import { VotesPage } from './VotesPage'
import { MemberPage } from './MemberPage'
import { PartyPage } from './PartyPage'
import { ErrorPage } from './ErrorPage'

export const Layout = () => {
  return (
    <section className="section">
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/members" component={MembersPage} />
          <Route path="/member/:id" component={MemberPage} />
          <Route path="/party/:id" component={PartyPage} />
          <Route path="/votes" component={VotesPage} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </section>
  )
}
