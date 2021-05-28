import { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { HomePage } from 'pages/HomePage/HomePage';
import { UserSignInPage } from 'pages/UserSignInPage/UserSignInPage';

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
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}
