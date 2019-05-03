/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  func, shape, arrayOf, bool, any
} from 'prop-types';
import { ToastContainer } from "react-toastify";

import { formatMenuItemDate } from '../../../helpers/menusHelper';
import Loader from "../../common/Loader/Loader";
import EmptyContent from '../../common/EmptyContent';
import VendorRatingModal from './VendorRatingModal';
import { rateVendor } from '../../../actions/vendorsAction';


/**
 *
 *
 * @description MenusTable Component
 *
 * @class MenuTable
 * @extends Component
 */
export class MenuTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  /**
   *
   * @description render side and protein listing
   *
   * @param { Array } itemsAvailable
   * @param { Integer } optionsCanPick
   *
   * @memberof Menus
   *
   * @returns { JSX }
   */
  renderProteinSideItems = (itemsAvailable, optionsCanPick) => (
    <div className="custom-col-6 clearfix">
      <span className="side-pick-count">
        {optionsCanPick}
      </span>
      {this.commaJoinComplementryItems(itemsAvailable.map(item => ({
        value: item.id, label: item.name
      })))}
    </div>
  );

  /**
   *
   *
   * @description joins strings
   *
   * @param { Array } array
   * @param { Stirng } key
   *
   * @returns { String }
   *
   * @memberof Menus
   */
  commaJoinComplementryItems = (array) => (
    array.map(item => item.label).join(', ')
  );

  /**
   * @description generate menu rows
   *
   * @returns { Array }
   *
   * @memberof MenuTable
   */
  renderRows = () => {
    const { menuList } = this.props.menus;
    return menuList.map(menuItem => {
      const {
        id,
        mainMeal,
        sideItems,
        proteinItems,
        allowedSide,
        allowedProtein,
        date,
        vendorEngagementId
      } = menuItem;
      const vendorList = this.props.engagements
        ? this.props.engagements : [];
      const menuVendor = vendorList
        .filter(vendor => vendor.id === vendorEngagementId)[0];
      return (
        <div key={id} className="ct-row">
          <div className="ct-wrap">
            <div className="custom-col-5">
              {formatMenuItemDate(date)}
            </div>
            <div className="custom-col-5">
              {menuVendor ? menuVendor.vendor.name : '---------'}
            </div>
            <div className="custom-col-4">{mainMeal.name}</div>
            {this.renderProteinSideItems(
              proteinItems,
              allowedProtein
            )}

            {this.renderProteinSideItems(
              sideItems,
              allowedSide
            )}

            {!this.props.preview ? (
              <div className="custom-col-5 option">
                <div onClick={() => this.props.showAddModal(menuItem, true)}>
                  <span className="edit-menu">Edit</span>
                </div>

                <div onClick={() => this.props.showDeleteModal(menuItem)}>
                  <span className="delete-menu">Delete</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      );
    });
  }

  /**
   * @method toggleVendorRatingModal
   *
   * @memberOf MenuTable
   *
   * @return {void}
   */
  toggleVendorRatingModal = () => {
    this.setState((prevState) => ({ show: !prevState.show }));
  }

  renderMenuBody = () => {
    const { isFetching } = this.props;
    const isDisabled = isFetching ? 'btn-disabled' : '';
    const buttonText = isFetching ? 'Rating Vendor...' : 'rate vendor';
    return (
      <React.Fragment>
        {this.props.preview
          && (
            <div className="vendors-header">
              <h3 className="vendor-menu menu-header">Available Menus</h3>
              <button
                type="button"
                name="rateVendor"
                disabled={isFetching}
                className={`engagement-button rate-vendor-button ${isDisabled}`}
                onClick={this.toggleVendorRatingModal}
              >
                {buttonText}
              </button>
            </div>
          )
        }
        <div className="custom-table">
          {this.props.menus.menuList.length
            ? (
              <React.Fragment>
                <div className="ct-header">
                  <div className="custom-col-5">Date</div>
                  <div className="custom-col-5">Vendor</div>
                  <div className="custom-col-4">Main Meal</div>
                  <div className="custom-col-6">Protein</div>
                  <div className="custom-col-6">Side</div>
                  {!this.props.preview
                    ? <div className="custom-col-5">Options</div>
                    : null}
                </div>
                <div className="ct-body">{this.renderRows()}</div>
              </React.Fragment>
            ) : <EmptyContent message="No menus within the seleted date range" />}
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { isLoading } = this.props.menus;
    return (
      <React.Fragment>
        <ToastContainer />
        <VendorRatingModal
          rateVendor={this.props.rateVendor}
          engagements={this.props.engagements}
          displayModal={this.state.show}
          closeModal={this.toggleVendorRatingModal}
        />
        <div className="menu-table-row">
          {isLoading
            ? <Loader />
            : this.renderMenuBody()
          }
        </div>
      </React.Fragment>

    );
  }
}

MenuTable.propTypes = {
  menus: shape({
    menuList: arrayOf(shape({})),
    error: shape({
      status: bool,
      message: any
    })
  }),
  preview: bool,
  showAddModal: func,
  showDeleteModal: func,
  engagements: arrayOf(shape({})),
  rateVendor: func,
  isFetching: bool,
};

export const mapStateToProps = (state) => ({
  engagements: state.allEngagements.engagements.engagements,
  isFetching: state.allVendors.isLoading
});

export default connect(mapStateToProps, { rateVendor })(MenuTable);
