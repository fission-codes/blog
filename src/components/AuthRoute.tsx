import React from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { useWebnative } from "../context/webnative";

interface Props {
  component: React.FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
}

const AuthRoute = ({ component: Component, ...rest }: Props) => {
  const { state } = useWebnative();
  return (
    <Route
      {...rest}
      render={(props) => {
        return state?.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        );
      }}
    />
  );
};

export default AuthRoute;
