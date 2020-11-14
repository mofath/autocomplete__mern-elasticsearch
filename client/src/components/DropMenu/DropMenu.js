import React, { useState } from "react";

import { FiPlusSquare as PlusIcon } from "react-icons/fi";
import { FiMinusSquare as MinusIcons } from "react-icons/fi";

import classes from "./DropMenu.module.css";

const DropMenu = (props) => {
  const [Open, setOpen] = useState(true);

  const toggle = () => setOpen(!Open);

  return (
    <div className={classes.DropMenu}>
      <div
        className={classes.Heading}
        onKeyPress={() => toggle()}
        onClick={() => toggle()}
      >
        {props.title}
        <i>{Open ? <MinusIcons color="gray" /> : <PlusIcon />}</i>
      </div>

      <div>{Open && props.children} </div>
    </div>
  );
};

export default DropMenu;
