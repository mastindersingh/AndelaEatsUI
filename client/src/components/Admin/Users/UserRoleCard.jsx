import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import dateFormatter from '../../../helpers/dateFormatter';

/**
 * @function RolesCard
 *
 * @param {object} { engagement }
 *
 * @returns {JSX}
 */
const RolesCard = ({
  role,
  showDeleteModal,
  showPermisionModal,
  showEditModal,
}) => { 
  return (
    <div className="table-body">
      <div className="table-row">
        <div className="custom-row">
          <div className="custom-col-3 row-content">
            { role.name }
          </div>
          <div className="custom-col-3 start-date">
            {dateFormatter(role.timestamps.updated_at)}
          </div>
          <div className="custom-col-2">{dateFormatter(role.timestamps.created_at)}</div>
          <div className="custom-col-2">
            <button
              onClick={() => showPermisionModal(role)}
              className="add--color add"
              type="button"
            >
              Manage
            </button>
          </div>
          <div className="custom-col-2">
            <button
              onClick={() => showEditModal(role)}
              className="edit--color edit"
              type="button"
            >
              Edit
            </button>
            <button
              onClick={() => showDeleteModal(role)}
              className="delete-color"
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

RolesCard.propTypes = {
  role: PropTypes.shape({
    endDate: PropTypes.string,
    startDate: PropTypes.string,
  }),
  showDeleteModal: PropTypes.func,
  showPermisionModal: PropTypes.func,
  showEditModal: PropTypes.func,
};

export default RolesCard;
