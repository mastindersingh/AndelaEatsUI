import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable */
const button = ({ func, children, classes, type ='button', loading=false }) => (
  <button
    tabIndex={0}
    type={type}
    className={`${classes}`}
    onClick={func}
    disabled={loading}
  >
    {children}
  </button>
);


button.propTypes = {
  func: PropTypes.func.isRequired,
  classes: PropTypes.string,
  type: PropTypes.string,
}
export default button;
