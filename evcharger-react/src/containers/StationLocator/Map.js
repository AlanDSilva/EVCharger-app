import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import MapButtons from "./MapButtons";
import classes from "./Map.module.css";

const Map = ({
  viewport,
  selectedStation,
  changeHandler,
  stations,
  clickHandler,
  closeHandler,
  geoHandler,
}) => {
  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={changeHandler}
    >
      {stations.map((station) => (
        <Marker
          key={station.id}
          latitude={station.latitude}
          longitude={station.longitude}
        >
          <button onClick={() => clickHandler(station)}>X</button>
        </Marker>
      ))}

      {selectedStation ? (
        <Popup
          latitude={selectedStation.latitude}
          longitude={selectedStation.longitude}
          onClose={closeHandler}
        >
          <div>
            <h2>{selectedStation.city}</h2>
          </div>
        </Popup>
      ) : null}

      <MapButtons geoHandler={geoHandler} />
    </ReactMapGL>
  );
};

export default Map;
