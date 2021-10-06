import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home } from "pages/Home/Home";
import { NoMatch404 } from "pages/NoMatch404/NoMatch404";
import { UserDashboard } from "pages/UserDashboard/UserDashboard";
import { UserSignIn } from "pages/UserSignIn/UserSignIn";
import { UserSignUp } from "pages/UserSignUp/UserSignUp";
import { PrivateRoute } from "routes/PrivateRoute";

export const Routes = () => {
  return (
    <>
      <Router>
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
          <PrivateRoute path="/user/:id">
            <UserDashboard />
          </PrivateRoute>
          <Route path="*">
            <NoMatch404 />
          </Route>
        </Switch>
      </Router>
    </>
  );
};
