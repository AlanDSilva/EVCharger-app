import axios from "axios";

let userInfo = {
  username: null,
  password: null,
};

let myAuth = {
  authenticate: (username, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "http://localhost:3001/users/login",
          {},
          {
            auth: {
              username: username,
              password: password,
            },
          }
        )
        .then((result) => {
          userInfo = result.data;
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject();
        });
    });
  },
  signup: (username, email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:3001/users/", {
          username: username,
          email: email,
          password: password,
        })
        .then((result) => {
          userInfo = result.data;
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject();
        });
    });
  },
  getAxiosAuth: () => {
    return {
      auth: userInfo,
    };
  },
};

export default myAuth;
