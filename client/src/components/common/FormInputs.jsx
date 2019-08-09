/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import Select from 'react-select';

const Input = ({
  id, value, onChangeHandler, options, name, label,
  type, error, clearErrors, isRequired, placeholder, isClearable
}) => (
  <div className="form-field-set">
    <label htmlFor={id}>
      {label}
      { type === 'select'
        ? (
          <Select
            value={value}
            onChange={onChangeHandler}
            options={options}
            placeholder={placeholder}
            isClearable={isClearable}
            name={name}
          />
        )
        : (type === 'date-picker')
          ? (
            <DatePicker
              selected={value}
              onChange={onChangeHandler}
              name={name}
            />
          )
          : (
            <input
              id={id}
              className="input"
              name={name}
              onChange={onChangeHandler}
              onFocus={clearErrors}
              value={value}
              type={type}
              placeholder={placeholder}
            />
          )
      }
      <span className="input-validation">{isRequired ? '* Required' : ''}</span>
      <span className="form-error">
        {error || ''}
      </span>
    </label>
  </div>
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
  options: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  clearErrors: PropTypes.func,
  isRequired: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  isClearable: PropTypes.bool,
};

export default Input;
