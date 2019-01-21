import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from "react-csv";

import Filter from './Filter';

const headers = [
  { label: "Name", key: "user" },
  { label: "Order Date", key: "dateBooked" },
  { label: "Collection Date", key: "dateBookedFor" },
  { label: "Main Meal", key: "mealItems[0].name" },
  { label: "Side Meal", key: "mealItems[1].name"},
  { label: "Protein", key: "mealItems[2].name"},
  { label: "Status", key: "orderStatus" }
];

export class OrdersHeader extends Component {
  render() {
    const { title, orders, redirectToExport, svg, type } = this.props;
    return (
      <header className="orders-header">
        <div className="left-section">
          <h2 className="orders-header-title">{title}</h2>
            <button
              disabled={orders.length === 0}
              className={`export-btn ${orders.length === 0 && "grayed"}`}
              onClick={redirectToExport}
              type="button"
            >
              Export
              <span className="export-icon">
                <img src={svg} alt="" />
              </span>
            </button>
         
        </div>
        <div>
    
          <Filter />
    
          { type === 2 && (
          <CSVLink data={orders} headers={headers}>
            <button
              disabled={orders.length === 0}
              className={`export-btn-2 ${orders.length === 0 && "grayed"}`}
              type="button"
            >
              <span className="export-icon">
                <img src={svg} alt="" />
              </span>
                Download
            </button>
          </CSVLink>
          )}
        </div>
      </header>
    );
  }

}

OrdersHeader.propTypes = {
  redirectToExport: PropTypes.func,
  svg: PropTypes.any,
  title: PropTypes.string.isRequired,
  orders: PropTypes.array
};

export default OrdersHeader;
