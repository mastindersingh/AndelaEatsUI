import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Modal = ({
  onChange,
  closeModal,
  name,
  editTitle,
  handleSubmit,
  displayModal, 
  modalTitle,
  modalButtontext
}) => (
  <div 
    className="modal"
    id="add-vendor-modal" 
    style={displayModal ? { display: 'block' } : { display: 'none' }}
  >
    <div className="modal-content">
      <div className="modal-header">
        <div className="header-title">{modalTitle} &nbsp;{editTitle}</div>
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
      <form onSubmit={handleSubmit}>
        <div>
          <div className="form-field-set">
            <label htmlFor="name">Name
              <input
                id="name"
                className="input"
                name="name"
                onChange={onChange}
                value={name}
              />
            </label>
          </div>
          <div className="modal-footer">
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
                {modalButtontext}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
);
  
Modal.propTypes = {
  displayModal: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  closeModal: PropTypes.func,
  handleSubmit: PropTypes.func,
  name: PropTypes.string,
  editTitle: PropTypes.string,
  modalTitle: PropTypes.string,
  modalButtontext: PropTypes.string,
  errors: PropTypes.shape({}),
};
 

export default Modal;
