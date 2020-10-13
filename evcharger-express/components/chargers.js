const express = require("express");
const router = express.Router();

const chargerData = [
  { id: "AA00", type: "slow", price: 0, busy: false, station_id: 1 },
  { id: "AA01", type: "slow", price: 0.2, busy: false, station_id: 1 },
  { id: "BA01", type: "fast", price: 0.5, busy: false, station_id: 1 },
  { id: "AA02", type: "slow", price: 0.2, busy: false, station_id: 2 },
  { id: "AA03", type: "slow", price: 0, busy: false, station_id: 2 },
  { id: "AA04", type: "slow", price: 0.2, busy: false, station_id: 3 },
  { id: "AA05", type: "slow", price: 0.2, busy: false, station_id: 3 },
  { id: "BA02", type: "fast", price: 0.5, busy: false, station_id: 3 },
  { id: "AA06", type: "slow", price: 0.2, busy: false, station_id: 4 },
  { id: "AA07", type: "slow", price: 0.2, busy: false, station_id: 4 },
  { id: "AA08", type: "slow", price: 0, busy: false, station_id: 4 },
  { id: "AA09", type: "slow", price: 0.2, busy: false, station_id: 5 },
  { id: "BA03", type: "fast", price: 0.5, busy: false, station_id: 5 },
  { id: "AA10", type: "slow", price: 0.2, busy: false, station_id: 5 },
  { id: "AA11", type: "slow", price: 0, busy: false, station_id: 6 },
  { id: "AA12", type: "slow", price: 0.2, busy: false, station_id: 6 },
  { id: "AA13", type: "slow", price: 0.2, busy: false, station_id: 6 },
  { id: "BA04", type: "fast", price: 0.5, busy: false, station_id: 7 },
  { id: "AA14", type: "slow", price: 0.2, busy: false, station_id: 8 },
  { id: "AA15", type: "slow", price: 0, busy: false, station_id: 9 },
  { id: "AA16", type: "slow", price: 0.2, busy: false, station_id: 10 },
  { id: "AA17", type: "slow", price: 0.2, busy: false, station_id: 11 },
  { id: "BA05", type: "fast", price: 0.5, busy: false, station_id: 11 },
  { id: "AA18", type: "slow", price: 0.2, busy: false, station_id: 12 },
  { id: "AA19", type: "slow", price: 0, busy: false, station_id: 13 },
  { id: "AA20", type: "slow", price: 0.2, busy: false, station_id: 14 },
  { id: "AA21", type: "slow", price: 0.2, busy: false, station_id: 15 },
  { id: "BA06", type: "fast", price: 0.5, busy: false, station_id: 16 },
  { id: "AA22", type: "slow", price: 0.2, busy: false, station_id: 17 },
  { id: "AA23", type: "slow", price: 0.2, busy: false, station_id: 18 },
  { id: "AA24", type: "slow", price: 0.2, busy: false, station_id: 19 },
  { id: "AA25", type: "slow", price: 0.2, busy: false, station_id: 20 },
  { id: "BA07", type: "fast", price: 0.5, busy: false, station_id: 19 },
  { id: "AA26", type: "slow", price: 0.2, busy: false, station_id: 18 },
  { id: "AA27", type: "slow", price: 0, busy: false, station_id: 17 },
  { id: "AA28", type: "slow", price: 0.2, busy: false, station_id: 7 },
  { id: "AA29", type: "slow", price: 0.2, busy: false, station_id: 4 },
  { id: "BA08", type: "fast", price: 0.5, busy: false, station_id: 3 },
  { id: "AA30", type: "slow", price: 0.2, busy: false, station_id: 11 },
  { id: "AA31", type: "slow", price: 0, busy: false, station_id: 12 },
  { id: "AA32", type: "slow", price: 0.2, busy: false, station_id: 13 },
  { id: "AA33", type: "slow", price: 0.2, busy: false, station_id: 14 },
  { id: "BA09", type: "fast", price: 0.5, busy: false, station_id: 13 },
  { id: "AA34", type: "slow", price: 0.2, busy: false, station_id: 15 },
  { id: "AA35", type: "slow", price: 0, busy: false, station_id: 16 },
];

router.get("/", (req, res) => {
  res.json(chargerData);
});

router.get("/:chargerId", (req, res) => {
  const id = req.params.chargerId;
  const result = chargerData.find((charger) => charger.id === id);
  res.json(result);
});

router.post("/:chargerId", (req, res) => {
  const id = req.params.chargerId;
  const updatedCharger = chargerData.find((charger) => charger.id === id);
  updatedCharger.busy = !updatedCharger.busy;
  res.json(updatedCharger);
});

module.exports = router;
