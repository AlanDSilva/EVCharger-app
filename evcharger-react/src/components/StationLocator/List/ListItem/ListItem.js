import React from "react";
import classes from "./ListItem.module.css";

const ListItem = ({ station, selected, distance, chargers }) => {
  return (
    <>
      <button className={classes.collapsible}>{station.city}</button>
      {selected ? (
        <div className={classes.content}>
          {chargers.map((charger) => (
            <div key={charger.chargerId} className={classes.row}>
              <p>{charger.chargerId}</p>
              <p>{charger.type === "slow" ? "Type 2" : "CCS"}</p>
              <p>{charger.price}€</p>
              <p>{charger.busy ? "Busy" : "Free"}</p>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default ListItem;
