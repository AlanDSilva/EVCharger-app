const express = require("express");
const db = require("../db");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

// const chargerData = [
//   { id: "AA00", type: "slow", price: 0, busy: false, station_id: 1 },
//   { id: "AA01", type: "slow", price: 0.2, busy: false, station_id: 1 },
//   { id: "BA01", type: "fast", price: 0.5, busy: false, station_id: 1 },
//   { id: "AA02", type: "slow", price: 0.2, busy: false, station_id: 2 },
//   { id: "AA03", type: "slow", price: 0, busy: false, station_id: 2 },
//   { id: "AA04", type: "slow", price: 0.2, busy: false, station_id: 3 },
//   { id: "AA05", type: "slow", price: 0.2, busy: false, station_id: 3 },
//   { id: "BA02", type: "fast", price: 0.5, busy: false, station_id: 3 },
//   { id: "AA06", type: "slow", price: 0.2, busy: false, station_id: 4 },
//   { id: "AA07", type: "slow", price: 0.2, busy: false, station_id: 4 },
//   { id: "AA08", type: "slow", price: 0, busy: false, station_id: 4 },
//   { id: "AA09", type: "slow", price: 0.2, busy: false, station_id: 5 },
//   { id: "BA03", type: "fast", price: 0.5, busy: false, station_id: 5 },
//   { id: "AA10", type: "slow", price: 0.2, busy: false, station_id: 5 },
//   { id: "AA11", type: "slow", price: 0, busy: false, station_id: 6 },
//   { id: "AA12", type: "slow", price: 0.2, busy: false, station_id: 6 },
//   { id: "AA13", type: "slow", price: 0.2, busy: false, station_id: 6 },
//   { id: "BA04", type: "fast", price: 0.5, busy: false, station_id: 7 },
//   { id: "AA14", type: "slow", price: 0.2, busy: false, station_id: 8 },
//   { id: "AA15", type: "slow", price: 0, busy: false, station_id: 9 },
//   { id: "AA16", type: "slow", price: 0.2, busy: false, station_id: 10 },
//   { id: "AA17", type: "slow", price: 0.2, busy: false, station_id: 11 },
//   { id: "BA05", type: "fast", price: 0.5, busy: false, station_id: 11 },
//   { id: "AA18", type: "slow", price: 0.2, busy: false, station_id: 12 },
//   { id: "AA19", type: "slow", price: 0, busy: false, station_id: 13 },
//   { id: "AA20", type: "slow", price: 0.2, busy: false, station_id: 14 },
//   { id: "AA21", type: "slow", price: 0.2, busy: false, station_id: 15 },
//   { id: "BA06", type: "fast", price: 0.5, busy: false, station_id: 16 },
//   { id: "AA22", type: "slow", price: 0.2, busy: false, station_id: 17 },
//   { id: "AA23", type: "slow", price: 0.2, busy: false, station_id: 18 },
//   { id: "AA24", type: "slow", price: 0.2, busy: false, station_id: 19 },
//   { id: "AA25", type: "slow", price: 0.2, busy: false, station_id: 20 },
//   { id: "BA07", type: "fast", price: 0.5, busy: false, station_id: 19 },
//   { id: "AA26", type: "slow", price: 0.2, busy: false, station_id: 18 },
//   { id: "AA27", type: "slow", price: 0, busy: false, station_id: 17 },
//   { id: "AA28", type: "slow", price: 0.2, busy: false, station_id: 7 },
//   { id: "AA29", type: "slow", price: 0.2, busy: false, station_id: 4 },
//   { id: "BA08", type: "fast", price: 0.5, busy: false, station_id: 3 },
//   { id: "AA30", type: "slow", price: 0.2, busy: false, station_id: 11 },
//   { id: "AA31", type: "slow", price: 0, busy: false, station_id: 12 },
//   { id: "AA32", type: "slow", price: 0.2, busy: false, station_id: 13 },
//   { id: "AA33", type: "slow", price: 0.2, busy: false, station_id: 14 },
//   { id: "BA09", type: "fast", price: 0.5, busy: false, station_id: 13 },
//   { id: "AA34", type: "slow", price: 0.2, busy: false, station_id: 15 },
//   { id: "AA35", type: "slow", price: 0, busy: false, station_id: 16 },
// ];

// //ONLY FOR POPULATING DATABASE WITH ABOVE DUMMY DATA
// router.post("/", (req, res) => {
//   chargerData.map((charger) => {
//     db.query(
//       "INSERT INTO charger(chargerId, type, price, busy, stationId) VALUES (?,?,?,?,?)",
//       [
//         charger.id,
//         charger.type,
//         charger.price,
//         charger.busy,
//         charger.station_id,
//       ]
//     )
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
  db.query("SELECT * FROM charger")
    .then((results) => {
      res.json(results);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

router.get("/:chargerId", (req, res) => {
  const chargerId = req.params.chargerId;
  db.query("SELECT * FROM charger where chargerId = ?", [chargerId])
    .then((results) => {
      res.json(results);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

router.post("/:chargerId", (req, res) => {
  const chargerId = req.params.chargerId;
  db.query("UPDATE charger SET busy = !busy WHERE chargerId = ?", [chargerId])
    .then(() => {
      db.query("SELECT * FROM charger where chargerId = ?", [chargerId]).then(
        (results) => {
          res.json(results);
        }
      );
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

module.exports = router;
