const express = require("express");
const router = express.Router();

const chargerData = [
  { id: 1, type: "slow", price: 0, busy: true, station_id: 1 },
  { id: 2, type: "slow", price: 0.2, busy: false, station_id: 1 },
  { id: 3, type: "fast", price: 0, busy: false, station_id: 3 },
  { id: 4, type: "slow", price: 0.2, busy: true, station_id: 5 },
  { id: 5, type: "slow", price: 0, busy: true, station_id: 6 },
];

router.get("/", (req, res) => {
  res.json(chargerData);
});

module.exports = router;
