import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import MapButtons from "./MapButtons";

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
      onClick={() => console.log("Map clicked")}
    >
      {stations.map((station) => (
        <Marker
          key={station.stationId}
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
