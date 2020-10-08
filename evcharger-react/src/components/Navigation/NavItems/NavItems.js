import React from "react";

import NavItem from "./NavItem/NavItem";

import classes from "./NavItems.module.css";

const NavItems = () => (
  <ul className={classes.navItems}>
    <NavItem link="/">Station Locator</NavItem>
    <NavItem link="/charge">Charge</NavItem>
  </ul>
);

export default NavItems;
