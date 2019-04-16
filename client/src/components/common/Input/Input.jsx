import React from 'react';
import PropTypes from 'prop-types';


const input = ({
  name, value, onChange, id, errorName, 
  inputName
}) => (
  <div className="form-field-set">
    <label htmlFor="question">
      {inputName}
      <span
        className="err-invalid"
        style={{
          display: errorName ? 'inline-block' : 'none'
        }}
      >
        {' '}
        * Invalid
      </span>
    </label>
    <input
      id={id}
      type="text"
      name={name}
      value={value || ''}
      onChange={onChange}
    />
  </div>
);

input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  errorName: PropTypes.string,
  inputName: PropTypes.string.isRequired
};
export default input;
