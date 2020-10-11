import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import NavItem from "../Navigation/NavItems/NavItem/NavItem";
import axios from "axios";
//import stations from "../../stations";

import classes from "./StationLocator.module.css";

import Search from "./Search/Search";
import Map from "./Map/Map";
import List from "./List/List";

const ChargerLocator = () => {
  const [viewport, setViewport] = useState({
    latitude: 65.0121,
    longitude: 25.4651,
    width: "100%",
    height: "300px",
    zoom: 3,
  });
  const [selectedStation, setSelectedStation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [stations, setStations] = useState([]);
  const [matched, setMatched] = useState([]);
  const [chargers, setChargers] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/stations").then((response) => {
      console.log("stations promise fulfilled");
      setStations(response.data);
      setMatched(response.data);
    });
    axios.get("http://localhost:3001/chargers").then((response) => {
      console.log("chargers promise fulfilled");
      setChargers(response.data);
    });
  }, []);

  const viewportChangeHandler = (viewport) => {
    viewport.width = "100%";
    setViewport(viewport);
  };

  const markerClickHandler = (station) => {
    setSelectedStation(station);
  };

  const closePopupHandler = () => {
    setSelectedStation(null);
  };

  const handleGeolocationChange = (coordinates) => {
    console.log("updating current location");
    setUserLocation(coordinates);
  };

  const listClickHandler = (station) => {
    setSelectedStation(station);
  };

  const searchChangedHandler = (event) => {
    var results = stations.filter((station) =>
      station.city.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setMatched(results);
  };

  return (
    <div className={classes.container}>
      <div className={classes.tabs}>
        <NavItem link="/locator/map">Map View</NavItem>
        <NavItem link="/locator/list">ListView</NavItem>
      </div>
      <Search changed={searchChangedHandler} />

      <Route
        exact
        path="/locator/map"
        render={() => (
          <Map
            viewport={viewport}
            selectedStation={selectedStation}
            userLocation={userLocation}
            changeHandler={viewportChangeHandler}
            stations={matched}
            clickHandler={markerClickHandler}
            closeHandler={closePopupHandler}
            geoHandler={handleGeolocationChange}
          />
        )}
      />
      <Route
        exact
        path="/locator/list"
        render={() => (
          <List
            stations={matched}
            chargers={chargers}
            userLocation={userLocation}
            selectedStation={selectedStation}
            handleClick={listClickHandler}
          />
        )}
      />
    </div>
  );
};

export default ChargerLocator;
