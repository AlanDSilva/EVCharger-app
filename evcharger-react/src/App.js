import React from "react";
import Layout from "./components/Layout/Layout";
import ChargerLocator from "./containers/ChargerLocator/ChargerLocator";

function App() {
  return (
    <div className="App">
      <Layout>
        <ChargerLocator />
      </Layout>
    </div>
  );
}

export default App;
