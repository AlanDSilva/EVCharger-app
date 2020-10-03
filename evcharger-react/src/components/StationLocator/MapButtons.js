import React from "react";
import {
  GeolocateControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import classes from "./MapButtons.module.css";

const geolocateStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  margin: 10,
};

const MapButtons = ({ geoHandler }) => {
  const geoLocationUpdateHandler = (e) => {
    var lon = e.coords.longitude;
    var lat = e.coords.latitude;
    var position = { latitude: lat, longitude: lon };
    geoHandler(position);
  };

  return (
    <div className={classes.mapbuttons}>
      <div>
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          onGeolocate={(e) => geoLocationUpdateHandler(e)}
        />
      </div>

      <div>
        <NavigationControl />
      </div>

      <div>
        <ScaleControl />
      </div>
    </div>
  );
};

export default MapButtons;
