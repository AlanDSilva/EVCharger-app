import React, { useState } from "react";

import Modal from "../UI/Modal/Modal";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import classes from "./Charge.module.css";

const Charge = (props) => {
  const { isActive, seconds, toggle } = props;

  const [viewModal, setViewModal] = useState(false);
  const cancelModalHandler = () => {
    setViewModal(false);
  };
  const continueModalHandler = () => {
    alert("You Continue!");
  };

  const submitCode = (event) => {
    event.preventDefault();
    if (!isActive) {
      setViewModal(true);
    }
  };

  let mins = Math.floor(seconds / 60);

  return (
    <div className={classes.container}>
      <Modal show={viewModal} modalClosed={cancelModalHandler}>
        <h2>Confirm Order</h2>
        <h3>Total: {(mins + 1) * 0.2}€</h3>
        <Button btnType="danger" clicked={cancelModalHandler}>
          Continue charging
        </Button>
        <Button btnType="success" clicked={continueModalHandler}>
          Confirm
        </Button>
      </Modal>
      <form onSubmit={submitCode}>
        <Input
          label="Charger Code"
          inputtype="input"
          placeholder="Enter code"
        />
        <Button
          disabled={!props.isAuthenticated}
          clicked={toggle}
          btnType={isActive ? "danger" : "success"}
        >
          {isActive ? "Stop Charging" : "Start Charging"}
        </Button>
        <p className={classes.error}>
          {!props.isAuthenticated
            ? "*You need to be logged in to start charging"
            : ""}
        </p>
      </form>

      <p>
        Timer {mins}:{seconds}
      </p>
      <p>Total: {(mins + 1) * 0.2}e</p>
    </div>
  );
};

export default Charge;
