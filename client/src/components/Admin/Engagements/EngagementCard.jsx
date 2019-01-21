import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import dateFormatter from '../../../helpers/dateFormatter';


/**
 * @function EngagementCard
 *
 * @param {object} { engagement }
 *
 * @returns {JSX}
 */
export const EngagementCard = ({
  engagement: { endDate, startDate, vendor: { name } },
  showDeleteModal,
  engagement,
  showEditModal,
  handleNoEdit,
}) => {
  const classes = !moment(engagement.endDate).isAfter(moment().toDate())
    ? 'edit--disabled' : 'edit--color';
  return (
    <div className="table-body">
      <div className="table-row">
        <div className="custom-row">
          <div className="custom-col-4 row-content">
            { name }
          </div>
          <div className="custom-col-3 start-date">
            {dateFormatter(startDate)}
          </div>
          <div className="custom-col-3">{dateFormatter(endDate)}</div>
          <div className="custom-col-2">
            <button
              onClick={(moment(engagement.endDate).isAfter(moment().toDate()))
                ? () => showEditModal(engagement)
                : () => handleNoEdit(engagement)}
              className={`${classes} edit-spacing edit`}
              type="button"
            >
              Edit
            </button>
            <button
              onClick={() => showDeleteModal(engagement)}
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

EngagementCard.propTypes = {
  engagement: PropTypes.shape({
    endDate: PropTypes.string,
    startDate: PropTypes.string,
    vendor: PropTypes.object
  }),
  showDeleteModal: PropTypes.func,
  showEditModal: PropTypes.func,
  handleNoEdit: PropTypes.func,
};
