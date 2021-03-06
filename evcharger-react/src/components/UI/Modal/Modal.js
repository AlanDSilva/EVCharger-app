import React from "react";

import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => (
  <>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className={classes.modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-200%)",
        opacity: props.show ? "1" : "0",
      }}
    >
      {props.children}
    </div>
  </>
);

export default modal;
