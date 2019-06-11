import React from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select';

const Input = (props) =>(
    <div className="form-field-set">
        <label htmlFor={props.id}>
        {props.label}
        { props.type === 'select'
            ? <Select
                value={props.value}
                onChange={props.onChangeHandler}
                options={props.options}
                />
            : ( props.type === 'date-picker'
                ? <DatePicker
                selected={props.value}
                onChange={props.onChangeHandler}
                name={props.name}
                />
                : <input
                id={props.id}
                className="input"
                name={props.name}
                onChange={props.onChangeHandler}
                onFocus={props.clearErrors}
                value={props.value}
              />
            )
        }
        <span className="vendor-name-validation">{props.isRequired ? '* Required' : ''}</span>
        <span className="form-error">
            {props.error ? props.error : ''}
        </span>
        </label>
    </div>
);

export default Input;
