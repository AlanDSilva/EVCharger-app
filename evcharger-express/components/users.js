const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");
const passportHttp = require("passport-http");

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
  console.log(req.body);

  const passHash = bcrypt.hashSync(req.body.password, 8);

  users.push({
    id: uuidv4(),
    username: req.body.username,
    password: passHash,
    email: req.body.email,
  });

  res.sendStatus(200);
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

router.post(
  "/login",
  passport.authenticate("basic", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.sendStatus(200);
  }
);

module.exports = router;
