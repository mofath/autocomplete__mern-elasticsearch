import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { VscClose as CloseIcon } from "react-icons/vsc";
import { autocomplete } from "../../../graphql/requests"

import "./Searchbar.scss";
import React from "react";

const Searchbar = () => {
  const [SearchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([])

  const history = useHistory();

  const handleSearchClick = (event) => {
    console.log(event);
    event.preventDefault();
    history.push({ pathname: "/", search: `q=${SearchTerm}` });
  };

  const resetSearch = () => {
    setSearchTerm("");
    setSuggestions([])
  }

  const handleTextChange = async (event) => {
    const text = event.currentTarget.value;
    setSearchTerm(text)
    const { data, error } = await autocomplete(text)
    !error && setSuggestions(() => data.autocomplete.map(item => item))
  }

  const renderSuggestions = () => {
    if (suggestions.length === 0) return null
    return (
      <React.Fragment>
        {suggestions.map((suggestion) => {
          const regex = new RegExp(SearchTerm, 'gi');
          const name = suggestion.name.replace(regex, `<strong>${SearchTerm}</strong>`);
          return (<li key={suggestion.id} className="searchbar__autocomplete__results__suggestion horizontal-layput">
            <div><div><img src={suggestion.image} /></div></div>
            <div className="suggestion-name" dangerouslySetInnerHTML={{ __html: name }} />
          </li>)
        })}
      </React.Fragment>
    )
  }

  return (
    <div className="searchbar">
      <form className="searchbar__form" >
        <div className="searchbar__form__input-group">
          <input
            type="text"
            className="searchbar__form__input"
            placeholder="Search"
            autoComplete="off"
            tabIndex="-1"
            value={SearchTerm}
            onChange={(event) => handleTextChange(event)}
          />
          <i className="searchbar__clear-search-icon" onClick={resetSearch}><CloseIcon size="20" /></i>
          <i className="searchbar__search-icon" onClick={handleSearchClick}><SearchIcon size="24" /></i>
          <div className="searchbar__autocomplete" >
            <ul className="searchbar__autocomplete__results" >
              {renderSuggestions()}
            </ul>
          </div>
          {SearchTerm && <div className="searchbar__autocomplete__overlay"></div>}
        </div>
      </form>
    </div>
  );
};

export default Searchbar;