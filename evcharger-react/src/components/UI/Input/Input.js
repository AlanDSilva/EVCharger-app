import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  let message = null;
  const inputClasses = [classes.inputElement];

  if (props.invalid && props.touched) {
    inputClasses.push(classes.invalid);
    message = props.message;
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          disabled={props.isActive}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.input}>
      <label className={classes.label}>{props.label}</label>
      {inputElement}
      <p className={classes.message}>{message}</p>
    </div>
  );
};

export default Input;
