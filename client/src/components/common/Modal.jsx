import React from "react";
import Loader from "./Loader/Loader";
import PropTypes from 'prop-types';

const Modal = ({
  closeModal,
  isUpdating,
  formValidation,
  displayModal,
  modalButtonText,
  children,
  modalTitle,
  isCreating,
})=>(
  <div
    className="modal"
    id="add-vendor-modal"
    style={displayModal ? { display: 'block' } : { display: 'none' }} >
    <div className="modal-content">
      <div className="modal-header">
        <div className="header-title">{modalTitle}</div>
        <div>
          <button
            type="button"
            tabIndex={0}
            className="close-icon btn-no-style"
            onClick={closeModal}
          >
            X&nbsp;&nbsp;Close
          </button>
        </div>
      </div>
      <form onSubmit={formValidation}>
        <div>
        {children}
        <div className="modal-footer">
          { isCreating || isUpdating
            ? <div className="modal-loader"><Loader /></div>
            : (
              <div className="button-container">
                <button
                  type="button"
                  className="grayed"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                >
                  {modalButtonText}
                </button>
              </div>
            )}
        </div>
        </div>
      </form>
  </div>
  </div>);

Modal.propTypes = {
  displayModal: PropTypes.bool.isRequired,
  modalTitle: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  formValidation: PropTypes.func.isRequired,
  isCreating: PropTypes.bool,
  children: PropTypes.node.isRequired,
  isUpdating : PropTypes.bool,
  modalButtonText: PropTypes.string.isRequired,
};

export default Modal;