import React from "react";

import NavItem from "./NavItem/NavItem";

import classes from "./NavItems.module.css";

const NavItems = () => (
  <ul className={classes.navItems}>
    <NavItem link="/" active>
      Station Locator
    </NavItem>
    <NavItem link="/">About</NavItem>
  </ul>
);

export default NavItems;
