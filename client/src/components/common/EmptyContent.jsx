import React from 'react';
import PropTypes from 'prop-types';

const EmptyContent = ({ message }) => (
  <div className="empty-content">
    <span>
      <i className="fas fa-minus-circle" />
      { message }
    </span>
  </div>
);

EmptyContent.propTypes = {
  message: PropTypes.string.isRequired
};

export default EmptyContent;
