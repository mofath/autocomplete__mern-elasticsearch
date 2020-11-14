import React, { useState } from "react";

import classes from "./FilterItems.module.css";

const FilterItems = ({ list, handleFilters }) => {
  const [Checked, setChecked] = useState([]);

  const handleToggle = (name) => {
    const currentIndex = Checked.indexOf(name);
    const newChecked = [...Checked];
    if (currentIndex === -1) {
      newChecked.push(name);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    handleFilters(newChecked);
  };

  return (
    <>
      {list ? (
        <ul className={classes.FilterItems}>
          {list.map((item, i) => (
            <li key={i}>
              <label>
                <input
                  type="checkbox"
                  name={item}
                  value={item}
                  checked={Checked.indexOf(item) === -1 ? false : true}
                  onChange={() => handleToggle(item)}
                />
                <p
                  className={
                    Checked.indexOf(item) === -1
                      ? classes.Default
                      : classes.Active
                  }
                >
                  {item}
                </p>
              </label>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default FilterItems;
