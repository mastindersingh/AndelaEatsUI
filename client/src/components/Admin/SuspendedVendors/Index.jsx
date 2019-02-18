import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../../common/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import { SuspendCard } from './SuspendCard';
import { 
  fetchSuspensions, unsuspendVendor
} from '../../../actions/admin/suspendedVendorAction';
import EmptyContent from '../../common/EmptyContent';
import UnSuspendModal from './UnSuspendModal';

/**
 * @class SuspendedVendor
 * 
 * 
 * @extends {Component}
 */
export class SuspendedVendor extends Component {  
  state = {
    displayUnsuspendModal: false,
    moadlContent: {}
  }

  componentDidMount() {
    this.props.fetchSuspensions();
  }

   /**
   * 
   * @method unsuspendVendor
   * 
   * @param {Object} vendorId
   * 
   * @memberof SuspendedVendor
   * 
   * @returns {void}
   */
  unsuspendVendor = (vendorId) => {
    this.props.unsuspendVendor(vendorId)
      .then(() => this.closeModal());
  }

  /**
   * 
   * @method unshowSuspendModal
   *
   * @param {object} vendor
   * 
   * @memberof SuspendedVendor
   * 
   * @returns {void}
   */
  showUnSuspendModal = (vendor) => {
    this.setState({
      displayUnsuspendModal: true,
      modalContent: vendor
    });
  }

  /**
   * 
   * @method closeModal
   * 
   * @memberof SuspendedVendor
   * 
   * @returns {void}
   */
  closeModal = () => {
    this.setState({
      displayUnsuspendModal: false
    });
  }

   
  renderVendors = vendors => {
    return vendors.map((vendor, key) => (
      <SuspendCard 
        key={key}
        vendor={vendor}
        showUnSuspendModal={this.showUnSuspendModal}
      />
    ))
  };

  render() {
    const { isLoading, vendors } = this.props;

    const { displayUnsuspendModal, modalContent } = this.state;

    return (
      <Fragment>
        { isLoading && <Loader /> }
        <div className={`${isLoading && 'blurred'} table-wrapper`}>
          <div className="vendors-header">
            <h3 className="vendor-menu">Suspended Vendors</h3>
          </div>
          
          { vendors.length > 0 && (
          <div className="table-header custom-row">
            <div className="custom-col-4">Name</div>
            <div className="custom-col-4">Address</div>
            <div className="custom-col-2">Phone</div>
            <div className="custom-col-3">Contact</div>
            <div className="custom-col-3">Options</div>
          </div>)}
      
          { vendors.length > 0 && this.renderVendors(vendors)}

          { !isLoading && !vendors.length && (
            <EmptyContent message= "No vendor has been suspended yet" />
          )}
          
        </div>
        <ToastContainer />
        <UnSuspendModal 
          unsuspendVendor={this.unsuspendVendor}
          closeModal={this.closeModal}
          modalContent={modalContent}
          displayUnsuspendModal={displayUnsuspendModal}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ suspendVendors }) => ({
  isLoading: suspendVendors.isLoading,
  vendors: suspendVendors.vendors
});

SuspendedVendor.propTypes = {
  fetchSuspensions: PropTypes.func.isRequired,
  unsuspendVendor: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps, 
  { 
    fetchSuspensions,
    unsuspendVendor 
  }
)(SuspendedVendor);