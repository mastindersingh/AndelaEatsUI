import React, { Component } from 'react';
import { connect } from 'react-redux';
import { format, addDays } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import { Route, NavLink } from 'react-router-dom';
import PropType from 'prop-types';
import moment from 'moment';

import Menus from './Menus';
import MenuTable from '../Admin/Menus/MenuTable';

import {
  getUpComingMenus,
  selectMeal,
  resetMenu,
  fetchMenu,
  fetchUserOrders,
  createOrder
} from '../../actions/menuAction';
import {
  fetchMenus as fetchAdminMenu,
  fetchVendorEngagements
} from '../../actions/admin/menuItemsAction';
import { canOrderMeal, validateDate, endDate } from '../../helpers/mealsHelper';
import ConfirmOrder from './ConfirmOrder';
import Loader from '../common/Loader/Loader';
import { updateOrder } from '../../actions/ordersAction';
import { formatDate } from '../../helpers/formatMealItems';

/**
 *
 *
 * @class Orders
 * @extends {Component}
 */
export class Orders extends Component {
  /**
   *Creates an instance of Orders.
   * @param {*} props
   * @memberof Orders
   */
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isLoading: true,
      selectedMenu: '',
      menuListId: '',
      startDate: moment(),
      endDate: moment().add(3, 'days')
    };
  }

  componentDidMount() {
    const startDate = format(new Date(), 'YYYY-MM-DD');
    const endDate = format(addDays(new Date(), 10), 'YYYY-MM-DD');

    this.props.fetchMenu(startDate, endDate).then(() => {
      this.props.fetchUserOrders(startDate, endDate);
      this.selectDefaultMenu();
      this.props.fetchAdminMenu(
        formatDate(this.state.startDate),
        formatDate(this.state.endDate)
      );
      this.props.fetchVendorEngagements();
    });
  }

  selectMenuListId = id => {
    this.setState({
      menuListId: id
    });
  };

  showToast = () => {
    toast.success(this.props.message, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  toggleModal = menuId => {
    const {
      firstAccompaniment,
      secondAccompaniment,
      mainMeal
    } = this.props.mealSelected;
    if (
      firstAccompaniment !== '' &&
      secondAccompaniment !== '' &&
      mainMeal !== ''
    ) {
      this.setState(state => ({
        isModalOpen: !state.isModalOpen,
        menuId
      }));
    }
  };

  setSelectedMenu = id => {
    this.setState({
      selectedMenu: id
    });
  };

  selectDefaultMenu() {
    const selectedMeal = this.props.userMenus.find(
      menu => canOrderMeal(menu) && validateDate(menu, endDate())
    );
    this.context.router.history.push(
      `${this.props.match.url}/${selectedMeal && selectedMeal.date}`
    );
  }

  /**
   *
   *
   * @returns {void}
   * @memberof Orders
   */
  renderDates() {
    const { userMenus } = this.props;
    if (userMenus) {
      return userMenus.map(
        menuDate =>
          validateDate(menuDate, endDate()) && (
            <li
              onClick={() => this.props.resetMenu()}
              key={menuDate.date}
              className={canOrderMeal(menuDate) ? 'dates' : 'dates-disable'}
            >
              <NavLink
                activeClassName={
                  canOrderMeal(menuDate) ? 'active' : 'isDisabled'
                }
                to={
                  canOrderMeal(menuDate)
                    ? `${this.props.match.url}/${menuDate.date}`
                    : '#'
                }
              >
                {format(menuDate.date, 'dddd Do')}
              </NavLink>
              <div className="border-circle" />
            </li>
          )
      );
    }
  }

  render() {
    const {
      match: { url },
      userMenus: { menuList },
      selectMeal,
      mealSelected,
      orderMeal,
      resetMenu,
      isLoading,
      updateOrder,
      userMenus,
      orderedMenus,
      createOrder //eslint-disable-line
    } = this.props;

    const { selectedMenu, menuListId } = this.state;

    return (
      <div className="wrapper">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="orders-wrapper">
            <MenuTable menus={this.props.menus} preview />
            <h3 className="card-header">Place Your Order</h3>
            <div className="orders-container">
              <div className="date-wrapper">
                <h3>{format(Date.now(), 'MMMM YYYY')}</h3>
                <ul>{this.renderDates()}</ul>
              </div>
              <div className="menu-wrapper">
                <Route
                  path={`${url}/:date`}
                  render={props => (
                    <div>
                      <Menus
                        data={userMenus}
                        toggleModal={this.toggleModal}
                        selectMeal={selectMeal}
                        resetMenu={resetMenu}
                        mealSelected={mealSelected}
                        setSelectedMenu={this.setSelectedMenu}
                        orderedMenus={orderedMenus}
                        selectMenuListId={this.selectMenuListId}
                        {...props}
                      />
                      <ConfirmOrder
                        menuId={this.state.menuId}
                        toggleModal={this.toggleModal}
                        isModalOpen={this.state.isModalOpen}
                        menus={userMenus}
                        mealSelected={mealSelected}
                        selectedMenu={selectedMenu}
                        orderMeal={orderMeal}
                        updateOrder={updateOrder}
                        showToast={this.showToast}
                        isLoading={isLoading}
                        createOrder={createOrder}
                        menuListId={menuListId}
                        {...props}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Orders.propTypes = {
  getUpComingMenus: PropType.func,
  isLoading: PropType.bool,
  match: PropType.object,
  mealSelected: PropType.object,
  message: PropType.string,
  resetMenu: PropType.func.isRequired,
  selectMeal: PropType.func.isRequired
};

Orders.contextTypes = {
  router: PropType.object.isRequired
};

/**
 * connect to redux store
 * @param {state} state
 * @returns {object} menus
 */
function mapStateToProps({ upcomingMenus, menus }) {
  const {
    menus: userMenus,
    acc1,
    acc2,
    mainMeal,
    message,
    isLoading,
    orderedMenus
  } = upcomingMenus;

  const mealSelected = {
    mainMeal,
    firstAccompaniment: acc1,
    secondAccompaniment: acc2
  };

  return {
    userMenus,
    mealSelected,
    message,
    isLoading,
    orderedMenus,
    menus
  };
}

const actionCreators = {
  getUpComingMenus,
  selectMeal,
  resetMenu,
  updateOrder,
  fetchMenu,
  fetchUserOrders,
  createOrder,
  fetchAdminMenu,
  fetchVendorEngagements
};

export default connect(
  mapStateToProps,
  actionCreators
)(Orders);
