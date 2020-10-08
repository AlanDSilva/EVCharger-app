import React from "react";
import { Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import StationLocator from "./components/StationLocator/StationLocator";
import Charge from "./components/Charge/Charge";

function App() {
  return (
    <div className="App">
      <Layout>
        <Route path="/" exact component={StationLocator} />
        <Route path="/charge" component={Charge} />
      </Layout>
    </div>
  );
}

export default App;
