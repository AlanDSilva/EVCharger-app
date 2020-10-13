const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

const receiptData = [];

router.get("/", (req, res) => {
  res.json(receiptData);
});

router.post("/", (req, res) => {
  var date = new Date();
  receiptData.push({
    ...req.body,
    date,
  });
  res.sendStatus(200);
});

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  const result = receiptData.filter((receipt) => receipt.user_id === userId);
  res.json(result);
});

module.exports = router;
