import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import NavItem from "../Navigation/NavItems/NavItem/NavItem";

import classes from "./StationLocator.module.css";

import Search from "./Search/Search";
import Map from "./Map/Map";
import List from "./List/List";

const ChargerLocator = (props) => {
  const { stations, chargers } = props;
  const [viewport, setViewport] = useState({
    latitude: 65.0121,
    longitude: 25.4651,
    width: "100%",
    height: "300px",
    zoom: 3,
  });
  const [selectedStation, setSelectedStation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [matched, setMatched] = useState([]);
  const [matchedChargers, setMatchedChargers] = useState([]);

  useEffect(() => {
    console.log("station locator effect");
    setMatched(stations);
    setMatchedChargers(chargers);
  }, [stations, chargers]);

  const updateMatchedChargers = (form) => {
    let results = chargers;
    for (let key in form) {
      if (form[key].value !== "")
        results = results.filter(
          (result) => String(result[key]) === form[key].value
        );
      else console.log(`${key} is null`);
    }
    setMatchedChargers(results);
  };

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
      <Search changed={searchChangedHandler} filtered={updateMatchedChargers} />
      {/* {form} */}

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
            chargers={matchedChargers}
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
            chargers={matchedChargers}
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
