import React, { useState } from "react";
import Auth from "../../ProtectedRoute/Auth";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

const Signup = (props) => {
  const [signupForm, setSignupForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Username",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your E-mail",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your Password",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });
  const [formValidity, setFormValidity] = useState(false);

  const signupHandler = (event) => {
    event.preventDefault();

    Auth.signup(
      signupForm.name.value,
      signupForm.email.value,
      signupForm.password.value
    )
      .then((result) => {
        props.loginSuccess(Auth.getAxiosAuth());
        props.history.push(props.redirectPathOnSuccess);
      })
      .catch((error) => {
        props.loginFail();
      });
  };

  const inputChangedHandler = (event, inputID) => {
    const updatedSignupForm = { ...signupForm };
    const updatedSignupElement = { ...updatedSignupForm[inputID] };
    updatedSignupElement.value = event.target.value;
    updatedSignupElement.touched = true;
    updatedSignupElement.valid = checkValidity(
      updatedSignupElement.value,
      updatedSignupElement.validation
    );
    updatedSignupForm[inputID] = updatedSignupElement;
    console.log(updatedSignupElement);

    let formIsValid = true;
    for (let inputIDs in updatedSignupForm) {
      formIsValid = updatedSignupForm[inputIDs].valid && formIsValid;
    }
    setFormValidity(formIsValid);
    console.log(formIsValid);

    setSignupForm(updatedSignupForm);
  };

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    return isValid;
  };

  const formArray = [];
  for (let key in signupForm) {
    formArray.push({
      id: key,
      config: signupForm[key],
    });
  }

  let form = (
    <form onSubmit={signupHandler}>
      {formArray.map((element) => (
        <Input
          key={element.id}
          elementType={element.config.elementType}
          elementConfig={element.config.elementConfig}
          value={element.config.value}
          invalid={!element.config.valid}
          touched={element.config.touched}
          changed={(event) => inputChangedHandler(event, element.id)}
        />
      ))}
      <Button type="submit" btnType="success" disabled={!formValidity}>
        Login
      </Button>
    </form>
  );

  return (
    <div>
      <h1>Signup page</h1>
      <p>Please fill the bellow form to register</p>
      {form}
    </div>
  );
};

export default Signup;
