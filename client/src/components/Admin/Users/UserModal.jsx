import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../common/Modal/Modal';
import Loader from '../../common/Loader/Loader';
import Input from '../../common/Input/Input';
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
        show={showModal} 
        hideModal={hideModal} 
        handleSubmit={handleSubmit} 
        content={user}
        loading={loading}
        item="USER"
      >
        {loading && <Loader />}
        <main>
          <Input
            id="firstName"
            name="firstName"
            value={user && user.firstName}
            onChange={onChange}
            errorName={errors && errors.firstName}
            inputName="First Name"
          />
          <Input
            id="lastName"
            name="lastName"
            value={user && user.lastName}
            onChange={onChange}
            errorName={errors && errors.lastName}
            inputName="Last Name"
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
        </main>
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
