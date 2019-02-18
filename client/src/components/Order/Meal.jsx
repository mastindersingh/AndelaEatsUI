import React, { Component } from "react";
import PropType from "prop-types";
import classname from "classnames";
/* eslint-disable */

class Meal extends Component {
  render() {
    const { meal, onChange, selectedMealId, shouldHaveCheckBox } = this.props;

    return (
      <li className={classname({ selected: meal.id === selectedMealId })}>
        <div className="image">
          <img src={meal.image} alt="food" />
        </div>
        <div className="meal-name">{meal.name}</div>
        {shouldHaveCheckBox && (
          <div className="menu-checkbox">
            <input
              id={meal.id}
              type="radio"
              name={meal.name}
              className="radio-custom"
              onChange={evt => onChange(meal.id, evt.target.checked)}
              checked={meal.id === selectedMealId}
              value={meal.name}
            />
            <label className="radio-custom-label" htmlFor={meal.id} />
          </div>
        )}
      </li>
    );
  }
}

Meal.propTypes = {
  meals: PropType.object
};
export default Meal;
