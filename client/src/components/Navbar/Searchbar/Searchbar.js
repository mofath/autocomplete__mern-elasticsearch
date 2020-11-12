import { useState } from "react";
import { FiSearch as SearchIcon } from "react-icons/fi";

import classes from "./Searchbar.module.css";

const Searchbar = () => {
  const [SearchActive, setSearchActive] = useState(false);
  const [SearchTerm, setSearchTerm] = useState("");

  return (
    <div
      className={[classes.Search, SearchActive && classes.SearchActive].join(" ")}
    >
      <input
        className={[
          classes.SearchInput,
          SearchActive && classes.ActiveSearcInput,
        ].join(" ")}
        type="search"
        value={SearchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
        placeholder="Search"
      />
      <button
        className={classes.SearchIcon}
        onClick={() => setSearchActive((SearchActive) => !SearchActive)}
      >
        <i>
          <SearchIcon color="black" size="30px" />
        </i>
      </button>
    </div>
  );
};

export default Searchbar;
