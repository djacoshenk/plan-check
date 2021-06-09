import { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { HomePage } from 'pages/HomePage/HomePage';

export function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}
