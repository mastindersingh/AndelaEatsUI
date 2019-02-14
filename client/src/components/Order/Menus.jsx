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
      acc1: nextProps.mealSelected.firstAccompaniment,
      acc2: nextProps.mealSelected.secondAccompaniment
    }
    
    if(this.state.menuDate !== nextProps.match.params.date){
      newState.menuDate = nextProps.match.params.date
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
      this.props.selectMenuListId(id)
      this.props.setSelectedMenu(id)
      this.setState({ menuId: id });
    }
  };

  hasUserAlreadyBooked = () => {
    const { orderedMenus, match: { params: { date }}} = this.props
     return orderedMenus && orderedMenus.find(data => date === formatDateToISOString(data.dateBookedFor))
  }

  validateMeals = () => {
    const { firstAccompaniment, secondAccompaniment, mainMeal } = this.props.mealSelected;
    return (firstAccompaniment !== "" && secondAccompaniment !== "" && mainMeal !== "")
  }

  render() {
    console.log(this.props.menu, );
    
    const {
      menu: { id },
      match,
      data=[],
      toggleModal,
      isLoading,
      mealSelected
    } = this.props;
    const { updated, mainMeal, proteins, sides, menuId, acc1, acc2 } = this.state;
    const menusLists = getMenu(data, match.params.date);
    const newList = menusLists && menusLists.menus.filter(menu => menu.id === menuId);

    return (
      <div>
        {isLoading && <Loader />}
        {this.hasUserAlreadyBooked() ?
          <EmptyContent message="Booked" /> :
          (
            <div className={`menus-container ${isLoading && "blurred"}`}>
              {menusLists && menusLists.menus.length > 0 ? (
                <div>
                  <h3>{`${id ? "Edit" : "New"} Order`}</h3>
                  <MealOptions
                    category="mainMeal"
                    title="Main Meal"
                    mealOptions={menusLists.menus}
                    selectedMealId={mainMeal}
                    updateSelection={this.updateSelection}
                  />
                  {newList.length > 0 && (
                    <div>
                      <MealOptions
                        category="acc1"
                        title="Side Meal"
                        mealOptions={newList[0].sideItems}
                        selectedMealId={acc1}
                        updateSelection={this.updateSelection}
                      />
                      <MealOptions
                        category="acc2"
                        title="Protein Meal"
                        mealOptions={newList[0].proteinItems}
                        selectedMealId={acc2}
                        updateSelection={this.updateSelection}
                      />
                    </div>
                  )}

                  <div className="cta">
                    <div className="float-left" />
                    <div className="float-right">
                      {!id && (
                        <div className="btn reset-order" onClick={this.resetMenus}>
                          reset order
                        </div>
                      )}
                      <button
                        disabled={!this.validateMeals()}
                        className={`btn submit-order ${!this.validateMeals() && "isDisabled"}`}
                        onClick={() => toggleModal(id)}
                      >
                        {`${id ? "update" : "submit"} order`}
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

function mapStateToProps({ orders: { isLoading, menu } }) {
  return {
    menu,
    isLoading
  };
}

Menus.propTypes = {
  match: PropType.object,
  data: PropType.array
};
export default connect(
  mapStateToProps,
  { getOrderByDate }
)(Menus);
