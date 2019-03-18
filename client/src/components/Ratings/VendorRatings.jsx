import React, { Component } from 'react';
import moment from 'moment';

import { fetchOrders } from '../../actions/ordersAction';
import { fetchVendors } from '../../actions/vendorsAction';

import { fetchVendorEngagements } from '../../actions/admin/menuItemsAction';

import RatingModal from '../MealCard/RatingModal';
import Loader from '../common/Loader/Loader';
import VendorTable from '../Admin/Vendors/VendorTable';

import { connect } from 'react-redux';
class VendorRatings extends Component {
  state = {
    showDropDown: false,
    vendor: '',
    startDate: moment(),
    endDate: moment().add(1, 'days'),
    showRatingModal: false
  };

  componentDidMount() {
    this.props.fetchVendors();
    this.props.fetchVendorEngagements().then(() => {
      this.props.engagements.filter(
        item => item.endDate > this.state.startDate
      );
    });
  }

  handleShowRatingModal = () => {
    this.setState(prevState => {
      return {
        showRatingModal: !prevState.showRatingModal
      };
    });
  };
  render() {
    const { showRatingModal } = this.state;
    return (
      <React.Fragment>
        {this.props.isLoading && <Loader />}
        <div className={`user-ratings ${this.props.isLoading && 'blurred'}`}>
          {showRatingModal && (
            <RatingModal
              displayModal={showRatingModal}
              hideModal={this.handleShowRatingModal}
            />
          )}
          <VendorTable
            vendors={this.props.vendors}
            edit={true}
            showEditModal={this.handleShowRatingModal}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders,
  vendors: state.allVendors.vendors,
  isLoading: state.allVendors.isLoading,
  engagements: state.allEngagements.engagements.engagements
});

const actionCreators = {
  fetchOrders,
  fetchVendors,
  fetchVendorEngagements
};

export default connect(
  mapStateToProps,
  actionCreators
)(VendorRatings);
