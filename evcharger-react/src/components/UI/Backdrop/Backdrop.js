import React from "react";

import classes from "./Backdrop.module.css";

const Backdrop = (props) =>
  props.show ? (
    <div className={classes.background} onClick={props.clicked}></div>
  ) : null;

export default Backdrop;
