import React from "react";
import { Route } from "react-router-dom";
import NavItem from "../Navigation/NavItems/NavItem/NavItem";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import classes from "./Account.module.css";

const Account = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.tabs}>
        <NavItem link="/account/login">Login</NavItem>
        <NavItem link="/account/signup">Signup</NavItem>
      </div>

      <Route
        exact
        path="/account/login"
        render={(routeProps) => (
          <Login
            loginSuccess={props.loginSuccess}
            loginFail={props.loginFail}
            redirectPathOnSuccess="/charge"
            {...routeProps}
          />
        )}
      />

      <Route
        exact
        path="/account/signup"
        render={(routeProps) => (
          <Signup
            loginSuccess={props.loginSuccess}
            loginFail={props.loginFail}
            redirectPathOnSuccess="/charge"
            {...routeProps}
          />
        )}
      />
    </div>
  );
};

export default Account;
