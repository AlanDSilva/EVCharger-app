import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import StationLocator from "./components/StationLocator/StationLocator";
import Charge from "./components/Charge/Charge";
import Account from "./components/Account/Account";

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
        <Route path="/locator" component={StationLocator} />
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
          path="/account"
          render={() => (
            <Account
              loginSuccess={onLogin}
              loginFail={onLoginFail}
              isAuthenticated={isAuthenticated}
            />
          )}
        />
      </Layout>
    </div>
  );
}

export default App;
