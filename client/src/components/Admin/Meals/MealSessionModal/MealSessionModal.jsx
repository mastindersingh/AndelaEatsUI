import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import AddMealSessionFields from './AddMealSessionFields';

/**
 *
 *
 * @class Vendors
 *
 * @extends {Component}
 */
class MealSessionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   *
   *
   * @description handle onSubmit event
   *
   * @param { Object } event
   *
   * @returns { undefined }
   */
  onSubmit = (event) => {
    event.preventDefault();

    this.props.toggleAddEditModal(null, false);
  };

  closeModal = () => {
    this.props.toggleAddEditModal(null, false);
  };

  render() {
    const {
      show,
      edit,
      isLoading,
      addBtnDisabled,
      mealSessionDetails: { name, date, startTime, endTime },
      onChange,
    } = this.props;

    return (
      <div
        className="modal"
        id="menu-modal"
        style={show ? { display: 'block' } : { display: 'none' }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-title">
              {edit ? 'EDIT' : 'ADD'} MEAL SESSION
            </div>
            <div>
              <button
                tabIndex={0}
                type="button"
                className="close-icon btn-no-style"
                onClick={this.closeModal}
              >
                X&nbsp;&nbsp;Close
              </button>
            </div>
          </div>

          <form id="add-meal-form" onSubmit={this.onSubmit}>
            <AddMealSessionFields
              state={{
                date,
                name,
                startTime,
                endTime,
              }}
              errors={[]}
              onChange={onChange}
              mealSessionTypes={[]}
            />

            <div className="modal-footer">
              <div>
                <div
                  className="loader-wheel"
                  style={{ display: isLoading ? 'inline-block' : 'none' }}
                />
              </div>

              <button
                type="button"
                className="grayed"
                onClick={this.closeModal}
              >
                Cancel
              </button>
              <button type="submit" disabled={addBtnDisabled}>
                {edit ? 'Update' : 'Add'} meal session
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

MealSessionModal.propTypes = {
  mealSessionDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
    startTime: PropTypes.object.isRequired,
    endTime: PropTypes.object.isRequired,
  }),
  show: PropTypes.bool.isRequired,
  edit: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  toggleAddEditModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  addBtnDisabled: PropTypes.bool,
};

MealSessionModal.defaultProps = {
  isLoading: false,
  addBtnDisabled: false,
};

const mapStateToProps = ({ mealSessions }) => ({
  edit: mealSessions.mealSessionModal.edit,
});

export default connect(
  mapStateToProps,
  null
)(MealSessionModal);
