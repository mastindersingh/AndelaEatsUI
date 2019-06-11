import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';

const DeleteModal = ({
  closeModal,
  isDeleting,
  displayDeleteModal,
  deleteItem,
  modalContent,
  item
}) => (
  <div
    className="modal"
    id="delete-vendor-modal"
    style={displayDeleteModal ? { display: 'block' } : { display: 'none' }}
  >
    {displayDeleteModal ? (
      <div className="modal-content">
        <div className="modal-header">
          <div className="header-title--error">Delete {item}</div>
        </div>
        <h3>{`Permanently delete ${item}`}</h3>
        <span className="warning">This cannot be undone</span>
        {isDeleting && <Loader />}
        <div className="modal-footer">
          <div className="">
            <button
              className="grayed upper"
              type="button"
              disabled={isDeleting}
              onClick={() => closeModal(null)}
              name="close-btn"
            >
              Cancel
            </button>
            <button
              className="fill--delete upper delete-vendor"
              type="button"
              tabIndex={0}
              disabled={isDeleting}
              onClick={() => deleteItem(modalContent.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ) : null}
  </div>
);

DeleteModal.propTypes = {
  closeModal: PropTypes.func,
  displayDeleteModal: PropTypes.bool,
  deleteItem: PropTypes.func,
  modalContent: PropTypes.shape({}),
  isDeleting: PropTypes.bool,
  item: PropTypes.string
};

export default DeleteModal;
