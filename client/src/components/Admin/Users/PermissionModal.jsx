import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Loader from '../../common/Loader/Loader';
import Chips from '../../common/Chip';

const PermissionModal = ({
  handleChange,
  closeModal,
  permision,
  displayPermissionModal, 
  modalTitle,
  modalButtontext,
  data,
  deleteItem,
  handleAddPermision,
  fetchPermisions,
  loading,
  allPermisionsData,
  name
}) => (
  <div 
    className="modal"
    id="add-vendor-modal" 
    style={displayPermissionModal ? { display: 'block' } : { display: 'none' }}
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
      <form onSubmit={handleAddPermision}>
        <div>
          <div className="form-field-set">
            <div className="form-field-set">
              <label htmlFor="soup">
                <span className="permision-color">
                  {name}
                </span>
                Permisions 
              </label>
              <Select
                onChange={handleChange}
                isSearchable
                value={permision}
                options={allPermisionsData}
                placeholder="select Permision"
              />
            </div>
            <div>
              <br />
              {!loading && data.length > 0 ? '' : `No Permisions for '${name}'!` }
              {!loading ? data.map(value => <Chips name={value.name} id={value.id} deleteItem={deleteItem} key={value.id} />) : <Loader />}
            </div>
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
  
PermissionModal.propTypes = {
  displayPermissionModal: PropTypes.bool.isRequired,
  handleChange: PropTypes.func,
  closeModal: PropTypes.func,
  deleteItem: PropTypes.func,
  fetchPermisions: PropTypes.func,
  permision: PropTypes.object,
  modalTitle: PropTypes.string,
  name: PropTypes.string,
  modalButtontext: PropTypes.string,
  errors: PropTypes.shape({}),
  data: PropTypes.array,
  allPermisionsData: PropTypes.array,
  handleAddPermision: PropTypes.func,
  loading: PropTypes.bool
};
 

export default PermissionModal;
