import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../common/Loader/Loader';


const Modal = ({
  onChange,
  closeModal,
  name, 
  address, 
  tel, 
  contactPerson, 
  errors,
  displayModal, 
  isCreating,
  isUpdating,
  formValidation,
  clearErrors,
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
          <div className="form-field-set">
            <label htmlFor="name">Name
              <input
                id="name"
                className="input"
                name="name"
                onChange={onChange}
                onFocus={clearErrors}
                value={name}
              />
            </label>
            <span className="form-error">
              {errors.name ? errors.name : ""}
            </span>
          </div>
          <div className="form-field-set">
            <label htmlFor="address">Address
              <input
                id="address"
                className="input"
                name="address"
                onChange={onChange}
                onFocus={clearErrors}
                value={address}
              />
            </label>
            <span className="form-error">
              {errors.address ? errors.address : ""}
            </span>
          </div>
          <div className="form-field-set">
            <label htmlFor="tel">Phone
              <input
                id="tel"
                className="input"
                name="tel"
                onChange={onChange}
                onFocus={clearErrors}
                value={tel}
              />
            </label>
            <span className="form-error">
              {errors.tel}
            </span>
          </div>
          <div className="form-field-set">
            <label htmlFor="contactPerson">Contact Person
              <input
                id="contactPerson"
                className="input"
                name="contactPerson"
                onChange={onChange}
                onFocus={clearErrors}
                value={contactPerson}
              />
            </label>
            <span className="form-error">
              {errors.contactPerson ? errors.contactPerson : ""}
            </span>
          </div>
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
                    {modalButtontext}
                  </button>
                </div>
              )}
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
  name: PropTypes.string,
  address: PropTypes.string, 
  tel: PropTypes.string,
  contactPerson: PropTypes.string,
  modalTitle: PropTypes.string,
  modalButtontext: PropTypes.string,
  errors: PropTypes.shape({}),
  isCreating: PropTypes.bool,
  isUpdating: PropTypes.bool,
  formValidation: PropTypes.func,
  clearErrors: PropTypes.func,
};
 

export default Modal;
