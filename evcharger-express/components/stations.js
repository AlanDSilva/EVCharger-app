const express = require("express");
const router = express.Router();

const stationData = [
  { id: 1, city: "Oulu", latitude: 65.0121, longitude: 25.4651 },
  { id: 2, city: "Rov", latitude: 66.5039, longitude: 25.7294 },
  { id: 3, city: "Kok", latitude: 63.8415, longitude: 23.125 },
  { id: 4, city: "Vaas", latitude: 63.0951, longitude: 21.6165 },
  { id: 5, city: "Tamp", latitude: 62.2426, longitude: 25.7473 },
  { id: 6, city: "Jyv", latitude: 61.4978, longitude: 23.761 },
  { id: 7, city: "Hel1", latitude: 60.2934, longitude: 25.0378 },
  { id: 8, city: "Hel2", latitude: 60.2055, longitude: 24.6559 },
  { id: 9, city: "Hel3", latitude: 60.1699, longitude: 24.9384 },
];

router.get("/", (req, res) => {
  res.json(stationData);
});

router.get("/:stationId", (req, res) => {
  const id = Number(req.params.stationId);
  const result = stationData.find((station) => station.id === id);
  res.json(result);
});

module.exports = router;
