import React from "react";

import NavItem from "./NavItem/NavItem";

import classes from "./NavItems.module.css";

const NavItems = (props) => (
  <ul className={classes.navItems}>
    <NavItem link="/">Station Locator</NavItem>
    <NavItem link="/charge">Charge</NavItem>
    <NavItem link="/login">
      {props.isAuthenticated ? `Logged in as ` : "Login"}
    </NavItem>
  </ul>
);

export default NavItems;
