import React, { useState } from "react";
import Auth from "../ProtectedRoute/Auth";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [loginForm, setLoginForm] = useState({
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

  const loginHandler = (event) => {
    event.preventDefault();

    Auth.authenticate(loginForm.name.value, loginForm.password.value)
      .then((result) => {
        props.loginSuccess(Auth.getAxiosAuth());
        props.history.push(props.redirectPathOnSuccess);
      })
      .catch(() => {
        props.loginFail();
      });
  };

  const inputChangedHandler = (event, inputID) => {
    const updatedLoginForm = { ...loginForm };
    const updatedLoginElement = { ...updatedLoginForm[inputID] };
    updatedLoginElement.value = event.target.value;
    updatedLoginElement.touched = true;
    updatedLoginElement.valid = checkValidity(
      updatedLoginElement.value,
      updatedLoginElement.validation
    );
    updatedLoginForm[inputID] = updatedLoginElement;
    console.log(updatedLoginElement);

    let formIsValid = true;
    for (let inputIDs in updatedLoginForm) {
      formIsValid = updatedLoginForm[inputIDs].valid && formIsValid;
    }
    setFormValidity(formIsValid);
    console.log(formIsValid);

    setLoginForm(updatedLoginForm);
  };

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    return isValid;
  };

  const formArray = [];
  for (let key in loginForm) {
    formArray.push({
      id: key,
      config: loginForm[key],
    });
  }

  let form = (
    <form onSubmit={loginHandler}>
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
      <h1>Login</h1>
      <div>Please give your username and password to login</div>

      {form}
    </div>
  );
};

export default Login;
