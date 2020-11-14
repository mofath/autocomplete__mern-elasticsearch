import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { VscChromeClose as CloseIcon } from "react-icons/vsc";

import classes from "./Searchbar.module.css";

const Searchbar = () => {
  const [SearchActive, setSearchActive] = useState(false);
  const [SearchTerm, setSearchTerm] = useState("");

  const history = useHistory();

  const handleSearchClick = (event) => {
    event.preventDefault();
    setSearchActive(true);
    history.push({ pathname: "/", search: `q=${SearchTerm}` });
  };

  return (
    <form
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
        onChange={({ currentTarget }) =>
          setSearchTerm(() => currentTarget.value)
        }
        placeholder="Search"
        onMouseEnter={() => setSearchActive(true)}
        onMouseLeave={() => setSearchActive(false)}
        onFocus={() => setSearchActive(true)}
      />
      <button className={classes.SearchIcon} onClick={handleSearchClick}>
        <i>
          {SearchActive ? (
            <CloseIcon color="black" size="30px" />
          ) : (
            <SearchIcon color="black" size="30px" />
          )}
        </i>
      </button>
    </form>
  );
};

export default Searchbar;
