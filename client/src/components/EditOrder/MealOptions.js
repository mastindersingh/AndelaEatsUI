import React, { Component } from "react";
import PropType from "prop-types";
import classname from "classnames";
/* eslint-disable */

const MealOptions = props => {
    const { name, meal, selectedMealId, handleOptionChange } = props;
    return (
        <li className={classname({ selected: meal.id === selectedMealId })}>
          <div className="image">
            <img src={meal.mealPicture} alt="food" />
          </div>

          <div className="meal-name">{meal.meal}</div>

          <div className="menu-checkbox">
            <input
              id={meal.id}
              type="radio"
              name={name}
              className="radio-custom"
              value={meal.meal}
              checked={selectedMealId === meal.meal}
              onChange={handleOptionChange}
            />
            <label className="radio-custom-label" htmlFor={meal.id}></label>
          </div>
        </li>
    );
}


MealOptions.propTypes = {
  handleOptionChange: PropType.func,
  meal: PropType.object,
  name: PropType.string, 
  selectedMealId: PropType.string
};


export default MealOptions;
