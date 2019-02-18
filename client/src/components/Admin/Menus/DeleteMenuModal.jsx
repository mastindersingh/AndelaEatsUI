import React from 'react';
import {
  func, string, number, bool, shape
} from 'prop-types';

const DeleteMenuModal = ({
  display, closeModal, menuDetails: { id, mainMeal }, deleteMenu, deleting
}) => (
  <div
    className="modal"
    id="delete-menu-modal"
    style={(display) ? { display: 'block' } : { display: 'none' }}
  >
   { display ? 
    (
      <div className="modal-content">
        <div className="modal-header">
          <div className="header-title">Delete Menu</div>
        </div>
        <h3>Permanently delete {mainMeal.name}</h3>
        <span className="warning">This cannot be undone</span>
        <div className="modal-footer">
          <button 
            className="grayed upper" 
            type="button"
            disabled={deleting}
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="fill upper"
            id="delete-meal" 
            type="button" 
            tabIndex={0}
            disabled={deleting}
            onClick={() => deleteMenu(id)}
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

DeleteMenuModal.propTypes = {
  closeModal: func.isRequired,
  deleteMenu: func.isRequired,
  deleting: bool.isRequired,
  display: bool.isRequired
};

export default DeleteMenuModal;
