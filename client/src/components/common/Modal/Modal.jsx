import React from 'react';

import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';


const modal = ({ 
  loading, content, item, hideModal, handleSubmit, show, children
}) => (
  <div
    className="modal"
    id="add-modal"
    style={show ? { display: 'block' } : { display: 'none' }}
  >
    <div className="modal-content">
      {loading && <Loader />}
      <div className="modal-header">
        <div className="header-title">
          {content && content.id ? 'EDIT' : 'ADD'} {item}
        </div>
        <div className="main">
          <Button
            classes="close-icon btn-no-style"
            func={hideModal}
          >
            X&nbsp;&nbsp;Close
          </Button>
        </div>
      </div>
      {children}
      <div className="modal-footer">
        <Button
          classes="grayed"
          func={hideModal}
        >
          Cancel
        </Button>
        <Button 
          func={handleSubmit} 
          type="submit"
          classes="submit"
        >
          {content && content.id ? 'Update' : 'Add'} {item}
        </Button>
      </div>
    </div>
  </div>
);

modal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.array,
  hideModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  item: PropTypes.string.isRequired,
  content: PropTypes.object
}; 
export default modal;
