import React from "react";
import Auth from "../ProtectedRoute/Auth";

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
          Username <input type="text" name="username" />
        </div>
        <div>
          Password <input type="text" name="password" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
