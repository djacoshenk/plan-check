import { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { HomePage } from 'pages/HomePage/HomePage';
import { UserDashboardPage } from 'pages/UserDashboardPage/UserDashboardPage';
import { UserSignInPage } from 'pages/UserSignInPage/UserSignInPage';
import { UserSignUpPage } from 'pages/UserSignUpPage/UserSignUpPage';

export function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/signin'>
            <UserSignInPage />
          </Route>
          <Route path='/signup'>
            <UserSignUpPage />
          </Route>
          <Route path='/user/:id'>
            <UserDashboardPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}
