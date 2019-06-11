import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import RolesCard from './UserRoleCard';
import Loader from '../../common/Loader/Loader';
import formatPermisionDropdown from '../../../helpers/formatPermisionDropdown';
import {
  getAllUserRoles,
  createUserRole,
  deleteUserRole,
  editUserRole,
  deleteUserPermision,
  createUserPermision,
  getRolePermisions,
  getAllPermisions
} from '../../../actions/admin/adminUserAction';
import DeleteModal from '../../common/DeleteModal/DeleteModal';
import Modal from './Modal';
import PermissionModal from './PermissionModal';

// eslint-disable-next-line valid-jsdoc
/**
 * @class UserRoles
 * @extends {Component}
 */
export class UserRoles extends Component {
  // eslint-disable-next-line react/no-unused-state
  state = {
    roleId: '',
    displayModal: false,
    displayDeleteModal: false,
    displayPermissionModal: false,
    modalContent: {},
    modalTitle: '',
    modalButtontext: '',
    // eslint-disable-next-line react/no-unused-state
    name: '',
    selectedOption: {},
    permisions: [],
    allPermisions: [],
    permisionName: '',
    title: '',
  };

  componentDidMount() {
    this.props.getAllUserRoles();
  }

  /**
   *
   * @method showAddModal
   *
   *
   * @memberof Engagements
   *
   * @returns {void}
   */
  showAddModal = () => {
    this.setState({
      displayModal: true,
      modalTitle: 'ADD USER ROLE',
      modalButtontext: 'Add ROLE'
    });
  };

  /**
   *
   * @method closeModal
   *
   * @memberof Engagements
   *
   * @returns {void}
   */
  closeModal = () => {
    this.setState({
      displayModal: false,
      displayDeleteModal: false,
      displayPermissionModal: false,
      name: '',
      permision: '',
      roleId: '',
      selectedOption: {},
      title: '',
    });
  };

  /**
   *
   * @method showDeleteModal
   *
   * @param {object} role
   *
   * @memberof roles
   *
   * @returns {void}
   */
  showDeleteModal = role => {
    const { name } = role;
    
    this.setState({
      displayDeleteModal: true,
      modalContent: role,
      title: name,
    });
  };

  deletePermision = (permisionId) => {
    const { roleId } = this.state;
    this.props.deleteUserPermision(permisionId)
      .then(() => this.fetchPermisions(roleId));
  };

  /**
     *
     * @method fetchPermisions
     *
     * @param {object} roleId
     *
     * @string Decided to use admin actions to avoid duplication in the backend.
     *
     * @returns {void}
   */
  fetchPermisions = roleId => {
    const adminId = 1;
    this.props.getRolePermisions(roleId)
      .then(() => {
        this.setState({ permisions: this.props.permisions });
      });
    this.props.getAllPermisions(adminId)
      .then(() => { this.setState({ allPermisions: this.props.allpermisions }); });
  };

  /**
   *
   * @method showPermisionModal
   *
   * @param {object} role
   *
   * @memberof roles
   *
   * @returns {void}
   */
  showPermisionModal = role => {
    const { id, name } = role;
    
    const { permisions } = this.props;
    this.fetchPermisions(id);
    this.setState({
      displayPermissionModal: true,
      modalTitle: 'ADD ROLE PERMISION',
      modalButtontext: 'ADD',
      roleId: id,
      permisionName: name,
    });
  };

  /**
   * Handles form submission
   *
   * @memberof Permisions
   *
   * @returns {void}
   */

  handleAddPermision = event => {
    event.preventDefault();
    const { roleId, selectedOption } = this.state;
    const { value, label } = selectedOption;

    const newPermision = {
      role_id: roleId,
      name: value,
      keyword: label
    };
    this.props.createUserPermision(newPermision).then(() => this.closeModal());
  }

  /**
   * Handles form submission
   *
   * @memberof Roles
   *
   * @returns {void}
   */

  handleSubmit = event => {
    event.preventDefault();
    const {
      roleId,
      name,
      modalTitle
    } = this.state;

    if (modalTitle === 'ADD USER ROLE') {
      if (name !== '') {
        const newRole = {
          name,
        };
        this.props.createUserRole(newRole).then(() => this.closeModal());
      } else {
        toast.error('Role name is missing', {
          position: toast.POSITION.TOP_CENTER
        });
      }
    } else {
      this.props
        .editUserRole(roleId, { name })
        .then(() => this.closeModal());
    }
  }

  /**
   *
   * @method deleteRole
   *
   * @param {Object} roleId
   *
   * @memberof vendors
   *
   * @returns {void}
   */

  deleteRole = (roleId) => {
    this.props.deleteUserRole(roleId).then(() => this.closeModal());
  };

  /**
   *
   * @method showEditModal
   *
   * @param {object} role
   *
   * @memberof Engagements
   *
   * @returns {void}
   */
  showEditModal = role => {
    const { id, name } = role;
    
    this.setState({
      roleId: id,
      name,
      displayModal: true,
      modalTitle: 'EDIT',
      modalButtontext: 'Update',
      title: name,
    });
  };

  /**
   * Handles select input changes
   *
   * @param {object} event
   *
   * @memberof Permisions
   *
   * @returns {void}
   */

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  /**
   * Handles onChange of the input changes
   *
   * @param {object} event
   *
   * @memberof Permisions
   *
   * @returns {void}
   */
  
  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  renderRoles = roles => roles.map((role, key) => (
    <RolesCard
        // eslint-disable-next-line react/no-array-index-key
      key={key}
      role={role}
      showDeleteModal={this.showDeleteModal}
      showPermisionModal={this.showPermisionModal}
      showEditModal={this.showEditModal}
      handleNoEdit={this.handleDisplayNoEdit}
    />
  ));

  render() { 
    const { roleId, permision } = this.state;
    const { roles, roleLoading, permisionLoading } = this.props;
    const {
      displayModal,
      modalTitle,
      modalButtontext,
      name,
      selectedOption,
      displayDeleteModal,
      displayPermissionModal,
      modalContent,
      permisions,
      allPermisions,
      permisionName,
      title
    } = this.state;

    const PermisionData = formatPermisionDropdown(allPermisions);
    return ( 
      <Fragment>
        <div>
          {
            roleLoading && (
            <Loader />
            )
        }
          <div className="vendors-header">
            <h3 className="vendor-menu">Roles Management</h3>
            <button
              type="button"
              name="addEngagement"
              className="engagement-button"
              onClick={this.showAddModal}
            >
              Add User Role
            </button>
          </div>
          <div className="table-header custom-row">
            <div className="custom-col-3">User Roles</div>
            <div className="custom-col-3">Created On</div>
            <div className="custom-col-2">Updated On</div>
            <div className="custom-col-2">Permissions</div>
            <div className="custom-col-2">Role Options</div>
          </div>
          {roles.length > 0 && this.renderRoles(roles)}
        </div>
        <ToastContainer />
        <Modal
          displayModal={displayModal}
          closeModal={this.closeModal}
          handleSubmit={this.handleSubmit}
          onChange={this.onChange}
          name={name}
          editTitle={title}
          modalTitle={modalTitle}
          modalButtontext={modalButtontext}
        />
        <DeleteModal
          deleteItem={this.deleteRole}
          displayDeleteModal={displayDeleteModal}
          closeModal={this.closeModal}
          modalContent={modalContent}
          item={title}
        /> 
        <PermissionModal
          displayPermissionModal={displayPermissionModal}
          closeModal={this.closeModal}
          permision={selectedOption}
          handleChange={this.handleChange}
          modalContent={modalContent}
          modalButtontext={modalButtontext}
          item="Permissions"
          data={permisions}
          deleteItem={this.deletePermision}
          handleAddPermision={this.handleAddPermision}
          fetchPermisions={this.fetchPermisions}
          loading={permisionLoading}
          allPermisionsData={PermisionData}
          name={permisionName}
        /> 
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  roles: user.roles,
  permisions: user.permisions,
  roleLoading: user.loading_roles,
  permisionLoading: user.loading_permisions,
  allpermisions: user.all_permisions

});

UserRoles.propTypes = {
  getAllUserRoles: PropType.func.isRequired,
  getRolePermisions: PropType.func.isRequired,
  getAllPermisions: PropType.func.isRequired,
  createUserRole: PropType.func.isRequired,
  deleteUserRole: PropType.func.isRequired,
  editUserRole: PropType.func.isRequired,
  deleteUserPermision: PropType.func.isRequired,
  createUserPermision: PropType.func.isRequired,
  roles: PropType.array,
  permisions: PropType.array,
  allpermisions: PropType.array,
  roleLoading: PropType.bool,
  permisionLoading: PropType.bool
};

UserRoles.defaultProps = {
  roles: [],
  permisions: [],
};

export default connect(mapStateToProps, {
  getAllUserRoles,
  createUserRole,
  deleteUserRole,
  editUserRole,
  deleteUserPermision,
  createUserPermision,
  getRolePermisions,
  getAllPermisions
})(UserRoles);
