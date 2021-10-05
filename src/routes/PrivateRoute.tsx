import { Redirect, Route } from "react-router-dom";

import { useAuth } from "hooks/useAuth";

type PrivateRouteType = {
  children: React.ReactNode;
  path: string;
};

export const PrivateRoute = ({ children, path }: PrivateRouteType) => {
  const auth = useAuth();

  return <Route path={path} render={() => (auth.currentUser ? children : <Redirect to="/signin" />)} />;
};
