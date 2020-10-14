import React, { useEffect } from "react";
import axios from "axios";
import Auth from "../../ProtectedRoute/Auth";

const Info = () => {
  useEffect(() => {
    const userId = Auth.getAxiosAuth().auth[0].userId;
    axios.get(`http://localhost:3001/receipts/${userId}`).then((response) => {
      console.log(response.data);
    });
  }, []);
  return <h2>{Auth.getAxiosAuth().auth[0].userId}</h2>;
};

export default Info;
