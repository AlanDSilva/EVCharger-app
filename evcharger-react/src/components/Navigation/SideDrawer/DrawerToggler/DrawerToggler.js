import React from "react";

import classes from "./DrawerToggler.module.css";

const DrawerToggler = (props) => {
  let status = classes.close;
  if (props.change) {
    status = classes.open;
  }
  return (
    <div onClick={props.clicked}>
      <div className={[classes.bar1, status].join(" ")}></div>
      <div className={[classes.bar2, status].join(" ")}></div>
      <div className={[classes.bar3, status].join(" ")}></div>
    </div>
  );
};

export default DrawerToggler;
