import { useContext, useState } from "react";
import { FilterContext } from "../../../context/FilterContext";
import "./ColorFilter.scss";

const ColorFilter = () => {
  const {
    isBlueChecked,
    isRedChecked,
    isGreenChecked,
    isSaturationChecked,
    changeBlueValue,
    changeGreenValue,
    changeRedValue,
    changeSaturationValue,
  } = useContext(FilterContext);

  return (
    <form action="" className="colorFilter-form">
      <div className="colorFilter-container">
        <input
          type="checkbox"
          name="more-red"
          id="more-red"
          checked={isRedChecked}
          onChange={changeRedValue}
        />
        <label htmlFor="more-red">{"Red > 50%"}</label>
      </div>
      <div className="colorFilter-container">
        <input
          type="checkbox"
          name="more-green"
          id="more-green"
          checked={isGreenChecked}
          onChange={changeGreenValue}
        />
        <label htmlFor="more-green">{"Green > 50%"}</label>
      </div>
      <div className="colorFilter-container">
        <input
          type="checkbox"
          name="more-blue"
          id="more-blue"
          checked={isBlueChecked}
          onChange={changeBlueValue}
        />
        <label htmlFor="more-blue">{"Blue > 50%"}</label>
      </div>
      <div className="colorFilter-container">
        <input
          type="checkbox"
          name="more-saturation"
          id="more-saturation"
          checked={isSaturationChecked}
          onChange={changeSaturationValue}
        />
        <label htmlFor="more-saturation">{"Saturation > 50%"}</label>
      </div>
    </form>
  );
};

export default ColorFilter;
