import React, { Component } from "react";
import Modal from './Modal';

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
      <Modal {...this.props} date={date} confirmOrder={this.confirmOrder} />
    );
  }
}

export default ConfirmOrder;
