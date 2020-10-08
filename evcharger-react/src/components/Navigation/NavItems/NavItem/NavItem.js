import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavItem.module.css";

const NavItem = (props) => (
  <li className={classes.navItem}>
    <NavLink exact activeClassName={classes.active} to={props.link}>
      {props.children}
    </NavLink>
  </li>
);

export default NavItem;
