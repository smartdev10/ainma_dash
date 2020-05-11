import React from "react";
import { Route, Redirect } from "react-router-dom";

export const AdminProtectedRoute = ({ component: Component,isAuthenticated,role, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => {
        
        if (isAuthenticated) {
          return(
            <Component {...props } />
          )
        } else {
          return (
            <Redirect
              to={{
                pathname: "/auth/login",
                state: { from: props.location }
              }}
            />
          );
        }
      }}
    />
  );
};

export default AdminProtectedRoute