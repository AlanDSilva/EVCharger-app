import React, { useState } from "react";

import Modal from "../UI/Modal/Modal";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Auth from "../ProtectedRoute/Auth";
import classes from "./Charge.module.css";
import axios from "axios";

const Charge = (props) => {
  const { isActive, seconds, minutes, toggle, chargers } = props;

  const [chargeInput, setChargeInput] = useState({
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Enter charger's code...",
    },
    value: "",
    validation: {
      required: true,
    },
    message: "*Must match an available charger",
    valid: false,
    touched: false,
  });
  const [viewModal, setViewModal] = useState(false);
  const cancelModalHandler = () => {
    setViewModal(false);
  };
  const continueModalHandler = () => {
    console.log(Auth.getAxiosAuth().auth.id);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!isActive) {
      setViewModal(true);
    }
    axios
      .post(`http://localhost:3001/chargers/${chargeInput.value}`)
      .then((response) => {
        console.log(response.data);
      });
  };

  const inputChangedHandler = (event) => {
    const updatedElement = { ...chargeInput };
    updatedElement.value = event.target.value;
    updatedElement.touched = true;
    updatedElement.valid = checkValidity(
      updatedElement.value,
      updatedElement.validation
    );
    setChargeInput(updatedElement);
  };

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    isValid =
      chargers.find(
        (charger) => charger.id === value && charger.busy === false
      ) && isValid;

    return isValid;
  };

  let mins = Math.floor(seconds / 60);

  const form = (
    <form onSubmit={submitHandler}>
      <Input
        elementType={chargeInput.elementType}
        elementConfig={chargeInput.elementConfig}
        value={chargeInput.value}
        touched={chargeInput.touched}
        invalid={!chargeInput.valid}
        message={chargeInput.message}
        changed={inputChangedHandler}
      />
      <Button
        disabled={!props.isAuthenticated || !chargeInput.valid}
        clicked={() => toggle(0.5)}
        btnType={isActive ? "danger" : "success"}
      >
        {isActive ? "Stop Charging" : "Start Charging"}
      </Button>
      <p className={classes.error}>
        {!props.isAuthenticated
          ? "*You need to be logged in to start charging"
          : ""}
      </p>
      <p className={classes.error}>
        {!chargeInput.valid
          ? "*You need to provide an available charger code"
          : ""}
      </p>
    </form>
  );

  return (
    <div className={classes.container}>
      <Modal show={viewModal} modalClosed={cancelModalHandler}>
        <h2>Confirm Order</h2>
        <h3>Total: {(mins + 1) * props.total}€</h3>
        <Button btnType="danger" clicked={cancelModalHandler}>
          Continue charging
        </Button>
        <Button btnType="success" clicked={continueModalHandler}>
          Confirm
        </Button>
      </Modal>
      {form}

      <p>
        Timer {minutes}:{seconds}
      </p>
      <p>Total: {props.total}€</p>
    </div>
  );
};

export default Charge;
