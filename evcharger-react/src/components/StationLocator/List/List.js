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
            key={station.id}
            onClick={() => handleClick(station)}
          >
            <ListItem
              station={station}
              selected={
                selectedStation ? selectedStation.id === station.id : null
              }
              distance={
                userLocation ? getDistance(station).toFixed(2) + "km" : ""
              }
              chargers={chargers.filter(
                (charger) => charger.station_id === station.id
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
