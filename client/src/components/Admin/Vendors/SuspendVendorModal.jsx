import React, { Component } from 'react';
import PropTypes from 'prop-types';

const SuspendVendorModal = ({
  closeModal,
  isSuspending,
  suspendVendor,
  displaySuspendModal,
  modalContent
}) => (
  <div 
    className="modal" 
    id="delete-vendor-modal"
    style={(displaySuspendModal) ? { display: 'block' } : { display: 'none' }}
  >
    { displaySuspendModal 
      ? (
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-title">Suspend Vendor</div>
          </div>
          <h3>{`Permanently delete ${modalContent.name}`}</h3>
          <span className="warning">This cannot be undone</span>
          <div className="modal-footer">
            <div className="">
              <button 
                className="grayed upper" 
                type="button"
                disabled={isSuspending}
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="fill upper delete-vendor" 
                type="button" 
                tabIndex={0}
                disabled={isSuspending}
                onClick={() => suspendVendor(modalContent.id)}
              >
                Suspend
              </button>
            </div>
          </div>
        </div>
      )
      : null
    }
  </div>
);

SuspendVendorModal.propTypes = {
  closeModal: PropTypes.func,
  displaySuspendModal: PropTypes.bool,
  isSuspending: PropTypes.bool,
  suspendVendor: PropTypes.func,
  modalContent: PropTypes.shape({
    vendorName: PropTypes.string,
    vendorAddress: PropTypes.string,
    contactPerson: PropTypes.string,
    phoneNumber: PropTypes.string
  })
};

export default SuspendVendorModal;
