const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const db = require("./db");

const stationComponent = require("./components/stations");
const chargerComponent = require("./components/chargers");
const userComponent = require("./components/users");
const receiptComponent = require("./components/receipts");

// Middleware
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/stations", stationComponent);
app.use("/chargers", chargerComponent);
app.use("/users", userComponent);
app.use("/receipts", receiptComponent);

// DB initialization
Promise.all([
  db.query(`CREATE TABLE IF NOT EXISTS station(
            stationId INT AUTO_INCREMENT PRIMARY KEY,
            city VARCHAR(32) NOT NULL,
            latitude DOUBLE NOT NULL,
            longitude DOUBLE NOT NULL
        )`),
  db.query(`CREATE TABLE IF NOT EXISTS charger(
            chargerId VARCHAR(4) PRIMARY KEY,
            type VARCHAR(4) NOT NULL,
            price FLOAT NOT NULL,
            busy TINYINT(1) NOT NULL,
            stationId INT NOT NULL,
            FOREIGN KEY (stationId)
            REFERENCES station(stationId)
                ON UPDATE CASCADE
                ON DELETE CASCADE
        )`),
  db.query(`CREATE TABLE IF NOT EXISTS user(
        userId VARCHAR(255) PRIMARY KEY,
        username VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL
    )`),
  db.query(`CREATE TABLE IF NOT EXISTS receipt(
    receiptId INT AUTO_INCREMENT PRIMARY KEY,
    total FLOAT NOT NULL,
    date VARCHAR(255) NOT NULL,
    userId VARCHAR(255) NOT NULL,
    chargerId VARCHAR(4) NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(userId) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (chargerId) REFERENCES charger(chargerId) ON UPDATE CASCADE ON DELETE CASCADE
  )`),
])
  .then(() => {
    console.log("database initialized");
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
