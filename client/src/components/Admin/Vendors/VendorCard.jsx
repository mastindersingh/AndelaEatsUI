import React from 'react';
import ReactStars from 'react-stars';
import PropTypes from 'prop-types';
import dateFormatter from '../../../helpers/dateFormatter';

/**
 * @function VendorCard
 *
 * @param {object} { vendor, rating }
 *
 * @returns {JSX}
 */
export const VendorCard = ({
  vendor,
  rating,
  showSuspendModal,
  showEditModal,
  edit
}) => (
  <div className="table-body">
    <div className="table-row">
      <div className="custom-row">
        <div className="custom-col-4 row-content">
          {vendor.name}
          <span>{vendor.address}</span>
        </div>
        <div className="custom-col-2">{vendor.tel}</div>
        <div className="custom-col-3">
          <ReactStars
            value={rating}
            color2="green"
            name="ratings"
            size={12}
            edit={false}
          />
        </div>
        <div className="custom-col-3 options-wrapper">
          <span
            className="edit-vendor"
            onClick={() => showEditModal(vendor)}
            role="button"
            tabIndex={0}
          >
            {!edit ? 'Edit' : 'Rate'}
          </span>
          {!edit && (
            <span
              className="suspend-vendor"
              onClick={() => showSuspendModal(vendor)}
              role="button"
              tabIndex={0}
            >
              Suspend
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

VendorCard.propTypes = {
  vendor: PropTypes.shape({
    name: PropTypes.string,
    tel: PropTypes.string,
    contactPerson: PropTypes.string,
    address: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string
  }),
  rating: PropTypes.number,
  showSuspendModal: PropTypes.func,
  showEditModal: PropTypes.func
};
