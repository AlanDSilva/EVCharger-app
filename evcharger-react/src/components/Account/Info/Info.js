import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../../ProtectedRoute/Auth";
import classes from "./Info.module.css";

const Info = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const userId = Auth.getAxiosAuth().auth[0].userId;
    axios.get(`http://localhost:3001/receipts/${userId}`).then((response) => {
      setHistory(response.data);
    });
  }, []);

  return (
    <div>
      <h3>Your charging history</h3>
      {history.map((receipt) => (
        <div key={receipt.receiptId} className={classes.container}>
          <div>{receipt.date}</div>
          <div>{receipt.chargerId}</div>
          <div>{receipt.total}€ </div>
        </div>
      ))}
    </div>
  );
};

export default Info;
