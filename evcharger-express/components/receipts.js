const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

const receiptData = [];

router.get("/", (req, res) => {
  res.json(receiptData);
});

router.post("/", (req, res) => {
  console.log(req.body);

  res.sendStatus(200);
});

module.exports = router;
