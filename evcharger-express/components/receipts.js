const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../db");

router.use(bodyParser.json());

const receiptData = [];

router.get("/", (req, res) => {
  db.query("SELECT * FROM receipt")
    .then((response) => {
      res.json(response);
    })
    .catch(response.sendStatus(500));
});

router.post("/", (req, res) => {
  var date = new Date();
  db.query(
    "INSERT INTO receipt (total, date, userId, chargerId) VALUES (?,?,?,?)",
    [req.body.total, date, req.body.userId, req.body.chargerId]
  )
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  db.query(`SELECT * FROM receipt WHERE userId = ?`, [userId])
    .then((response) => {
      res.json(response);
    })
    .catch((error) => res.sendStatus(500));
});

module.exports = router;
