const express = require("express");
const router = express.Router();

const stationData = [
  { id: 1, city: "Oulu", latitude: 65.0121, longitude: 25.4651 },
  { id: 2, city: "Oulu", latitude: 65.013, longitude: 25.4645 },
  { id: 3, city: "Oulu", latitude: 65.0145, longitude: 25.462 },
  { id: 4, city: "Rovaniemi", latitude: 66.5039, longitude: 25.7294 },
  { id: 5, city: "Rovaniemi", latitude: 65.506, longitude: 25.732 },
  { id: 6, city: "Rovanimei", latitude: 65.5, longitude: 25.736 },
  { id: 7, city: "Kokkola", latitude: 63.8415, longitude: 23.125 },
  { id: 8, city: "Kokkola", latitude: 65.846, longitude: 23.5 },
  { id: 9, city: "Vaasa", latitude: 63.0951, longitude: 21.6165 },
  { id: 10, city: "Oulu", latitude: 63.085, longitude: 21.6195 },
  { id: 11, city: "Kuopio", latitude: 62.898, longitude: 27.6782 },
  { id: 12, city: "Joensuu", latitude: 62.601, longitude: 29.7636 },
  { id: 13, city: "Turku", latitude: 60.4518, longitude: 22.2666 },
  { id: 14, city: "Lahti", latitude: 60.9827, longitude: 25.6612 },
  { id: 15, city: "Lapperanta", latitude: 61.055, longitude: 28.1897 },
  { id: 16, city: "Tampere", latitude: 61.4978, longitude: 23.761 },
  { id: 17, city: "Tampere", latitude: 61.4878, longitude: 23.7695 },
  { id: 18, city: "Tampere", latitude: 61.4928, longitude: 23.7567 },
  { id: 19, city: "Jyväskylä", latitude: 62.2395, longitude: 25.761 },
  { id: 20, city: "Jyväskylä", latitude: 65.0121, longitude: 25.7678 },
  { id: 21, city: "Helsinki", latitude: 60.2934, longitude: 25.0378 },
  { id: 22, city: "Helsinki", latitude: 60.2055, longitude: 24.6559 },
  { id: 23, city: "Helsinki", latitude: 60.1699, longitude: 24.9384 },
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
