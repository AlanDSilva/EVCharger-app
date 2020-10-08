import React from "react";

const Charge = (props) => {
  return (
    <div>
      <h1>Protected</h1>
      {props.isAuthenticated ? (
        <p>User authenticated</p>
      ) : (
        <p>Sorry you need to login first</p>
      )}
    </div>
  );
};

export default Charge;
