import React from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select';

const Input = ({
  id, value, onChangeHandler, options, name, label, type, error, clearErrors, isRequired
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
          />
        )
        : (type === 'date-picker'
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
            />
          )
        )
        }
      <span className="input-validation">{isRequired ? '* Required' : ''}</span>
      <span className="form-error">
        {error || ''}
      </span>
    </label>
  </div>
);

export default Input;
