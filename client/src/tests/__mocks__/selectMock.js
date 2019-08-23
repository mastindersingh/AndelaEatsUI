/* eslint-disable no-shadow */
import React from 'react';

// eslint-disable-next-line react/prop-types
jest.mock("react-select", () => ({ options, value, onChange }) => {
  const handleChange = (event) => {
    const selectedOption = options.find(
      option => option.value === event.currentTarget.value
    );
    onChange(selectedOption);
  };
  return (
    <select id="select" value={value} onChange={handleChange}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});