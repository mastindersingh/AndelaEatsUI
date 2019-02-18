import React, { Component, Fragment } from 'react';
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';

import { fetchOrders } from '../../../actions/admin/ordersAction.js';
import { validateDate } from '../../../helpers/dateFormatter.js';

export class Filter extends Component {
  state = {
    isOpen: false,
    start: '',
    end: ''
  }

  handleSubmit = () => {
    const { start, end } = this.state;
    const { fetchOrders, currentPage } = this.props;
    const dates = validateDate(start, end);
 
    if(dates) {
      fetchOrders(currentPage, dates.startDate, dates.endDate)
       this.setState({
         isOpen: false,
         start: '',
         end: ''
       })
     }
   
   }

  /**
   * Toggle Filter modal
   *
   * @memberof OrdersHeader
   *
   * @returns {void}
   */
  toggleFilterModal = () => {
    this.setState(prevProps => ({
      isOpen: !prevProps.isOpen
    }))
  }


  render() {
    const { isOpen, start, end } = this.state

    return (
      <Fragment>
        <button
          className="filter-btn"
          type="button"
          onClick={this.toggleFilterModal}
        >
          <i className="fa fa-filter" />
          Filter
        </button>
        {isOpen && <form
            className={`dropdown ${isOpen && "active"}`}
          >
            <div>
              <label className="date-label" htmlFor="start">Start Date
                <DatePicker
                  onChange={(date) => this.setState({ start: date })}
                  value={start}
                />
              </label>
            </div>
            <div>
              <label className="date-label" htmlFor="end">End Date
                <DatePicker
                  onChange={(date) => this.setState({ end: date })}
                  value={end}
                />
              </label>
            </div>

            <div className="actions">
            <button
              className="input btn"
              type="button"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
              <a
                className="action-item"
                role="button"
                tabIndex="0"
                onClick={this.toggleFilterModal}
              >Close
              </a>
            </div>
          </form>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = ({ mealOrders }) => ({
  currentPage: mealOrders.currentPage
})

export default connect(mapStateToProps, { fetchOrders })(Filter);
