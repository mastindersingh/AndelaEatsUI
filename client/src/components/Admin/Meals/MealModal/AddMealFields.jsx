/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const AddMealFields = (props) => {
  const {
    state: { name, desc, type },
    errors,
    onChange,
    mealTypes
  } = props;

  return (
    <Fragment>
      <div className="two-col-wrap">
        <div className="column">
          <div className="form-field-set">
            <label htmlFor="name">
              Name
              <span
                className="err-invalid"
                style={{
                  display: errors.includes('name')
                    ? 'inline-block'
                    : 'none'
                }}
              > * Invalid
              </span>
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="column">
          <div className="form-field-set">
            <label htmlFor="type">
              Meal type
              <span
                className="err-invalid"
                style={{
                  display: errors.includes('type')
                    ? 'inline-block'
                    : 'none'
                }}
              > * Invalid
              </span>
            </label>
            <select
              onChange={onChange}
              name="type"
              value={type}
            >
              <option value="">-- select --</option>
              { mealTypes.map(mealType => (
                <option
                  key={mealType}
                  value={mealType.toLowerCase()}
                >
                  {mealType}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="form-field-set">
        <label htmlFor="desc">
          Description
          <span
            className="err-invalid"
            style={{
              display: errors.includes('desc')
                ? 'inline-block'
                : 'none'
            }}
          > * Invalid
          </span>
        </label>
        <input
          name="desc"
          type="text"
          value={desc}
          onChange={onChange}
        />
      </div>
    </Fragment>
  );
};

AddMealFields.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string,
    desc: PropTypes.string,
    type: PropTypes.string
  }),
  errors: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  mealTypes: PropTypes.arrayOf(PropTypes.string)
};

export default AddMealFields;
