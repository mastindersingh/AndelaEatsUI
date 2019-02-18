import React from 'react';
import { 
  func, number, string, array, bool, object, oneOfType
} from 'prop-types';

const UnSuspendModal = ({
  closeModal,
  unsuspendVendor,
  displayUnsuspendModal,
  modalContent
}) => (
  <div 
    className="modal" 
    id="delete-vendor-modal"
    style={(displayUnsuspendModal) ? { display: 'block' } : { display: 'none' }}
  >
    { displayUnsuspendModal 
      ? (
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-title">Reinstate Vendor</div>
          </div>
          <h3>{`Permanently reinstate ${modalContent.name}`}</h3>
          <span className="warning">Are you sure you want to reinstate?</span>
          <div className="modal-footer">
            <div className="">
              <button 
                className="grayed upper" 
                type="button"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="fill upper delete-vendor" 
                type="button" 
                tabIndex={0}
                onClick={() => unsuspendVendor(modalContent.id)}
              >
                Reinstate
              </button>
            </div>
          </div>
        </div>
      )
      : null
    }
  </div>
);

UnSuspendModal.propTypes = {
  closeModal: func,
  displayUnsuspendModal: bool,
  unsuspendVendor: func
};

export default UnSuspendModal;
