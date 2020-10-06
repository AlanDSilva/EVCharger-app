import React, { useState } from "react";

import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

import classes from "./Layout.module.css";

const Layout = ({ children }) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const togglerClickedHandler = () => {
    setShowSideDrawer(true);
  };

  return (
    <>
      <Toolbar
        toggler={showSideDrawer}
        togglerClicked={togglerClickedHandler}
      />
      <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
      <main className={classes.content}>{children}</main>
    </>
  );
};

export default Layout;
