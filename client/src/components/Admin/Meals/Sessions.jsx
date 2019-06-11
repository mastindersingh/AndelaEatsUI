import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Tabs from '../../common/Tab/Index';
import MealSession from './MealSession';
import { mealSessions } from '../../../fixtures/mealSessions';
import MealSessionModal from './MealSessionModal/MealSessionModal';
import {
  showMealSessionModal,
  hideMealSessionModal,
} from '../../../actions/admin/mealSessionsAction';

/**
 *
 * @description Meal session component visible only to admin
 *
 * @class Session
 *
 * @extends Component
 */
export class Session extends Component {
  state = {
    mealSessionDetails: {
      name: '',
      date: moment(),
      startTime: moment(),
      endTime: moment(),
    },
  };

  /**
   *
   * @description handle onChage event
   *
   * @params { Object } eventValue, name
   *
   * @returns { undefined }
   */
  /* eslint-disable */
  onChange = (eventValue, name) => {
    this.setState({
      mealSessionDetails: {
        ...this.state.mealSessionDetails,
        [name]: eventValue,
      },
    });
  };

  /**
   *
   * @description handle onChage event
   *
   * @params { Object } mealSessionDetails, edit
   *
   * @returns { undefined }
   */
  toggleAddEditModal = (mealSessionDetails, edit = false) => {
    const { displayMealSessionModal } = this.props;

    if (displayMealSessionModal) {
      this.props.hideMealSessionModal();
    } else {
      this.props.showMealSessionModal(true, edit);
    }

    if (mealSessionDetails != null) {
      this.setState({ mealSessionDetails });
    } else {
      this.setState({
        mealSessionDetails: {
          name: '',
          date: moment(),
          startTime: moment(),
          endTime: moment(),
        },
      });
    }
  };

  render() {
    const { displayMealSessionModal } = this.props;

    const { mealSessionDetails } = this.state;

    return (
      <div id="admin-meals">
        <MealSessionModal
          toggleAddEditModal={this.toggleAddEditModal}
          show={displayMealSessionModal}
          mealSessionDetails={mealSessionDetails}
          onChange={(name, eventValue) => this.onChange(name, eventValue)}
        />

        <header>
          <div>
            <br />
            <span className="title pull-left">Meal Sessions</span>
            <button
              className="pull-right"
              type="button"
              onClick={() => this.toggleAddEditModal()}
            >
              Add meal session
            </button>
          </div>
        </header>

        <Fragment>
          <div className="table-header">
            <div className="custom-col-4">Name</div>
            <div className="custom-col-4">Date</div>
            <div className="custom-col-4">Start time</div>
            <div className="custom-col-4">End time</div>
            <div className="custom-col-4">Options</div>
          </div>
        </Fragment>

        {mealSessions.payload.mealSessions.map((mealSession) => (
          <MealSession
            key={mealSession.id}
            session={mealSession}
            toggleAddEditModal={this.toggleAddEditModal}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  displayMealSessionModal: state.mealSessions.mealSessionModal.show,
});

const mapDispatchToProps = {
  showMealSessionModal,
  hideMealSessionModal,
};

Session.propTypes = {
  displayMealSessionModal: PropTypes.bool.isRequired,
  showMealSessionModal: PropTypes.func.isRequired,
  hideMealSessionModal: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Session);
