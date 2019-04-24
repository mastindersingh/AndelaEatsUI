import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import DeleteModal from '../../common/DeleteModal/DeleteModal';
import moment from 'moment';

class MealSession extends Component {
  state = {
    displayDeleteModal: false,
  };

  closeModal = () => {
    this.setState({ displayDeleteModal: false });
  };

  deleteItem = (mealSessionId) => {
    this.setState({ displayDeleteModal: false });
  };

  showDeleteMealSessionModal = (evnt) => {
    evnt.preventDefault();
    this.setState({ displayDeleteModal: true });
  };

  render() {
    const { name, isDelete, date, startTime, endTime } = this.props.session;
    const { toggleAddEditModal } = this.props;

    return (
      <div
        className={`table-body ${
          isDelete === true ? 'collected' : 'cancelled'
        }`}
      >
        <div className="table-row">
          <div className="custom-row">
            <div className="custom-col-4">{name}</div>
            <div className="custom-col-4">{date}</div>
            <div className="custom-col-4">{startTime}</div>
            <div className="custom-col-4">{endTime}</div>
            <div className="custom-col-4">
              <button
                className="edit--color edit"
                type="button"
                onClick={(evnt) =>
                  toggleAddEditModal(
                    {
                      name,
                      date: moment(date, 'YYYY-MM-DD HH:mm:ssZZ'),
                      startTime: moment(startTime, 'HH:mm:ssZZ'),
                      endTime: moment(endTime, 'HH:mm:ssZZ'),
                    },
                    true
                  )
                }
              >
                Edit
              </button>
              <button
                className="delete-color"
                type="button"
                onClick={this.showDeleteMealSessionModal}
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <DeleteModal
          isDeleting={false}
          deleteItem={this.deleteItem}
          displayDeleteModal={this.state.displayDeleteModal}
          closeModal={this.closeModal}
          modalContent={this.props.session}
          item="Meal Session"
        />
      </div>
    );
  }
}

MealSession.propTypes = {
  session: PropTypes.shape({
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    isDelete: PropTypes.bool.isRequired,
  }),
};

export default MealSession;
