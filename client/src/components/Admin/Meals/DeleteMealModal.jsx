import React from 'react';
import PropTypes from 'prop-types';

const DeleteMealModal = ({
  displayDeleteModal,
  modalContent,
  deleteMealItem,
  isDeleting,
  closeModal
}) => (
  <div
    className="modal"
    id="delete-meal-modal"
    style={(displayDeleteModal) ? { display: 'block' } : { display: 'none' }}
  >
    { displayDeleteModal 
      ? (
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-title">Delete Meal</div>
          </div>
          <h3>{`Permanently delete ${modalContent.name}`}</h3>
          <span className="warning">This cannot be undone</span>
          <div className="modal-footer">
            <div>
              <div
                className="loader-wheel"
                style={{ display: isDeleting ? 'inline-block' : 'none' }}
              />
            </div>
            <button 
              className="grayed upper" 
              type="button"
              disabled={isDeleting}
              onClick={closeModal}
            >
                Cancel
            </button>
            <button
              className="fill upper"
              id="delete-meal" 
              type="button" 
              tabIndex={0}
              disabled={isDeleting}
              onClick={() => deleteMealItem(modalContent.id)}
            >
                Delete
            </button>
          </div>
        </div>
      )
      : null
    }
  </div>
);

DeleteMealModal.propTypes = {
  modalContent: PropTypes.shape({
    name: PropTypes.string,
    key: PropTypes.number
  }).isRequired,
  displayDeleteModal: PropTypes.bool.isRequired,
  isDeleting: PropTypes.bool,
  deleteMealItem: PropTypes.func,
  closeModal: PropTypes.func.isRequired
};

export default DeleteMealModal;
