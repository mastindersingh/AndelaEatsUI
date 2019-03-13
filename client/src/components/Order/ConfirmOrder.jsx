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
      showToast,
      menuId,
      updateOrder,
      createOrder,
      toggleModal,
      closeModal,
      order,
      mealSelected
    } = this.props;
  
    const {
      menuListId
    } = this.props;

    const mainMeal = mealSelected.mainMeal || order.mainMeal;
    const firstAccompaniment = mealSelected.firstAccompaniment || order.firstAccompaniment;
    const secondAccompaniment = mealSelected.secondAccompaniment || order.secondAccompaniment
    
    const newOrder = {
      channel: "web",
      mealItems: [mainMeal, firstAccompaniment, secondAccompaniment],
      mealPeriod: "lunch",
      menuId: menuListId || menuId
    };
    let date;
    if (menuId) {
      date = format(this.props.date, 'YYYY-MM-DD'),
      // Updating an already created order
      updateOrder({
        ...newOrder,
        dateBookedFor: date,
      }, order.orderId).then(() => {
        closeModal()
        toggleModal();
      })
    } else {
      // Creating a new order
      const {
        match: {
          params: { date }
        }
      } = this.props;

      createOrder({
        ...newOrder,
        dateBookedFor: date,
      })
        .then(() => {
          this.props.history.push("/");
        })
        .catch(() => {
          showToast();
        });
    }
  };

  renderItems = (meal, mealType) => (
    <div>
      <div className="label meal-title">{mealType}</div>
      <Meal meal={meal} shouldHaveCheckBox={false} />
    </div>
  )

  render() {
    const {
      isModalOpen,
      toggleModal,
      menus,
      match,
      mealSelected,
      isLoading,
      selectedMenu,
      order
    } = this.props;

    let mainMeal;
    let proteinItems;
    let sideItems;
    let date;

    let todaysMenu;
    let userSelectedMenu;
    if (!this.props.menuId) {
      todaysMenu = menus.find(meals => meals.date === match.params.date);
      date = todaysMenu && todaysMenu.date;
      userSelectedMenu =
        todaysMenu && todaysMenu.menus.find(meal => meal.id === selectedMenu);
      if (userSelectedMenu) {
        mainMeal = userSelectedMenu.mainMeal;
        proteinItems = userSelectedMenu.proteinItems.find(
          meal => meal.id === mealSelected.secondAccompaniment
        );
        sideItems = userSelectedMenu.sideItems.find(
          meal => meal.id === mealSelected.firstAccompaniment
        );
      }
    } else {
      const filterId = this.props.menuListId ? this.props.menuListId  : this.props.menuId
      userSelectedMenu = this.props.menus.filter(menu => menu.id === filterId)[0];
      if (userSelectedMenu) {
        mainMeal = userSelectedMenu.mainMeal;
        proteinItems = userSelectedMenu.proteinItems
          .filter(meal => meal.id === order.secondAccompaniment)[0];
        sideItems = userSelectedMenu.sideItems
        .filter(meal => meal.id === order.firstAccompaniment)[0];
        date = userSelectedMenu.date    
      }    
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
                  this.renderItems(mainMeal, 'Main Meal')
                ) : (
                  ""
                )}
                {sideItems ? (
                  this.renderItems(sideItems, 'Side Items')
                ) : (
                  ""
                )}
                {proteinItems ? (
                  this.renderItems(proteinItems, 'Protein Item')
                ) : (
                  ""
                )}
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="grayed" onClick={toggleModal}>
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
