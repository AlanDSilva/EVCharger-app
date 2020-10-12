import React, { useState } from "react";
import Input from "../../UI/Input/Input";

import classes from "./Search.module.css";

const Search = (props) => {
  const [filterForm, setFilterForm] = useState({
    type: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "", displayValue: "Type..." },
          { value: "slow", displayValue: "Type 2" },
          { value: "fast", displayValue: "CCS" },
        ],
      },
      value: "",
      validation: {},
      valid: true,
    },
    price: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "", displayValue: "Price..." },
          { value: 0, displayValue: "Free" },
          { value: 0.2, displayValue: "Paid" },
        ],
      },
      value: "",
      validation: {},
      valid: true,
    },
    busy: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "", displayValue: "Availability..." },
          { value: "false", displayValue: "Available" },
          { value: "true", displayValue: "Busy" },
        ],
      },
      value: "",
      validation: {},
      valid: true,
    },
  });

  const filterChangedHandler = (event, inputID) => {
    const updatedFilterForm = { ...filterForm };
    const updatedFilterElement = { ...updatedFilterForm[inputID] };
    updatedFilterElement.value = event.target.value;
    updatedFilterForm[inputID] = updatedFilterElement;
    setFilterForm(updatedFilterForm);

    props.filtered(updatedFilterForm);
  };

  const formArray = [];
  for (let key in filterForm) {
    formArray.push({
      id: key,
      config: filterForm[key],
    });
  }

  let form = formArray.map((element) => (
    <Input
      key={element.id}
      elementType={element.config.elementType}
      elementConfig={element.config.elementConfig}
      value={element.config.value}
      invalid={!element.config.valid}
      changed={(event) => filterChangedHandler(event, element.id)}
    />
  ));

  return (
    <div>
      <input
        className={classes.search}
        type="text"
        onChange={props.changed}
        placeholder="Search location"
      />
      <div className={classes.row}>
        <div>Filter by:</div>
        {form}
      </div>
    </div>
  );
};

export default Search;
