import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  onClickHandler, type = 'button', classes, loading = false, btnText,
  tabIndex = 0, name
}) => (
  // eslint-disable-next-line
  <button
    type={type}
    className={`${classes}`}
    onClick={onClickHandler}
    disabled={loading}
    tabIndex={tabIndex}
    name={name}
  >{btnText}
  </button>
);


Button.propTypes = {
  onClickHandler: PropTypes.func,
  classes: PropTypes.string,
  type: PropTypes.string,
  loading: PropTypes.bool,
  btnText: PropTypes.string.isRequired,
  tabIndex: PropTypes.number,
  name: PropTypes.string
};
export default Button;
