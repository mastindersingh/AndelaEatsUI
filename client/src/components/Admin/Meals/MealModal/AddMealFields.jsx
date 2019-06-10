/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const AddMealFields = (props) => {
  const {
    state,
    state: { name, type },
    errors,
    onChange,
    mealTypes,
    mealExists,
    loadingMealExistence,
  } = props;

  return (
    <Fragment>
      <div className="two-col-wrap">
        <div className="column">
          <div className="form-field-set">
            <label htmlFor="name">
              Name
              <span
                className="form-error"
                style={{
                  display: errors.includes('name') ? 'inline-block' : 'none',
                }}
              >
                {' '}
                * Invalid
              </span>
            </label>
            <input type="text" name="name" value={name} onChange={onChange} />
            {/*eslint-disable no-nested-ternary, operator-linebreak, indent, spaced-comment*/}
            {!loadingMealExistence &&
            mealExists === null ? null : loadingMealExistence ? (
              <div style={{ display: 'flex', paddingTop: '10px' }}>
                <div
                  className="loader-wheel"
                  style={{ marginRight: '1rem', display: 'inline-block' }}
                />
                <div className="checking-meal-existence">
                  checking for meal...
                </div>
              </div>
            ) : (
              <div
                className={`meal-exists-notification ${
                  mealExists ? 'meal-exists' : 'meal-no-exists'
                }`}
              >
                {mealExists ? 'Meal already exists' : 'Meal doesn\'t exist'}
              </div>
            )}
          </div>
        </div>

        <div className="column">
          <div className="form-field-set">
            <label htmlFor="type">
              Meal type
              <span
                className="form-error"
                style={{
                  display: errors.includes('type') ? 'inline-block' : 'none',
                }}
              >
                {' '}
                * Invalid
              </span>
            </label>
            <select onChange={onChange} name="type" value={type}>
              <option value="">-- select --</option>
              {mealTypes.map((mealType) => (
                <option key={mealType} value={mealType.toLowerCase()}>
                  {mealType}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AddMealFields.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
  }),
  errors: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  mealTypes: PropTypes.arrayOf(PropTypes.string),
  loadingMealExistence: PropTypes.bool,
  mealExists: PropTypes.oneOf([null, true, false]),
};

export default AddMealFields;
