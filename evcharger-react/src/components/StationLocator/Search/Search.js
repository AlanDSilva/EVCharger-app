import React from "react";

import classes from "./Search.module.css";

const Search = (props) => {
  return (
    <input
      className={classes.search}
      type="text"
      onChange={props.changed}
      placeholder="Search location"
    />
  );
};

export default Search;
