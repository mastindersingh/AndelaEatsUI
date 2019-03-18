import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VendorCard } from './VendorCard';

class VendorTable extends Component {
  /**
   * @method renderVendor
   *
   * @memberof Vendors
   *
   * @param {object} vendor
   *
   * @returns {JSX}
   */
  renderVendor = vendor => {
    const rating = Math.ceil(Math.random() * 5);
    return (
      <VendorCard
        key={vendor.id}
        vendor={vendor}
        rating={rating}
        showSuspendModal={this.showSuspendModal}
        showEditModal={this.props.showEditModal}
        edit={this.props.edit}
      />
    );
  };
  render() {
    return (
      <React.Fragment>
        <div className="table-header custom-row table-align">
          <div className="custom-col-4">Name</div>
          <div className="custom-col-2">Contacts</div>
          <div className="custom-col-3">Rating</div>
          <div className="custom-col-3">Options</div>
        </div>
        {this.props.vendors.map(vendor => this.renderVendor(vendor))}
      </React.Fragment>
    );
  }
}

export default VendorTable;
