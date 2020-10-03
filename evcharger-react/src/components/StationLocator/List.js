import React from "react";
import distance from "@turf/distance";
import classes from "./List.module.css";

const List = ({ stations, selectedStation, userLocation, handleClick }) => {
  const getDistance = (station) => {
    const from = [userLocation.latitude, userLocation.longitude];
    const to = [station.latitude, station.longitude];

    return distance(from, to);
  };

  if (userLocation) {
    stations.sort((a, b) => {
      return getDistance(a) - getDistance(b);
    });
  }

  return (
    <div>
      <div className={classes.container}>
        {stations.map((station) => (
          <div
            className={classes.item}
            key={station.id}
            onClick={() => handleClick(station)}
          >
            {`${station.city}  ${station.id} ${
              userLocation ? getDistance(station).toFixed(2) + "km" : ""
            }
            ${
              selectedStation
                ? selectedStation.id === station.id
                  ? "Selected"
                  : "Not Selected"
                : ""
            }`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
