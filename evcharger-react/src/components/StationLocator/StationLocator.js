import React, { useState, useEffect } from "react";
import stations from "../../stations";

import classes from "./StationLocator.module.css";

import Map from "./Map";
import List from "./List";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";

const ChargerLocator = () => {
  const [viewport, setViewport] = useState({
    latitude: 60.1699,
    longitude: 24.9384,
    width: "100%",
    height: "300px",
    zoom: 10,
  });
  const [selectedStation, setSelectedStation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [viewModal, setViewModal] = useState(false);

  // useEffect(() => {
  //   const from = userLocation
  //     ? [userLocation.latitude, userLocation.longitude]
  //     : null;
  //   const to = selectedStation
  //     ? [selectedStation.latitude, selectedStation.longitude]
  //     : null;
  //   if (from && to) {
  //     console.log(distance(from, to));
  //   }
  // }, [userLocation, selectedStation]);

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

  const cancelModalHandler = () => {
    setViewModal(false);
  };

  const continueModalHandler = () => {
    alert("You Continue!");
  };

  return (
    <div className={classes.container}>
      <div className={classes.half}>
        <Modal show={viewModal} modalClosed={cancelModalHandler}>
          <h1>This is the modal</h1>
          <Button btnType="danger" clicked={cancelModalHandler}>
            Cancel
          </Button>
          <Button btnType="success" clicked={continueModalHandler}>
            Continue
          </Button>
        </Modal>
        <Map
          viewport={viewport}
          selectedStation={selectedStation}
          userLocation={userLocation}
          changeHandler={viewportChangeHandler}
          stations={stations}
          clickHandler={markerClickHandler}
          closeHandler={closePopupHandler}
          geoHandler={handleGeolocationChange}
        />
      </div>
      <div className={classes.half}>
        <List
          stations={stations}
          userLocation={userLocation}
          selectedStation={selectedStation}
          handleClick={listClickHandler}
        />
      </div>
      <button onClick={() => setViewModal(true)}>Show Modal</button>
    </div>
  );
};

export default ChargerLocator;
