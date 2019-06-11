import React, { Component } from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import Meal from "./Meal";
import MainMeal from "./MainMeal";
import Loader from "../common/Loader/Loader";
import { getOrderByDate } from "../../actions/ordersAction";
import { formatDateToISOString } from "../../helpers/dateFormatter";
import EmptyContent from '../common/EmptyContent';

/* eslint-disable */

const getMenu = (menus, date) => menus.find(meals => meals.date === date);

export class MealOptions extends Component {
  constructor() {
    super();
  }

  onChange = (mealId, checked, id) => {
    this.props.updateSelection(this.props.category, checked ? mealId : "", id);
  };

  render() {
    const { mealOptions = [], title, selectedMealId, category } = this.props;
    return (
      <div className="main-meal">
        <h3>{title}</h3>
        <ul>
          {mealOptions.map(meal =>
            category === "mainMeal" ? (
              <MainMeal
                meal={meal}
                key={meal.id}
                onChange={this.onChange}
                selectedMealId={selectedMealId}
                shouldHaveCheckBox={true}
              />
            ) : (
              <Meal
                meal={meal}
                key={meal.id}
                onChange={this.onChange}
                selectedMealId={selectedMealId}
                shouldHaveCheckBox={true}
              />
            )
          )}
        </ul>
      </div>
    );
  }
}

export class Menus extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      updated: false,
      mainMealId: false,
      menuId: "",
      menuDate: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    let newState = {
      mainMeal: nextProps.mealSelected.mainMeal,
      acc1: nextProps.mealSelected.firstAccompaniment ,
      acc2: nextProps.mealSelected.secondAccompaniment
    }
    const date = !nextProps.edit ? nextProps.match.params.date : nextProps.date

      if(this.state.menuDate !== date){
        newState.menuDate = date
        newState.menuId = ""
      }

    this.setState(newState)
  }

  /**
   * Resets Menus to default.
   *
   * @memberof Menus
   */
  resetMenus = () => {
    this.props.resetMenu();
    this.setState({
      selectedMainMealId: "",
      mainMeal: "",
      menuId: "",
      acc1: "",
      acc2: ""
    });
  };


  updateSelection = (mealCategory, mealId, id) => {
    this.props.selectMeal({ prop: mealCategory, value: mealId });
    this.setState({ [mealCategory]: mealId, updated: true });
    if (mealCategory === "mainMeal") {
      this.props.setSelectedMenu(id)
      this.props.selectMenuListId(id)
      this.setState({ menuId: id });
    }
  };

  hasUserAlreadyBooked = () => {
    if (!this.props.edit) {
      const { orderedMenus, match: { params: { date }}} = this.props;
     return orderedMenus && orderedMenus.find(data => date === formatDateToISOString(data.dateBookedFor));
    }
  }

  validateMeals = () => {
    const { firstAccompaniment, secondAccompaniment, mainMeal } = this.props.mealSelected;
    const { order } = this.props;
    return (firstAccompaniment !== "" && secondAccompaniment !== "" && mainMeal !== "" || order.mainMeal !== "")
  }

  renderOptions = (category, title, mealOptions, selectedMealId) => (
    <React.Fragment>
      <MealOptions
        category={category}
        title={title}
        mealOptions={mealOptions}
        selectedMealId={selectedMealId}
        updateSelection={this.updateSelection}
      />
    </React.Fragment>
  )
  render() {
    const {
      menu: { id },
      match,
      data=[],
      toggleModal,
      isLoading,
      date,
      edit,
      menuId: orderId,
      order
    } = this.props;
    const { mainMeal, menuId, acc1, acc2 } = this.state;
    const menusLists = match ? getMenu(data, match.params.date) : getMenu(data, date);
    const orderMenuId = edit ? orderId : menuId;
    const newList = menusLists && menusLists.menus.filter(menu => menu.id === orderMenuId);

    return (
      <div>
        {isLoading && <Loader />}
        {this.hasUserAlreadyBooked() ?
          <EmptyContent message="Booked" /> :
          (
            <div className={`menus-container ${isLoading && "blurred"}`}>
              {menusLists && menusLists.menus.length > 0 ? (
                <div>
                  <h3>{`${edit ? "Edit" : "New"} Order`}</h3>
                  {this.renderOptions("mainMeal", "Main Meal", menusLists.menus,mainMeal || order.mainMeal)}
                  {newList.length > 0 && (
                    <div>
                      {this.renderOptions("acc1", "Side Meal", newList[0].sideItems, acc1 || order.acc1)}
                      {this.renderOptions("acc2","Protein Meal", newList[0].proteinItems, acc2 || order.acc2)}
                    </div>
                  )}

                  <div className="cta">
                    <div className="float-left" />
                    <div className="float-right">
                      {!edit && (
                        <div className="btn reset-order" onClick={this.resetMenus}>
                          reset order
                        </div>
                      )}
                      <button
                        disabled={!this.validateMeals()}
                        className={`btn submit-order ${!this.validateMeals() && "isDisabled"}`}
                        onClick={() => toggleModal(id)}
                      >
                        {`${edit ? "update" : "submit"} order`}
                      </button>
                    </div>
                  </div>
              </div>
              ) : (
                <div className="no-options"> No options available </div>
              )}
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = ({ orders: { isLoading, menu } }) => ({
  menu,
  isLoading
});

Menus.propTypes = {
  match: PropType.object,
  data: PropType.array
};
export default connect(
  mapStateToProps,
  { getOrderByDate }
)(Menus);
