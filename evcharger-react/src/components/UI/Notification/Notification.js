import classes from "./Notification.module.css";
import React from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className={classes.error}>{message}</div>;
};

export default Notification;
