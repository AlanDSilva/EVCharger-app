import React from "react";

const Layout = ({ children }) => (
  <>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>{children}</main>
  </>
);

export default Layout;
