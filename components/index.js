import React from "react";
import { Route, HashRouter, Link, Redirect, Switch } from "react-router-dom";

import { useFirebaseAuth } from "@use-firebase/auth";

import Login from "./Login";
import Home from "./Home";
import Dashboard from "./protected/Dashboard";

import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );
}

export default () => {
  const { loading, isSignedIn, signOut } = useFirebaseAuth();

  const authButtons = isSignedIn ? (
    <FlatButton
      label="Logout"
      onClick={() => {
        signOut();
      }}
    />
  ) : (
    <span>
      <Link to="/login">
        <FlatButton label="Login" />
      </Link>
      <Link to="/register">
        <FlatButton label="Register" />
      </Link>
    </span>
  );

  const topbarButtons = (
    <div>
      <Link to="/">
        <FlatButton label="Home" />
      </Link>
      <Link to="/dashboard">
        <FlatButton label="dashboard" />
      </Link>
      {authButtons}
    </div>
  );
  
  return loading === true ? (
    <h1>Loading</h1>
  ) : (
    <HashRouter>
      <div>
        <AppBar
          title="My App"
          iconElementRight={topbarButtons}
          iconStyleRight={{
            display: "flex",
            alignItems: "center",
            marginTop: "0"
          }}
        />
        <div className="container d-flex justify-content-center mt-3">
          <div className="row">
            <Switch>
              <Route path="/" exact component={Home} />
              <PublicRoute
                authed={isSignedIn}
                path="/login"
                component={Login}
              />
              <PrivateRoute
                authed={isSignedIn}
                path="/dashboard"
                component={Dashboard}
              />
              <Route render={() => <h3>No Match</h3>} />
            </Switch>
          </div>
        </div>
      </div>
    </HashRouter>
  );
};
