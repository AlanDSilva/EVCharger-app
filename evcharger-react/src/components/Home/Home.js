import React from "react";
import Button from "../UI/Button/Button";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <div className={classes.container}>
      <div>
        <h2 className={classes.message}>This is the home page</h2>
      </div>
    </div>
  );
};

export default Home;
