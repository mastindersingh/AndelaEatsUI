import React from 'react';

const selectBox = (props) => (
  <div>
    <label htmlFor={props.type}>{props.label}</label>
    <select 
      name={props.type} 
      id="type" 
      onChange={props.onChange}
      value={props.value}
    >
      {props.options
        .map(option => <option key={option.id} value={`${option.id}`}>{option.name}</option>)}
    </select>
  </div>
);

export default selectBox;
