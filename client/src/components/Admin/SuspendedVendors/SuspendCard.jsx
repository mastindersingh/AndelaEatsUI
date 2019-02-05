import React from 'react';
import PropTypes from 'prop-types';


/**
 * @function SuspendCard
 * 
 * @param {object} { props }
 * 
 * @returns {JSX}
 */
export const SuspendCard = ({ 
  vendor: {
    name, address, tel, contactPerson 
  }, showUnSuspendModal, vendor 
}) => (
  <div className="table-body">
    <div className="table-row">
      <div className="custom-row">
        <div className="custom-col-4 row-content">
          { name }
        </div>
        <div className="custom-col-4">{ address }</div>
        <div className="custom-col-2">{ tel }</div>
        <div className="custom-col-3">{ contactPerson }</div>
        <div className="custom-col-3">
          <span
            className="edit edit--color"
            onClick={() => showUnSuspendModal(vendor)}
          >
            Reinstate
          </span>
        </div>
      </div>
    </div>
  </div>
);

SuspendCard.propTypes = {
  vendor: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    tel: PropTypes.string,
    contactPerson: PropTypes.string
  }),
  showUnSuspendModal: PropTypes.func
};
