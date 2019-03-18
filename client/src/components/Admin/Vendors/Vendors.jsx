import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { VendorCard } from './VendorCard';
import Loader from '../../common/Loader/Loader';
import VendorTable from './VendorTable';

import {
  fetchVendors,
  suspendVendor,
  createVendor,
  updateVendor
} from '../../../actions/vendorsAction';
import Modal from './Modal';
import SuspendVendorModal from './SuspendVendorModal';
import inputValidation from '../../../helpers/inputValidation';
import EmptyContent from '../../common/EmptyContent';

/**
 *
 *
 * @class Vendors
 * @extends {Component}
 */
export class Vendors extends Component {
  static initialState = () => ({
    id: '',
    name: '',
    address: '',
    contactPerson: '',
    tel: '',
    errors: {},
    displayModal: false,
    displaySuspendModal: false,
    modalContent: {},
    modalTitle: '',
    modalButtontext: ''
  });

  constructor(props) {
    super(props);
    this.state = Vendors.initialState();
  }

  componentDidMount() {
    this.props.fetchVendors();
  }

  /**
   * Handles input fields text changes
   *
   * @param {object} event
   *
   * @memberof AddVendorModal
   *
   * @returns {void}
   */
  onChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  /**
   *
   * @method showAddModal
   *
   *
   * @memberof Vendors
   *
   * @returns {void}
   */
  showAddModal = () => {
    this.setState({
      modalTitle: 'ADD VENDOR',
      modalButtontext: 'Add Vendor',
      displayModal: true
    });
  };

  /**
   *
   * @method showEditModal
   *
   * @param {object} vendor
   *
   * @memberof Vendors
   *
   * @returns {void}
   */
  showEditModal = vendor => {
    const { id, name, address, contactPerson, tel } = vendor;
    this.setState({
      modalTitle: 'EDIT VENDOR',
      modalButtontext: 'Update',
      id,
      name,
      address,
      contactPerson,
      tel,
      displayModal: true
    });
  };

  /**
   * Handles form submission
   *
   * @param {object} vendorDetails
   *
   * @memberof Vendor
   *
   * @returns {void}
   */
  handleSubmit = () => {
    const { id, name, address, contactPerson, tel } = this.state;
    const vendor = {
      name,
      address,
      contactPerson,
      tel,
      isActive: true
    };
    if (this.state.modalTitle === 'ADD VENDOR') {
      this.props.createVendor(vendor).then(() => this.closeModal());
    } else {
      this.props.updateVendor(id, vendor).then(() => this.closeModal());
    }
  };
  /**
   * Handles form validation
   *
   * @param {object} event
   *
   * @memberof AddVendorModal
   *
   * @returns {void}
   */
  formValidation = event => {
    event.preventDefault();
    const err = inputValidation(this.state);
    if (err.isEmpty) {
      this.handleSubmit();
    } else {
      this.setState({ errors: err.errors });
    }
  };

  /**
   *  Clears errors Input field onFocus
   *
   * @member clearErrors
   *
   * @param {void} void
   *
   * @memberof AddVendorModal
   *
   * @returns {void}
   */
  clearErrors = () => {
    this.setState({ errors: {} });
  };

  /**
   *
   * @method suspendVendor
   *
   * @param {Object} vendorId
   *
   * @memberof vendors
   *
   * @returns {void}
   */
  suspendVendor = vendorId => {
    this.props.suspendVendor(vendorId).then(() => this.closeModal());
  };

  /**
   *
   * @method showSuspendModal
   *
   * @param {object} vendor
   *
   * @memberof Vendors
   *
   * @returns {void}
   */
  showSuspendModal = vendor => {
    this.setState({
      displaySuspendModal: true,
      modalContent: vendor
    });
  };

  /**
   *
   * @method closeModal
   *
   * @param {object} vendor
   *
   * @memberof Vendors
   *
   * @returns {void}
   */
  closeModal = () => {
    this.setState(Vendors.initialState());
  };

  render() {
    const {
      isLoading,
      vendors,
      isCreating,
      isSuspending,
      isUpdating
    } = this.props;
    const {
      displayModal,
      displaySuspendModal,
      modalContent,
      name,
      address,
      tel,
      contactPerson,
      errors,
      modalTitle,
      modalButtontext
    } = this.state;

    return (
      <div>
        {isLoading && <Loader />}
        <div className={`${isLoading && 'blurred'} table-wrapper`}>
          <div className="vendors-header">
            <h3 className="vendor-menu">Vendors</h3>
            <button
              type="button"
              name="addVendor"
              className="vendor-button"
              onClick={this.showAddModal}
            >
              Add Vendor
            </button>
          </div>

          {vendors.length > 0 && (
            <VendorTable
              vendors={this.props.vendors}
              showEditModal={this.showEditModal}
              showSuspendModal={this.showSuspendModal}
            />
          )}
          {!isLoading && !vendors.length && (
            <EmptyContent message="No vendor has been added yet" />
          )}
        </div>
        <ToastContainer />
        <Modal
          displayModal={displayModal}
          closeModal={this.closeModal}
          isCreating={isCreating}
          isUpdating={isUpdating}
          handleSubmit={this.handleSubmit}
          onChange={this.onChange}
          name={name}
          address={address}
          tel={tel}
          contactPerson={contactPerson}
          formValidation={this.formValidation}
          errors={errors}
          modalTitle={modalTitle}
          modalButtontext={modalButtontext}
        />
        <SuspendVendorModal
          suspendVendor={this.suspendVendor}
          isSuspending={isSuspending}
          closeModal={this.closeModal}
          modalContent={modalContent}
          displaySuspendModal={displaySuspendModal}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ allVendors }) => ({
  isLoading: allVendors.isLoading,
  isCreating: allVendors.isCreating,
  isSuspending: allVendors.isSuspending,
  isUpdating: allVendors.isUpdating,
  vendors: allVendors.vendors
});

Vendors.propTypes = {
  suspendVendor: PropTypes.func,
  isLoading: PropTypes.bool,
  isCreating: PropTypes.bool,
  isSuspending: PropTypes.bool,
  isUpdating: PropTypes.bool,
  createVendor: PropTypes.func,
  updateVendor: PropTypes.func,
  vendors: PropTypes.arrayOf(PropTypes.shape({})),
  fetchVendors: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  {
    fetchVendors,
    suspendVendor,
    createVendor,
    updateVendor
  }
)(Vendors);
