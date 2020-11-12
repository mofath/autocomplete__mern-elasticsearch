import { useState } from "react";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { VscChromeClose as CloseIcon } from "react-icons/vsc";

import classes from "./Searchbar.module.css";

const Searchbar = () => {
  const [SearchActive, setSearchActive] = useState(false);
  const [SearchTerm, setSearchTerm] = useState("");

  return (
    <div
      className={[
        classes.Searchbar,
        SearchActive && classes.ActiveSearchbar,
      ].join(" ")}
    >
      <input
        className={[
          classes.SearchInput,
          SearchActive && classes.ActiveSearchInput,
        ].join(" ")}
        type="text"
        value={SearchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
        placeholder="Search"
        onMouseEnter={() => setSearchActive(true)}
        onMouseLeave={() => setSearchActive(false)}
        onFocus={() => setSearchActive(true)}
      />
      <button
        className={classes.SearchIcon}
        onClick={() => setSearchActive((SearchActive) => !SearchActive)}
      >
        <i>
          {SearchActive ? (
            <CloseIcon color="black" size="30px" />
          ) : (
            <SearchIcon color="black" size="30px" />
          )}
        </i>
      </button>
    </div>
  );
};

export default Searchbar;
