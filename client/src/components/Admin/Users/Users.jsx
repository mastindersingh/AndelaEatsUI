import React, { Component } from "react";
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../common/Loader/Loader';
import PropTypes from 'prop-types';
import Select from 'react-select';

// Actions
import { createAdminUser } from '../../../actions/admin/adminUserAction';


export class Users extends Component {

  componentWillReceiveProps(nextProps) {
    console.log('Next Props: ', nextProps);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let userData = {
      emailAddress: event.target.elements.userEmail.value,
      roleId: 1
    };
    this.props.createAdminUser(userData);
  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="userEmail">Email</label>
          <input  className="user-form" type="text" id="userEmail" name="userEmail"/>
          <button type="submit" className="assign-role">
            Assign Admin Role
          </button>
        </form><br/><br/>
        <ToastContainer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userEmail: state.user.email,
    message: state.user.message
  };
}

Users.propTypes = {
  createAdminUser: PropTypes.func.isRequired,
  userEmail: PropTypes.string,
};

export default connect(mapStateToProps, { createAdminUser })(Users);
