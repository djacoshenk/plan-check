import { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { HomePage } from 'pages/HomePage/HomePage';
import { UserLoginPage } from 'pages/UserLoginPage/UserLoginPage';
import { UserSignUpPage } from 'pages/UserSignUpPage/UserSignUpPage';

import './App.css';

export function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/login'>
            <UserLoginPage />
          </Route>
          <Route exact path='/signup'>
            <UserSignUpPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}
