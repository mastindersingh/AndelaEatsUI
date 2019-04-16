/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import DeleteModal from '../../common/DeleteModal/DeleteModal';
import Loader from '../../common/Loader/Loader';
import UserCard from './UserCard';
import UserModal from './UserModal';
import { fetchUsers, createUser, updateUser, deleteUser, fetchUserRoles }
  from '../../../actions/admin/adminUserAction';
import inputValidation from '../../../helpers/inputValidation';
import EmptyContent from '../../common/EmptyContent';

const initialUser = {
  firstName: '',
  lastName: '',
  roleId: 11
}
/**
 * Class representing Users
 * @extends Component
 */
export class Users extends Component {

  state = {
    showDeleteModal: false,
    showModal: false,
    errors: null,
    user: initialUser
  }

  componentDidMount() {
    this.props.fetchUsers()
    .then(() => this.props.fetchUserRoles())
  }

   /**
   *
   *
   * @description handle onChage event
   *
   * @param { Object } event
   *
   * @returns { undefined }
  */
 onChange = event => {
  const { name, value } = event.target;
  const oldUser = { ...this.state.user };
  oldUser[name] = value;
  this.setState(prevState => ({
    user: oldUser,
    errors: {
      ...prevState.errors,
      [name] : ''
    },
  }));
};

  /**
   * 
   * @method formValidation
   * 
   * @memberof Users
   * 
   * @param {object} event
   * 
   * @returns {void}
   */
  formValidation = () => {
    const errorObject = {
      firstName: this.state.user.firstName,
      lastName: this.state.user.lastName
    };
    const err = inputValidation(errorObject);
    if (!err.isEmpty) {
      this.setState({ errors: err.errors });
      return true;
    }
    return false
    
  }

  /**
   *
   * @description handle onSubmit event
   *
   * @param { Object } event
   *
   * @returns { undefined }
   */
  onSubmit = (event) => {
    event.preventDefault();
    const { user } = this.state;
    const userData = {
      slackId: user.slackId,
      firstName: user.firstName,
      lastName: user.lastName,
      userId: user.userId,
      roleId: user.roleId,
      id: user.id
    }
    const error = this.formValidation();
    if (!error) {
      const method = !user.id ? this.props.createUser : this.props.updateUser;
      return method(userData).then(() => {
        this.showModal(user);
        this.setState({
          user: user
        })
      });
    }
  }

  deleteUser = (user) => {
    this.props.deleteUser(user).then(() => {
      this.displayDeleteModal(this.state.user)
    })
  }
  displayDeleteModal = user => {
    this.setState(prevState => ({
      showDeleteModal: !prevState.showDeleteModal,
      user
    }));
  };

  showModal = (user)=> {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      user,
      errors: {}
    }));
  };

  closeModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      user: initialUser
    }));
  }

  render() {
    const { showDeleteModal, showModal, user, errors } = this.state;
    const {loading, roles, users } = this.props;
    return (
      <React.Fragment>
        <ToastContainer />
        { loading &&  <Loader/> } 
          <DeleteModal
          closeModal={this.displayDeleteModal}
          displayDeleteModal={showDeleteModal}
          item="User"
          deleteItem={this.deleteUser}
          modalContent={this.state.user}
          isDeleting={loading}
          />
          <UserModal 
            onChange={this.onChange} 
            showModal={showModal} 
            hideModal={this.closeModal} 
            user={ user } 
            handleSubmit={this.onSubmit}
            errors={errors}
            loading={loading}
            roles ={roles}
          />
        <div className={`${loading && 'blurred'} users-container`}>
        <button disabled={loading} onClick={() => this.showModal(user)} type="submit" className="button-right">
            Add User
        </button>
        <div className="top">
          {users.length ? users.map(user => <UserCard 
          showModal={this.showModal}
          key={user.id}
          user={user} displayDeleteModal={this.displayDeleteModal} 
          />) : <EmptyContent message="No Users Added Yet!" />}
        </div>
      </div>
      </React.Fragment>
    );
  }
}
export const mapStateToProps = ({ users }) => ({
  loading: users.loading,
  users: users.users,
  roles: users.roles
});
export default connect(mapStateToProps, {fetchUsers, createUser, updateUser, deleteUser, fetchUserRoles})(Users);
