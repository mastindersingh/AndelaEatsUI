import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { format, addDays, subDays } from 'date-fns';
import PropType from 'prop-types';
import { ToastContainer } from 'react-toastify';

import { editOrder, updateOrder } from '../../actions/ordersAction';
import MealOptions from './MealOptions';
import Loader from '../common/Loader/Loader';
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
    menu: { mainMeal: {name: '', id: ''}, proteinItems: [], sideItems: [] },
    filteredMenus: [],
    showModal: false
  };

  componentDidMount() {
    const menuStartDate = format(subDays(new Date(), 30), 'YYYY-MM-DD');
    const menuEndDate = format(addDays(new Date(), 5), 'YYYY-MM-DD');
    this.props.fetchMenu(menuStartDate, menuEndDate).then(() => {
      this.handlesetState();
    });
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.menus) !== JSON.stringify(prevProps.menus) ||
      JSON.stringify(this.props.meal) !== JSON.stringify(prevProps.meal)
    ) {
      this.handlesetState();
    }
  }

  handlesetState = () => {
    const filteredMenus =
      this.props.meal !== null
        ? this.props.menus.filter(
            item => item.date === this.props.meal.dateBookedFor
          )
        : [];
    const menu =
      this.props.meal !== null
        ? this.props.menus.filter(item => item.id === this.props.meal.menuId)[0]
        : { mainMeal: {}, proteinItems: [], sideItems: [] };
        
    this.setState({
      menu,
      filteredMenus,
      main: this.props.meal ? this.props.meal.mealItems.filter(item => item.meal_type === 'main')[0].name : '',
      firstAccompaniment: this.props.meal
        ? this.props.meal.mealItems.filter(item => item.meal_type === 'side')[0].name
        : '',
      secondAccompaniment: this.props.meal
        ? this.props.meal.mealItems.filter(item => item.meal_type === 'protein')[0].name
        : ''
    });
  };
  handleOptionChange = event => {
    if (event.target.name === 'main') {
      const menu = this.props.menus.filter(
        item => item.mainMeal.name === event.target.value
      );
      this.setState({
        menu: menu[0]
      });
    }

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleModalDisplay = () => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal
      };
    });
  };
  handleFormSubmit = () => {
    const { firstAccompaniment, secondAccompaniment, menu } = this.state;
    const mealProtein = this.state.menu.proteinItems.filter(
      item => item.name === secondAccompaniment
    )[0];
    const mealSide = this.state.menu.sideItems.filter(
      item => item.name === firstAccompaniment
    )[0];
    const { dateBookedFor, id, channel, mealPeriod } = this.props.meal;
    const orderData = {
      dateBookedFor: format(dateBookedFor, 'YYYY-MM-DD'),
      channel,
      mealItems: [mealProtein.id, mealSide.id, menu.mainMeal.id],
      mealPeriod,
      menuId: this.state.menu.id
    };

    this.props.updateOrder(orderData, id).then(() => {
      this.handleModalDisplay();
      this.props.closeModal();
    });
  };

  render() {
    const menuOptions = this.state.filteredMenus.map(menu => ({
      id: menu.mainMeal.id,
      mealPicture: menu.mainMeal.image,
      meal: menu.mainMeal.name
    }));
    const proteinOptions = this.state.menu.proteinItems.map(item => ({
      id: item.id,
      mealPicture: item.image,
      meal: item.name
    }));
    const sideOptions = this.state.menu.sideItems.map(item => ({
      id: item.id,
      mealPicture: item.image,
      meal: item.name
    }));

    const { isLoading, meal } = this.props;
    const bookingDate = meal ? meal.dateBooked : '';
    const collectionDate = meal ? meal.dateBookedFor : '';
    return (
      <Fragment>
        {isLoading && <Loader />}
        <div className={`wrapper ${isLoading && 'blurred'}`}>
          <div className="orders-wrapper">
            <div className="orders-container">
              <div className="date-wrapper">
                <div className="booking-date">
                  <h3>Date Booked</h3>
                  <h4>
                    {`${format(Date.now(), 'MMMM YYYY')} ${format(
                      bookingDate,
                      'dddd Do'
                    )}`}
                  </h4>
                </div>
                <div>
                  <h3>Collection Date</h3>
                  <h4>
                    {`${format(Date.now(), 'MMMM YYYY')} ${format(
                      collectionDate,
                      'dddd Do'
                    )}`}
                  </h4>
                </div>
              </div>
              <div className="menu-wrapper">
                <div className="menus-container">
                  <div className="main-meal">
                    <h3>Main Meal</h3>
                    <ul>
                      {menuOptions.map(meal => (
                        <MealOptions
                          key={meal.id}
                          name="main"
                          meal={meal}
                          selectedMealId={this.state.main}
                          handleOptionChange={this.handleOptionChange}
                        />
                      ))}
                    </ul>
                    <h3>Side Meal</h3>
                    <ul>
                      {sideOptions.map(meal => (
                        <MealOptions
                          key={meal.id}
                          name="firstAccompaniment"
                          meal={meal}
                          selectedMealId={this.state.firstAccompaniment}
                          handleOptionChange={this.handleOptionChange}
                        />
                      ))}
                    </ul>
                    <h3>Protein Meal</h3>
                    <ul>
                      {proteinOptions.map(meal => (
                        <MealOptions
                          key={meal.id}
                          name="secondAccompaniment"
                          meal={meal}
                          selectedMealId={this.state.secondAccompaniment}
                          handleOptionChange={this.handleOptionChange}
                        />
                      ))}
                    </ul>
                  </div>
                  <div className="cta">
                    <div className="float-left" />
                    <div className="float-right">
                      <div
                        className="btn reset-order"
                        onClick={this.props.closeModal}
                      >
                        cancel
                      </div>
                      <button
                        className="btn submit-order"
                        type="submit"
                        onClick={this.handleModalDisplay}
                      >
                        save changes
                      </button>
                      <ConfirmModal
                        menuId={this.state.menu.id}
                        menus={this.state.filteredMenus}
                        menu={this.state.menu}
                        toggleModal={this.handleModalDisplay}
                        isModalOpen={this.state.showModal}
                        proteinItem={this.state.secondAccompaniment}
                        sideItem={this.state.firstAccompaniment}
                        updateOrder={this.handleFormSubmit}
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
  return {
    order: state.orders.order,
    isLoading: state.orders.isLoading,
    menus: state.upcomingMenus.menus.reduce((accu, curr) => {
      return [...accu, ...curr.menus]
    }, [])
  };
}

export default connect(
  mapStateToProps,
  { editOrder, updateOrder, fetchMenu }
)(EditOrder);
