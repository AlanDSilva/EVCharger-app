import React from "react";
import classes from "./ListItem.module.css";

const ListItem = ({ station, selected, distance, chargers }) => {
  return (
    <>
      <button className={classes.collapsible}>{station.city}</button>
      {selected ? (
        <div className={classes.content}>
          {chargers.map((charger) => (
            <p key={charger.id}>{charger.id}</p>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default ListItem;
