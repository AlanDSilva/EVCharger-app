import React from "react";
import Layout from "./components/Layout/Layout";
import StationLocator from "./components/StationLocator/StationLocator";

function App() {
  return (
    <div className="App">
      <Layout>
        <StationLocator />
      </Layout>
    </div>
  );
}

export default App;
