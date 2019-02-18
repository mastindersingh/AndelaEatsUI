import React from 'react';
import { format }from 'date-fns';
import classname from "classnames";
import Meal from "./Meal";


const modal = (props) => (
    <div
        id="confirm-order-modal"
        className={`modal ${props.isLoading && "blurred"}`}
        style={props.isModalOpen ? { display: "block" } : { display: "none" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-title">CONFIRM BOOKING</div>
            <div className="header-date">
              <span className="label date-label">Booking Date:</span>
              <span className="order-date">
                {" "}
                <b>{format(props.date, "dddd MMMM D")}</b>
              </span>
            </div>
          </div>

          <div className="order-details-label">Booking Details</div>

          <div className="menus-container">
            <div className="main-meal">
              <ul>
                {props.mainMeal ? (
                  <div>
                    <div className="label meal-title">Main Meal</div>
                    <Meal meal={props.mainMeal} shouldHaveCheckBox={false} />
                  </div>
                ) : (
                  ""
                )}
                {props.sideItems ? (
                  <div>
                    <div className="meal-title">Side Item</div>
                    <Meal meal={props.sideItems} shouldHaveCheckBox={false} />
                  </div>
                ) : (
                  ""
                )}
                {props.proteinItems ? (
                  <div>
                    <div className="meal-title">Protein Item</div>
                    <Meal meal={props.proteinItems} shouldHaveCheckBox={false} />
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
                onClick={props.toggleModal}
              >
                Cancel
              </button>
              <button
                className={classname("fill", { isDisabled: props.isLoading })}
                onClick={props.confirmOrder}
              >
                Confirm booking
              </button>
            </div>
          </div>
        </div>
      </div>
)

export default modal;
