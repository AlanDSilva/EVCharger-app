import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import StationLocator from "./components/StationLocator/StationLocator";
import Charge from "./components/Charge/Charge";
import Account from "./components/Account/Account";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [stations, setStations] = useState([]);
  const [chargers, setChargers] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/stations").then((response) => {
      console.log("stations promise fulfilled");
      setStations(response.data);
    });
    axios.get("http://localhost:3001/chargers").then((response) => {
      console.log("chargers promise fulfilled");
      setChargers(response.data);
    });
  }, []);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds + 1);
        if ((seconds + 1) % 10 === 0) {
          setMinutes((m) => m + 1);
          setSeconds(0);
          setTotal((t) => t + price);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggle = (price) => {
    if (price === null) {
      setIsActive(!isActive);
    } else {
      setIsActive(!isActive);
      setPrice(price);
    }
  };

  const reset = () => {
    setPrice(0);
    setTotal(0);
    setSeconds(0);
    setMinutes(0);
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
        <Route
          path="/locator"
          render={() => (
            <StationLocator stations={stations} chargers={chargers} />
          )}
        />
        <Route
          path="/charge"
          render={(routeProps) => (
            <Charge
              isAuthenticated={isAuthenticated}
              isActive={isActive}
              seconds={seconds}
              minutes={minutes}
              toggle={toggle}
              reset={reset}
              chargers={chargers}
              total={total}
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
