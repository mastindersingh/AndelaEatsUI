import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

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
          <Fragment>
            <Button
              classes="grayed upper"
              loading={isDeleting}
              onClickHandler={() => closeModal()}
              name="close-btn"
              btnText="Cancel"
            />

            <Button
              className="fill--delete upper delete-vendor"
              loading={isDeleting}
              onClickHandler={() => deleteItem(modalContent.id)}
              btnText="Delete"
            />
          </Fragment>
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
