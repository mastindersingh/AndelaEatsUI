import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import PropType from 'prop-types';
import Menus from '../Order/Menus';

import { editOrder, updateOrder } from '../../actions/ordersAction';
import {
  selectMeal,
  resetMenu,
} from '../../actions/menuAction';
import ConfirmModal from '../Order/ConfirmOrder';

import { fetchMenu } from '../../actions/menuAction';

/**
 *
 *
 * @class EditOrder
 * @extends {Component}
 */
export class EditOrder extends Component {
  state = {
    main: '',
    firstAccompaniment: '',
    secondAccompaniment: 'Cake',
    menu: { mainMeal: {name: '', id: ''}, proteinItems: [], sideItems: [], id: '' },
    filteredMenus: [],
    showModal: false,
    menuListId: ''
  };

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.meal) !== JSON.stringify(prevProps.meal) || 
      JSON.stringify(this.props.menus) !== JSON.stringify(prevProps.menus)){
      // date to start fetching menus depending on an order being edited
      const orderStartDate = format(new Date(), 'YYYY-MM-DD');
      this.props.fetchMenu(orderStartDate, format(this.props.meal.dateBookedFor, 'YYYY-MM-DD')).then(() => {
      this.handlesetState();
    });
    }
  }

  handlesetState = () => {
    const { menus, meal } = this.props;
    const transformedMenus = menus.reduce((accu, curr) => {
      return [...accu, ...curr.menus]
    }, [])
    const filteredMenus =
      meal !== null
        ? transformedMenus.filter(
            item => item.date === meal.dateBookedFor
          )
        : [];
    const menu =
      meal
        ? transformedMenus.filter(item => item.id === meal.menuId)[0]
        : { mainMeal: {}, proteinItems: [], sideItems: [], id: '' };
    this.setState({
      menu,
      filteredMenus,
      main: meal ? meal.mealItems.filter(item => item.meal_type === 'main')[0].id : '',
      firstAccompaniment: meal
        ? meal.mealItems.filter(item => item.meal_type === 'side')[0].id
        : '',
      secondAccompaniment: this.props.meal
        ? meal.mealItems.filter(item => item.meal_type === 'protein')[0].id
        : ''
    });
  };

  handleModalDisplay = () => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal
      };
    });
  };

   selectMenuListId = id => {
    this.setState({
      menuListId: id
    });
  };

  setSelectedMenu = id => {
    this.setState({
      selectedMenu: id
    });
  };

  formateDate = (date, bookingDate) => (
    <div>
      <h3>{bookingDate}</h3>
        <h4>
          {`${format(Date.now(), 'MMMM YYYY')} ${format(
            date,
            'dddd Do'
          )}`}
        </h4>
    </div>
  )
  render() {
    const { mealSelected, orderedMenus, menus, closeModal, isLoading, meal, updateOrder } = this.props;
    const bookingDate = meal ? meal.dateBooked : '';
    const collectionDate = meal ? meal.dateBookedFor : '';
    const {main, firstAccompaniment, secondAccompaniment} = this.state;
    const order = {mainMeal : mealSelected.mainMeal || main, firstAccompaniment: mealSelected.firstAccompaniment || firstAccompaniment,
      secondAccompaniment: mealSelected.secondAccompaniment || secondAccompaniment, orderId: meal && meal.id,
    }
    
    return (
      <Fragment>
        <div className={`wrapper ${isLoading && 'blurred'}`}>
          <div className="orders-wrapper">
            <div className="orders-container">
              <div className="date-wrapper">
                <div className="booking-date">
                  <div>
                  {this.formateDate(bookingDate, 'Date Booked')}
                  </div>
                </div>
                <div>
                  {this.formateDate(collectionDate, 'Collection Date')}
                </div>
              </div>
              <div className="menu-wrapper">
              <div className="menus-container">
                <Menus
                  data={menus}
                  toggleModal={this.handleModalDisplay}
                  selectMeal={selectMeal}
                  resetMenu={resetMenu}
                  mealSelected={mealSelected}
                  setSelectedMenu={this.setSelectedMenu}
                  orderedMenus={orderedMenus}
                  selectMenuListId={this.selectMenuListId}
                  {...this.props}
                  edit
                  date={format(collectionDate, 'YYYY-MM-DD')}
                  menuId={this.state.menuListId || this.state.menu.id}
                  order={{mainMeal: main, acc1: firstAccompaniment, acc2:secondAccompaniment}}
                  />
                  <div className="cta">
                    <div className="float-left" />
                    <div className="float-right">
                      <div
                        className="btn reset-order"
                        onClick={closeModal}
                      >
                        cancel
                      </div>
                      <ConfirmModal
                        menuId={this.state.menu.id}
                        menus={this.state.filteredMenus}
                        toggleModal={this.handleModalDisplay}
                        isModalOpen={this.state.showModal}
                        updateOrder={updateOrder}
                        mealSelected={mealSelected}
                        menuListId={this.state.menuListId }
                        date={collectionDate}
                        closeModal={closeModal}
                        order={order}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
      </Fragment>
    );
  }
}

EditOrder.propTypes = {
  match: PropType.object,
  menu: PropType.object,
  order: PropType.object,
  isLoading: PropType.bool,
  location: PropType.object,
  editOrder: PropType.func.isRequired,
  updateOrder: PropType.func.isRequired
};

/**
 * connect to redux store
 * @param {state} state
 * @returns {object} menus
 */
function mapStateToProps(state) {
 const { acc1,acc2,mainMeal} = state.upcomingMenus;

 const mealSelected = {
  mainMeal,
  firstAccompaniment: acc1,
  secondAccompaniment: acc2
};
  return {
    mealSelected,
    orderedMenus: state.upcomingMenus.orderedMenus,
    order: state.orders.order,
    isLoading: state.orders.isLoading,
    menus: state.upcomingMenus.menus,
  };
}

export default connect(
  mapStateToProps,
  { editOrder, updateOrder, fetchMenu, selectMeal }
)(EditOrder);
