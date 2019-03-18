import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { format, addDays } from 'date-fns';

import Loader from '../common/Loader/Loader';
import EmptyContent from '../common/EmptyContent';
import MealCard from '../MealCard/MealCard';
import RatingModal from '../MealCard/RatingModal';
import { toast, ToastContainer } from 'react-toastify';

import { fetchOrders, createRating } from '../../actions/ordersAction';

class UserOrders extends Component {
  state = {
    start: addDays(new Date(), -7),
    end: addDays(new Date(), 7),
    showRatingModal: false,
    newRating: 0,
    textArea: ''
  };

  /**
   * Loads data when component mounts
   *
   * @memberof UserOrders
   *
   * @returns null
   */
  componentDidMount() {
    const { start, end } = this.state;
    const startDate = format(start, 'YYYY-MM-DD');
    const endDate = format(end, 'YYYY-MM-DD');

    this.props.fetchOrders(startDate, endDate);
  }

  /**
   * Display a modal to rate a meal
   *
   * @param {object} meal
   * @memberof Orders
   *
   * @returns {void}
   */
  showRatingModal = meal => {
    this.setState({
      modalContent: meal,
      showRatingModal: true
    });
  };

  /**
   * Submit ratings
   *
   * @memberof Orders
   *
   * @returns {void}
   */
  handleRatingSubmit = event => {
    event.preventDefault();
    const { newRating, textArea, modalContent } = this.state;

    const ratingDetails = {
      channel: 'web',
      comment: textArea,
      rating: newRating,
      orderId: modalContent.id
    };

    if (newRating && textArea) {
      this.props.createRating(ratingDetails).then(() => {
        toast.success('Your Feedback has been noted');
        this.hideModal();
      });
    } else {
      if (newRating && !textArea) {
        document.getElementsByClassName('validate-rating')[1].style.display =
          'block';
        document.getElementsByClassName('comment-textarea')[0].style.border =
          '1px solid red';
      } else if (!newRating && textArea) {
        document.getElementsByClassName('validate-rating')[0].style.display =
          'block';
      } else {
        document.getElementsByClassName('validate-rating')[0].style.display =
          'block';
        document.getElementsByClassName('validate-rating')[1].style.display =
          'block';
        document.getElementsByClassName('comment-textarea')[0].style.border =
          '1px solid red';
      }
    }
  };

  /**
   * Handles input changes
   *
   * @param {*} {target}
   *
   * @memberof UserOrders
   *
   * @returns {void}
   */
  onChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };

  /**
   * Hide modal
   *
   * @memberof Orders
   *
   * @returns {void}
   */
  hideModal = () => {
    this.setState({
      showRatingModal: false,
      textArea: ''
    });
  };

  /**
   * Change ratings stars
   *
   * @memberof Orders
   *
   * @returns {void}
   */
  ratingChanged = newRating => {
    this.setState({
      newRating
    });
  };

  render() {
    const { orders, isLoading } = this.props;
    const { showRatingModal, modalContent, newRating, textArea } = this.state;
    return (
      <React.Fragment>
        {isLoading && <Loader />}

        {Array.isArray(orders) && orders.length > 0 ? (
          <React.Fragment>
            <ToastContainer />
            <div className={`order-history ${isLoading && 'blurred'}`}>
              <div className="container">
                {orders.map(meal => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    showModal={this.showModal}
                    showRatingModal={this.showRatingModal}
                  />
                ))}
              </div>
              {orders.length > 15 && (
                <Pagination
                  locale={{ items_per_page: 'Items' }}
                  onChange={this.handlePageChange}
                  current={+orders.currentPage}
                  pageSize={9}
                  total={+orders.totalRecords}
                  className="pagination"
                  showTotal={this.showTotal}
                />
              )}
              <RatingModal
                displayModal={showRatingModal}
                hideModal={this.hideModal}
                modalContent={modalContent}
                ratingChanged={this.ratingChanged}
                newRating={newRating}
                textArea={textArea}
                onChange={this.onChange}
                handleSubmit={this.handleRatingSubmit}
              />
            </div>
          </React.Fragment>
        ) : (
          <EmptyContent message="No orders available at the moment" />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.orders.isLoading,
  orders: state.orders.orders.filter(order => order.orderStatus !== 'booked')
});

export default connect(
  mapStateToProps,
  { fetchOrders, createRating }
)(UserOrders);
