import React from 'react';
import PropTypes from 'prop-types';

const DeleteEngagementModal = ({
  closeModal,
  isDeleting,
  displayDeleteModal,
  deleteEngagement,
  modalContent
}) => (
  <div 
    className="modal" 
    id="delete-vendor-modal"
    style={(displayDeleteModal) ? { display: 'block' } : { display: 'none' }}
  >
    { displayDeleteModal 
      ? (
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-title">Delete Engagement</div>
          </div>
          <h3>{`Permanently delete Engagement`}</h3>
          <span className="warning">This cannot be undone</span>
          <div className="modal-footer">
            <div className="">
              <button 
                className="grayed upper" 
                type="button"
                disabled={isDeleting}
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="fill upper delete-vendor" 
                type="button" 
                tabIndex={0}
                disabled={isDeleting}
                onClick={() => deleteEngagement(modalContent.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )
      : null
    }
  </div>
);

DeleteEngagementModal.propTypes = {
  closeModal: PropTypes.func,
  displayDeleteModal: PropTypes.bool,
  deleteEngagement: PropTypes.func,
  modalContent: PropTypes.shape({}),
  isDeleting: PropTypes.bool
};

export default DeleteEngagementModal;
