import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { format } from "date-fns";
import PropType from "prop-types";
import { ToastContainer } from 'react-toastify';

import { editOrder, updateOrder } from "../../actions/ordersAction";
import MealOptions from "./MealOptions";
import Loader from '../common/Loader/Loader';

/**
 *
 *
 * @class EditOrder
 * @extends {Component}
 */
export class EditOrder extends Component {
  state = {
    main: "",
    firstAccompaniment: "",
    secondAccompaniment: "Cake"
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.editOrder(id);

    if (this.props.location.query) {
      const { mainMeal, protein } = this.props.location.query;

      this.setState({
        main: mainMeal,
        firstAccompaniment: protein
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order) {
      const { main, firstAccompaniment, secondAccompaniment } = nextProps.order.orderData;
      this.setState({
        main,
        firstAccompaniment,
        secondAccompaniment
      });
    }
  }

  handleOptionChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const { main, firstAccompaniment, secondAccompaniment } = this.state;

    const orderData = {
      main,
      firstAccompaniment,
      secondAccompaniment
    }

    this.props.updateOrder(orderData)
  };
  
  isDisabled = () => {
    if (this.props.location.query) {
      const { mainMeal, protein } = this.props.location.query;
      const { main, firstAccompaniment } = this.state;
      return mainMeal === main && protein === firstAccompaniment;
    }
  }

  render() {
    const {
      main,
      firstAccompaniment,
      secondAccompaniment,
    } = this.props.menu.meal;
    
    const { isLoading } = this.props;

    return (
      <Fragment>
        { isLoading && <Loader />}
        <div className={`wrapper ${isLoading && 'blurred'}`}>
          <div className="orders-wrapper">
            <h3>Edit Order</h3>
            <ToastContainer />
            <div className="orders-container">
              <div className="date-wrapper">
                <h3>{format(Date.now(), "MMMM YYYY")}</h3>
                <ul>
                  <li className="active">
                    {format(this.props.menu.date, "dddd Do")}
                  </li>
                </ul>
              </div>
              <div className="menu-wrapper">
                <div className="menus-container">
                  <div className="main-meal">
                    <h3>Main Meal</h3>
                    <ul>
                      {main.map(meal => (
                        <MealOptions
                          key={meal.id}
                          name="main"
                          meal={meal}
                          selectedMealId={this.state.main}
                          handleOptionChange={this.handleOptionChange}
                        />
                      ))}
                    </ul>
                    <h3>Accompaniment 1</h3>
                    <ul>
                      {firstAccompaniment.map(meal => (
                        <MealOptions
                          key={meal.id}
                          name="firstAccompaniment"
                          meal={meal}
                          selectedMealId={this.state.firstAccompaniment}
                          handleOptionChange={this.handleOptionChange}
                        />
                      ))}
                    </ul>
                    <h3>Accompaniment 2</h3>
                    <ul>
                      {secondAccompaniment.map(meal => (
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
                        onClick={() => this.props.history.push("/orders")}
                      >
                        cancel
                      </div>
                      <button
                        className={!this.isDisabled() ? "btn submit-order" : 'btn isDisabled'}
                        type="submit"
                        onClick={this.handleFormSubmit}
                      >
                        save changes
                      </button>
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
    menu: state.orders.menu, 
    order: state.orders.order,
    isLoading: state.orders.isLoading
  };
}

export default connect(
  mapStateToProps,
  { editOrder, updateOrder }
)(EditOrder);
