import React from "react";
import classes from "./ListItem.module.css";

const ListItem = ({ station, selected, distance, chargers }) => {
  return (
    <>
      <button className={classes.collapsible}>{station.city}</button>
      {selected ? (
        <p className={classes.content}>
          {chargers.map((charger) => (
            <p>{charger.id}</p>
          ))}
        </p>
      ) : null}
    </>
  );
};

export default ListItem;
