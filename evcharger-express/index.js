const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;

const stationComponent = require("./components/stations");
const chargerComponent = require("./components/chargers");

// Middleware
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/stations", stationComponent);
app.use("/chargers", chargerComponent);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
