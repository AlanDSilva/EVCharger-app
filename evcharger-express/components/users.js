const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");
const passportHttp = require("passport-http");
const { resolveNaptr } = require("dns");
const db = require("../db");

router.use(bodyParser.json());

let users = [
  {
    id: "dfdb99d7-fba7-4f14-9472-edb96c965198",
    username: "Joe",
    password: "$2a$08$1JB1lpyQdFrxs.RGzf40teYVExjUhMRQ9sGi1J7L.izjPL57nf8Re",
    email: "Joe@oamk.fi",
  },
];

router.get("/", (req, res) => {
  res.json(users);
});

router.post("/", (req, res) => {
  const passHash = bcrypt.hashSync(req.body.password, 8);
  const userId = uuidv4();
  db.query(
    "INSERT INTO user(userId, username, email, password) VALUES (?,?,?,?)",
    [userId, req.body.username, req.body.email, passHash]
  )
    .then(() => {
      db.query("SELECT * from user where userId = ?", [userId]).then(
        (result) => {
          res.json(result);
        }
      );
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

passport.use(
  new passportHttp.BasicStrategy(function (username, password, done) {
    // const result = users.find((user) => user.username === username);
    db.query("SELECT * FROM user WHERE username = ?", [username]).then(
      (result) => {
        console.log(result);
        if (result.length == 0) {
          return done(null, false);
        }

        if (bcrypt.compareSync(password, result[0].password) == false) {
          return done(null, false);
        }
        done(null, result);
      }
    );
  })
);

router.post("/login", function (req, res) {
  passport.authenticate("basic", function (err, user, info) {
    if (!user) {
      res.sendStatus(500);
    } else {
      res.send(user);
    }
  })(req, res);
});

module.exports = router;
