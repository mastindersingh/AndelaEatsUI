/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Loader from '../../common/Loader/Loader';

// Actions
import { createAdminUser, getAllAdminUsers } from '../../../actions/admin/adminUserAction';
import EmptyContent from "../../common/EmptyContent";


/**
 *
 *
 *
 * @class Users
 * @extends {Component}
 */
export class Users extends Component {
  componentDidMount() {
    this.props.getAllAdminUsers();
  }

  /**
   *
   * @param {event} event
   *
   * @returns {void}
   * @memberOf Users
   */
  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      emailAddress: event.target.elements.userEmail.value,
      roleId: 1
    };
    this.props.createAdminUser(userData);
  }

  render() {
    const { adminUsers, loading } = this.props;
    return (
      <div>
        <span className="heading-style">Assign Admin role to a user</span>
        <form className="parent-div" onSubmit={this.handleSubmit}>
          <label htmlFor="userEmail">Email</label>
          <input className="user-form" type="text" id="userEmail" name="userEmail" />
          <button type="submit" className="assign-role">
            Assign Admin Role
          </button>
        </form><br /><br />
        <span className="heading-style">List of Admin Users</span><br /><br />
        {
          loading && (
            <Loader />
          )
        }

        {
          adminUsers.length > 0 && (
            <div className="table-header custom-row">
              <div className="custom-col-5">Name</div>
              <div className="custom-col-5">Email</div>
              <div className="custom-col-2">Options</div>
            </div>
          )
        }

        {
          adminUsers.length > 0 && (
            adminUsers.map((adminUser) => (
              <div key={adminUser.email} className="table-body">
                <div className="table-row">
                  <div className="custom-row">
                    <div className="custom-col-5">{adminUser.name}</div>
                    <div className="custom-col-5">{adminUser.email}</div>
                    <div className="custom-col-2">
                      <span className="delete-color">Revoke</span>
                    </div>
                  </div>
                </div>
              </div>
            )))
        }
        {!loading && adminUsers.length === 0 && <EmptyContent message="No Admin Found" />}
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userEmail: state.user.email,
  message: state.user.message,
  adminUsers: state.user.adminUsers,
  loading: state.user.loading
});

Users.propTypes = {
  createAdminUser: PropTypes.func.isRequired,
  getAllAdminUsers: PropTypes.func.isRequired,
  adminUsers: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { createAdminUser, getAllAdminUsers })(Users);
