import React, { Component } from "react";
import PropType from "prop-types";
import classname from "classnames";
/* eslint-disable */

class MainMeal extends Component {
  render() {
    const {
      meal: { mainMeal },
      onChange,
      selectedMealId,
      shouldHaveCheckBox,
      meal
    } = this.props;
    

    return (
      <li className={classname({ selected: mainMeal.id === selectedMealId })}>
        <div className="image">
          <img src={mainMeal.image} alt="food" />
        </div>
        <div className="meal-name">{mainMeal.name}</div>
        {shouldHaveCheckBox && (
          <div className="menu-checkbox">
            <input
              id={mainMeal.id}
              type="radio"
              name={mainMeal.name}
              className="radio-custom"
              onChange={evt =>
                onChange(mainMeal.id, evt.target.checked, meal.id)
              }
              checked={mainMeal.id === selectedMealId}
              value={mainMeal.name}
            />
            <label className="radio-custom-label" htmlFor={mainMeal.id} />
          </div>
        )}
      </li>
    );
  }
}

MainMeal.propTypes = {
  meals: PropType.object
};
export default MainMeal;
