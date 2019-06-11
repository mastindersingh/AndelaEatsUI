import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../common/Modal';
import Loader from '../../common/Loader/Loader';
import Input from '../../common/FormInputs';
import SelectBox from '../../common/SelectBox/SelectBox';

const userModal = (
  { 
    showModal, hideModal, loading, user, onChange, handleSubmit, errors, 
    roles
  }) => {
  const options = roles
    .map(option => ({ value: option, name: option.name.toUpperCase(), id: option.id }));
  const role = roles
    .find(item => item.id === (user.roleId ? Number(user.roleId) : user.userRoles[0].id));
  return (
    <Fragment>
      <Modal 
        displayModal={showModal} 
        closeModal={hideModal} 
        formValidation={handleSubmit} 
        content={user}
        loading={loading}
        modalButtonText={!user.id ? 'ADD USER' : 'UPDATE USER'}
        modalTitle={!user.id ? 'Add User' : 'Edit User'}
      >
        <Fragment>
          <Input
            id="firstName"
            name="firstName"
            value={user && user.firstName}
            onChangeHandler={onChange}
            error={errors && errors.firstName}
            label="First Name"
            type="text"
          />
          <Input
            id="lastName"
            name="lastName"
            value={user && user.lastName}
            onChangeHandler={onChange}
            error={errors && errors.lastName}
            label="Last Name"
            type="text"
          />
        
          <div className="form-field-set">
            <SelectBox 
              label="Role" 
              options={options} 
              value={role && role.id}
              onChange={onChange}
              type="roleId"
            />
          </div>
        </Fragment>
      </Modal>
    </Fragment>
  );
};


userModal.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  showModal: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  hideModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
export default userModal;
