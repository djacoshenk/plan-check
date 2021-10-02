import { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "pages/Home/Home";
import { UserDashboard } from "pages/UserDashboard/UserDashboard";
import { UserSignIn } from "pages/UserSignIn/UserSignIn";
import { UserSignUp } from "pages/UserSignUp/UserSignUp";

export function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signin">
            <UserSignIn />
          </Route>
          <Route path="/signup">
            <UserSignUp />
          </Route>
          <Route path="/user/:id">
            <UserDashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}
