import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination/lib';
import OrderCard from './OrderCard';
import EmptyContent from '../../common/EmptyContent';
import Loader from '../../common/Loader/Loader';
import { fetchOrders } from '../../../actions/admin/ordersAction';
import OrdersHeader from './OrdersHeader';
import svg from '../../../assets/images/download-icon.svg';

/**
 *
 * @class Orders
 * @extends {Component}
 */
export class ExportOrders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  /**
   * @method renderOrder
   *
   * @memberof ExportOrders
   *
   * @param {object} order
   *
   * @returns {JSX}
   */
  renderOrder = (order) => (
    <OrderCard showStatus={false} key={order.id} order={order} />
  );

  render() {
    const {
      orderHistory: { orders },
      isLoading } = this.props;

    if (orders && orders.length === 0) {
      return (
        <div id="admin-orders-no-content">
          <EmptyContent
            message="No meal has been booked in the next 24 hours"
          />
        </div>
      );
    }

    return (
      <section className="admin-orders">
        { isLoading && <Loader /> }
        <div className={`${isLoading && 'blurred'}`}>
          
          { orders && (<OrdersHeader
            title="Last 24 hours orders"
            type={2}
            ordersCount={orders.length}
            redirectToExport={this.redirectToExport}
            orders={orders}
            svg={svg}
          />
          )}

          <div className="table-header">
            <div className="custom-col-4">Name</div>
            <div className="custom-col-2">Order Date</div>
            <div className="custom-col-2">Collection Date</div>
            <div className="custom-col-4">Order Description</div>
            <div className="custom-col-2">Status</div>
          </div>

          { orders && orders.map((order) => this.renderOrder(order))}

          {
            orders && orders.length > 15 && (
              <Pagination
                onChange={() => {}}
                current={1}
                pageSize={3}
                total={orders.length}
                className="pagination"
              />
            )
          }
        </div>
      </section>
    );

  }
}

const mapStateToProps = ({ mealOrders }) => ({
  orderHistory: mealOrders.orders,
  isLoading: mealOrders.isLoading,
  isFiltering: mealOrders.isFiltering,
  filteredOrders: mealOrders.filteredOrders
});

ExportOrders.propTypes = {
  fetchOrders: PropTypes.func.isRequired,
  orderHistory: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { fetchOrders })(ExportOrders);