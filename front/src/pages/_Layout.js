import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { HomePage } from './HomePage'
import { MembersPage } from './MembersPage'
import { BudgetPage } from './BudgetPage'
import { MemberPage } from './MemberPage'
import { PartyPage } from './PartyPage'
import { ErrorPage } from './ErrorPage'

export const Layout = () => {
  return (
    <section className='section'>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/members' component={MembersPage} />
        <Route path='/member/:id' component={MemberPage} />
        <Route path='/party/:id' component={PartyPage} />
        <Route path='/budget' component={BudgetPage} />
        <Route component={ErrorPage} />
      </Switch>
    </section>
  )
}
