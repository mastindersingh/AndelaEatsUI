import React from 'react';
import PropTypes from 'prop-types';

const TemplateRow = ({
  templateDetails: { name, description, mealPeriod }
}) => (
  <div id="table-body">
    <div id="table-row">
      <div id="custom-row">
        <div className="custom-col-2 row-content">
          {name}
        </div>
        <div className="custom-col-2 row-content">
          {mealPeriod}
        </div>
        <div className="custom-col-5 row-content">
          {description}
        </div>
        <div className="custom-col-3 row-content">
          <div id="options">
            <button
              type="button"
              onClick={() => {}}
              id="edit-menu"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => {}}
              id="delete-menu"
            >
              Delete
            </button>
            <input
              type="radio"
              id="select-menu-template"
              name="name"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

TemplateRow.propTypes = {
  templateDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mealPeriod: PropTypes.string.isRequired,
  }),
};
export default TemplateRow;
