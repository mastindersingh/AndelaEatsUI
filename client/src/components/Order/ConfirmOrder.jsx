import React, { Component } from "react";
import { format } from "date-fns";
import classname from "classnames";

import Meal from "./Meal";

/* eslint-disable */

/**
 *
 *
 * @class ConfirmOrder
 * @extends {Component}
 */
class ConfirmOrder extends Component {
  confirmOrder = () => {
    const {
      orderMeal,
      showToast,
      toggleModal,
      menuId,
      updateOrder,
      isLoading,
      createOrder
    } = this.props;
    if (menuId) {
      // Updating an already created order
      updateOrder(this.props.mealSelected, menuId).then(() => {
        toggleModal();
      });
    } else {
      // Creating a new order
      const {
        mealSelected: { mainMeal, firstAccompaniment, secondAccompaniment },
        match: { params: { date }}, menuListId } = this.props;

      const newOrder = {
        channel: "web",
        dateBookedFor: date,
        mealItems: [mainMeal, firstAccompaniment, secondAccompaniment],
        mealPeriod: "lunch",
        menuId: menuListId
      }

      createOrder(newOrder)
        .then(() => {
          this.props.history.push("/")
        })
        .catch(() => {
          showToast();
        });
    }
  };

  render() {
    const {
      isModalOpen,
      toggleModal,
      menus,
      match,
      mealSelected,
      isLoading,
      selectedMenu
    } = this.props;

    let mainMeal;
    let proteinItems;
    let sideItems;
    let date;

    const todaysMenu = menus.find(meals => meals.date === match.params.date);
    date = todaysMenu && todaysMenu.date
    const userSelectedMenu = todaysMenu && todaysMenu.menus.find(meal => meal.id === selectedMenu)

    if (userSelectedMenu) {
      mainMeal = userSelectedMenu.mainMeal
      proteinItems = userSelectedMenu.proteinItems.find(meal => meal.id === mealSelected.secondAccompaniment);
      sideItems = userSelectedMenu.sideItems.find(meal => meal.id === mealSelected.firstAccompaniment);
    }

    return (
      <div
        id="confirm-order-modal"
        className={`modal ${isLoading && "blurred"}`}
        style={isModalOpen ? { display: "block" } : { display: "none" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-title">CONFIRM BOOKING</div>
            <div className="header-date">
              <span className="label date-label">Booking Date:</span>
              <span className="order-date">
                {" "}
                <b>{format(date, "dddd MMMM D")}</b>
              </span>
            </div>
          </div>

          <div className="order-details-label">Booking Details</div>

          <div className="menus-container">
            <div className="main-meal">
              <ul>
                {mainMeal ? (
                  <div>
                    <div className="label meal-title">Main Meal</div>
                    <Meal meal={mainMeal} shouldHaveCheckBox={false} />
                  </div>
                ) : (
                  ""
                )}
                {sideItems ? (
                  <div>
                    <div className="meal-title">Side Item</div>
                    <Meal meal={sideItems} shouldHaveCheckBox={false} />
                  </div>
                ) : (
                  ""
                )}
                {proteinItems ? (
                  <div>
                    <div className="meal-title">Protein Item</div>
                    <Meal meal={proteinItems} shouldHaveCheckBox={false} />
                  </div>
                ) : (
                  ""
                )}
              </ul>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="grayed"
                onClick={toggleModal.bind(this)}
              >
                Cancel
              </button>
              <button
                className={classname("fill", { isDisabled: isLoading })}
                onClick={this.confirmOrder}
              >
                Confirm booking
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmOrder;
