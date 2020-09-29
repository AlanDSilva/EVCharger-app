import React from "react";

const Layout = ({ children }) => (
  <>
    <div>Toolbar, SideDrawe, Backdrop</div>
    <main>{children}</main>
  </>
);

export default Layout;
