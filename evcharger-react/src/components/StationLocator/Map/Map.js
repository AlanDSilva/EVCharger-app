import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import MapButtons from "./MapButtons";
import classes from "./Map.module.css";
const Map = ({
  viewport,
  selectedStation,
  changeHandler,
  stations,
  chargers,
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
          <button onClick={() => clickHandler(station)}>
            {
              chargers.filter(
                (charger) => charger.stationId === station.stationId
              ).length
            }
          </button>
        </Marker>
      ))}

      {selectedStation ? (
        <Popup
          latitude={selectedStation.latitude}
          longitude={selectedStation.longitude}
          onClose={closeHandler}
        >
          <div>
            <h3>{selectedStation.city}</h3>
            <div>
              {chargers
                .filter(
                  (charger) => charger.stationId === selectedStation.stationId
                )
                .map((charger) => (
                  <div className={classes.row} key={charger.chargerId}>
                    <div>{charger.chargerId}-</div>
                    <div>{charger.type}-</div>
                    <div>{charger.price}€-</div>
                    <div>{charger.busy ? "Busy" : "Available"}</div>
                  </div>
                ))}
            </div>
          </div>
        </Popup>
      ) : null}

      <MapButtons geoHandler={geoHandler} />
    </ReactMapGL>
  );
};

export default Map;
