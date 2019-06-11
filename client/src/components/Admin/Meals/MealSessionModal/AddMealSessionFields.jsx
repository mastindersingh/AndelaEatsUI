/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

const AddMealSessionFields = (props) => {
  const {
    state: {
 date, name, startTime, endTime 
},
    errors,
    onChange,
  } = props;

  return (
    <Fragment>
      <div className="two-col-wrap">
        <div className="column">
          <div className="form-field-set">
            <label htmlFor="name">
              Date
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

            <div className="date-input">
              <DatePicker
                selected={date}
                onChange={(e) => onChange(e, 'date')}
              />
            </div>
          </div>
        </div>

        <div className="column">
          <div className="form-field-set">
            <label htmlFor="name">
              Meal Session Name
              <span
                className="form-error"
                style={{
                  display: errors.includes('desc') ? 'inline-block' : 'none',
                }}
              >
                {' '}
                * Invalid
              </span>
            </label>

            <input
              name="name"
              className="meal-session-name"
              type="text"
              value={name}
              onChange={(e) => onChange(e.target.value, 'name')}
            />
          </div>
        </div>
      </div>

      <div className="two-col-wrap">
        <div className="column">
          <div className="form-field-set">
            <label htmlFor="name">
              Start time
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

            <div className="date-input">
              <DatePicker
                selected={startTime}
                onChange={(e) => onChange(e, 'startTime')}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeFormat="HH:mm"
                dateFormat="h:mm A"
                timeCaption="Time"
              />
            </div>
          </div>
        </div>

        <div className="column">
          <div className="form-field-set">
            <label htmlFor="name">
              End time
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

            <div className="date-input">
              <DatePicker
                selected={endTime}
                onChange={(e) => onChange(e, 'endTime')}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeFormat="HH:mm"
                dateFormat="h:mm A"
                timeCaption="Time"
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AddMealSessionFields.propTypes = {
  state: PropTypes.shape({
    date: PropTypes.object.isRequired,
    name: PropTypes.string,
    startTime: PropTypes.object.isRequired,
    endTime: PropTypes.object.isRequired,
  }),
  errors: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};

export default AddMealSessionFields;
