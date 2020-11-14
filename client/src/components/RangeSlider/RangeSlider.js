import { useState } from "react";

import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";
import classes from "./RangeSlider.module.css";

const RangeSlider = (props) => {
  const [rangeValues, setRangeValues] = useState([10, 1699]);

  const handleChange = (event, newValue) => {
    props.handleFilters(newValue);
    setRangeValues(newValue);
  };

  const AirbnbSlider = withStyles({
    root: { color: "#0b4c8c", height: 3, padding: "13px 0" },
    thumb: {
      height: 27,
      width: 27,
      marginTop: -12,
      marginLeft: -13,
      backgroundColor: "#0b4c8c",
      border: "1px solid currentColor",
      boxShadow: "#ebebeb 0 2px 2px",
      "&:focus, &:hover, &$active": { boxShadow: "#ccc 0 2px 3px 1px" },
      "& .bar": {
        width: 1,
        height: 9,
        marginLeft: 1,
        marginRight: 1,
        backgroundColor: "white",
        display: "inline-block!important",
      },
    },
    active: {},
    track: { height: 3 },
    rail: { color: "#cac6c6;", opacity: 1, height: 3 },
  })(Slider);

  const AirbnbThumbComponent = (props) => (
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );

  return (
    <div className={classes.RangeSlider}>
      <div className={[classes.RangeBox, "horizontal-layout"].join(" ")}>
        <div className={classes.RangeValue}>{rangeValues[0]}</div>
        <div className={classes.RangeValue}>{rangeValues[1]}</div>
      </div>
      <AirbnbSlider
        value={rangeValues}
        step={5}
        min={130}
        max={1700}
        onChange={handleChange}
        ThumbComponent={AirbnbThumbComponent}
      />
    </div>
  );
};

export default RangeSlider;
