import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AdminProtectedRoute from "./components/Hooks/WithAdmin";
import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Auth.jsx";



function App(props) {
  const { isAuthenticated, role } = props;
  return (
    <Switch>
        <AdminProtectedRoute isAuthenticated={isAuthenticated} role={role} path="/admin" component={AdminLayout} />
        <AdminProtectedRoute isAuthenticated={isAuthenticated} role={role} path="/details" component={AdminLayout} />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Redirect from="/" to="/admin/index" />

    </Switch>
  );
}


function mapStateToProps(state) {
    return { isAuthenticated: state.auth.isAuthenticated , role:state.auth.user.role};
}

export default connect(mapStateToProps)(App);