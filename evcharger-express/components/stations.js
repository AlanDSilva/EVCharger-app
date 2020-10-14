const express = require("express");
const db = require("../db");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

// // DUMMY DATA
// const stationData = [
//   { city: "Oulu", latitude: 65.0121, longitude: 25.4651 },
//   { city: "Oulu", latitude: 65.013, longitude: 25.4645 },
//   { city: "Oulu", latitude: 65.0145, longitude: 25.462 },
//   { city: "Rovaniemi", latitude: 66.5039, longitude: 25.7294 },
//   { city: "Rovaniemi", latitude: 65.506, longitude: 25.732 },
//   { city: "Rovanimei", latitude: 65.5, longitude: 25.736 },
//   { city: "Kokkola", latitude: 63.8415, longitude: 23.125 },
//   { city: "Kokkola", latitude: 65.846, longitude: 23.5 },
//   { city: "Vaasa", latitude: 63.0951, longitude: 21.6165 },
//   { city: "Oulu", latitude: 63.085, longitude: 21.6195 },
//   { city: "Kuopio", latitude: 62.898, longitude: 27.6782 },
//   { city: "Joensuu", latitude: 62.601, longitude: 29.7636 },
//   { city: "Turku", latitude: 60.4518, longitude: 22.2666 },
//   { city: "Lahti", latitude: 60.9827, longitude: 25.6612 },
//   { city: "Lapperanta", latitude: 61.055, longitude: 28.1897 },
//   { city: "Tampere", latitude: 61.4978, longitude: 23.761 },
//   { city: "Tampere", latitude: 61.4878, longitude: 23.7695 },
//   { city: "Tampere", latitude: 61.4928, longitude: 23.7567 },
//   { city: "Jyväskylä", latitude: 62.2395, longitude: 25.761 },
//   { city: "Jyväskylä", latitude: 65.0121, longitude: 25.7678 },
//   { city: "Helsinki", latitude: 60.2934, longitude: 25.0378 },
//   { city: "Helsinki", latitude: 60.2055, longitude: 24.6559 },
//   { city: "Helsinki", latitude: 60.1699, longitude: 24.9384 },
// ];

// //ONLY FOR POPULATING DATABASE WITH ABOVE DUMMY DATA
// router.post("/", (req, res) => {
//   stationData.map((station) => {
//     db.query("INSERT INTO station(city, latitude, longitude) VALUES (?,?,?)", [
//       station.city,
//       station.latitude,
//       station.longitude,
//     ])
//       .then((results) => {
//         console.log(results);
//         res.sendStatus(201);
//       })
//       .catch(() => {
//         res.sendStatus(500);
//       });
//   });
// });

router.get("/", (req, res) => {
  db.query("SELECT * FROM station")
    .then((results) => {
      res.json(results);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

router.get("/:stationId", (req, res) => {
  const stationId = Number(req.params.stationId);
  db.query("SELECT * FROM station where stationId = ?", [stationId])
    .then((results) => {
      res.json(results);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

module.exports = router;
