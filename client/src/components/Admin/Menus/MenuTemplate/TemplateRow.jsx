import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TemplateRow = ({
  openDeleteMenuTemplateModal,
  templateDetails: {
    name, description, mealPeriod, id
  },
  url
}) => (
  <div id="table-body">
    <div id="table-row">
      <div id="custom-row">
        <div className="custom-col-2 row-content">
          <Link to={url}> {name}  </Link>
        </div>
        <div className="custom-col-2 row-content">
          <Link to={url}> {mealPeriod}  </Link>
        </div>
        <div className="custom-col-5 row-content">
          <Link to={url}>  {description} </Link>
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
              onClick={() => openDeleteMenuTemplateModal(id)}
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
  openDeleteMenuTemplateModal: PropTypes.func.isRequired,
  templateDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mealPeriod: PropTypes.string.isRequired,
  }),
  url: PropTypes.string.isRequired
};
export default TemplateRow;
