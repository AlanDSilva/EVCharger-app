import React from "react";

import NavItems from "../NavItems/NavItems";
import DrawerToggler from "../SideDrawer/DrawerToggler/DrawerToggler";

import classes from "./Toolbar.module.css";

const Toolbar = (props) => (
  <header className={classes.toolbar}>
    <DrawerToggler change={props.toggler} clicked={props.togglerClicked} />

    <div>Logo</div>
    <nav className={classes.desktopOnly}>
      <NavItems
        isAuthenticated={props.isAuthenticated}
        userInfo={props.userInfo}
      />
    </nav>
  </header>
);

export default Toolbar;
