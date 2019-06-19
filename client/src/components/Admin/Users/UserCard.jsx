import React from 'react';
import PropTypes from 'prop-types';
import defaultUserImage from '../../../assets/images/defaultUser.svg';

const userCard = ({ user: userData, displayDeleteModal, showModal }) => (
  <div className="user-container">
    <div className="user-info">
      <div className="wrapper">
        <img src={userData.imageUrl || defaultUserImage} alt="user" />
        <div>
          <p>{userData.firstName} {userData.lastName}</p>
          <span className="user-role">
            {userData.userRoles ? userData.userRoles[0].name : 'None'}
          </span>
        </div>
      </div>
      <div className="icons">
        <i onClick={() => showModal(userData)} className="fas fa-edit">
          {" "}
        </i>
        <i 
          onClick={() => displayDeleteModal(userData)}
          className="fas fa-trash" 
        /> 
      </div>
    </div>
  </div>
);

userCard.propTypes = {
  user: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  displayDeleteModal: PropTypes.func.isRequired
};
export default userCard;
