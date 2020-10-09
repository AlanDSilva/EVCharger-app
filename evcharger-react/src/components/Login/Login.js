import React from "react";
import Auth from "../ProtectedRoute/Auth";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const loginHandler = (event) => {
    event.preventDefault();
    Auth.authenticate(
      event.target["username"].value,
      event.target["password"].value
    )
      .then((result) => {
        props.loginSuccess(Auth.getAxiosAuth());
        props.history.push(props.redirectPathOnSuccess);
      })
      .catch(() => {
        props.loginFail();
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <div>Please give your username and password to login</div>

      <form onSubmit={loginHandler}>
        <div>
          <Input
            label="Username"
            inputtype="input"
            type="text"
            name="username"
            placeholder="Your username"
          />
        </div>
        <div>
          <Input
            label="Password"
            inputtype="input"
            type="text"
            name="password"
            placeholder="Your password"
          />
        </div>
        <div>
          <Button type="submit" btnType="success">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
