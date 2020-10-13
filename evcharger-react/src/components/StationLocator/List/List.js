import React from "react";
import distance from "@turf/distance";
import classes from "./List.module.css";

import ListItem from "./ListItem/ListItem";

const List = ({
  stations,
  chargers,
  selectedStation,
  userLocation,
  handleClick,
}) => {
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
            key={station.stationId}
            onClick={() => handleClick(station)}
          >
            <ListItem
              station={station}
              selected={
                selectedStation
                  ? selectedStation.stationId === station.stationId
                  : null
              }
              distance={
                userLocation ? getDistance(station).toFixed(2) + "km" : ""
              }
              chargers={chargers.filter(
                (charger) => charger.stationId === station.stationId
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
