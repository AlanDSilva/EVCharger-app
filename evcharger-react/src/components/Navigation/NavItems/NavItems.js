import React from "react";

import NavItem from "./NavItem/NavItem";

import classes from "./NavItems.module.css";

const NavItems = (props) => (
  <ul className={classes.navItems}>
    <NavItem link="/locator">Station Locator</NavItem>
    <NavItem link="/charge">Charge</NavItem>
    <NavItem link="/account">
      {props.isAuthenticated
        ? props.userInfo
          ? `Logged in as ${props.userInfo.auth[0].username}`
          : "Account"
        : "Account"}
    </NavItem>
  </ul>
);

export default NavItems;
