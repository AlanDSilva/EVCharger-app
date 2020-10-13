const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");
const passportHttp = require("passport-http");
const { resolveNaptr } = require("dns");

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
  const newUser = {
    id: uuidv4(),
    username: req.body.username,
    password: passHash,
    email: req.body.email,
  };
  users.push(newUser);

  res.json(newUser);
});

passport.use(
  new passportHttp.BasicStrategy(function (username, password, done) {
    const result = users.find((user) => user.username === username);
    if (result == undefined) {
      return done(null, false);
    }

    if (bcrypt.compareSync(password, result.password) == false) {
      return done(null, false);
    }

    done(null, result);
  })
);

router.post("/login", function (req, res) {
  passport.authenticate("basic", function (err, user, info) {
    console.log(user);
    res.send(user);
  })(req, res);
});

module.exports = router;
