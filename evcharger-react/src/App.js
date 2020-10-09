import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import StationLocator from "./components/StationLocator/StationLocator";
import Charge from "./components/Charge/Charge";
import Login from "./components/Login/Login";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const onLogin = (userInfo) => {
    setAuthenticated(true);
    setUserInfo(userInfo);
    console.log("Login Succesful");
    console.log(userInfo);
  };

  const onLoginFail = () => {
    setAuthenticated(false);
    console.log("Login Failed!");
  };

  return (
    <div className="App">
      <Layout isAuthenticated={isAuthenticated} userInfo={userInfo}>
        <Route path="/" exact component={StationLocator} />
        <Route
          path="/charge"
          render={(routeProps) => (
            <Charge
              isAuthenticated={isAuthenticated}
              isActive={isActive}
              seconds={seconds}
              toggle={toggle}
            />
          )}
        />
        <Route
          path="/login"
          render={(routeProps) => (
            <Login
              loginSuccess={onLogin}
              loginFail={onLoginFail}
              redirectPathOnSuccess="/charge"
              {...routeProps}
            />
          )}
        />
        {/* <ProtectedRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/charge"
          component={Charge}
        /> */}
      </Layout>
    </div>
  );
}

export default App;
