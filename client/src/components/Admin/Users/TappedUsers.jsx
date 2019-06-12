import React, { Component } from "react";
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import { ToastContainer, toast } from 'react-toastify';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import Loader from '../../common/Loader/Loader';
import Filter from '../../common/Filter';
// Actions
import { getTappedUsers } from '../../../actions/admin/adminUserAction';

/**
 * @class TabbedUsers
 *
 * @param {string} { date }
 *
 * @extends {Component}
 */
export class TappedUsers extends Component {
  state = {
    isOpen: false,
    startDate: null,
    endDate: null,
    isLoading: true,
  }

  componentDidMount() {
    this.props.getTappedUsers().then(() => {
      this.setState({ isLoading: false });
    });
  }

  handleClearFilter = () => {
    this.setState({
      startDate: null,
      endDate: null
    });
  }

  handleFilterToggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  handleFilterSubmit = () => {
    const selectedDateRange = {
      startDate: format(this.state.startDate, 'YYYY-MM-DD'),
      endDate: format(this.state.endDate, 'YYYY-MM-DD')
    };

    if (selectedDateRange.startDate > selectedDateRange.endDate) {
      return toast.error('The date should be greater than the start date', {
        position: toast.POSITION.TOP_CENTER
      });
    }

    this.setState({
      isLoading: true,
      isOpen: false,
    });

    this.props.getTappedUsers(selectedDateRange).then(() => {
      this.setState({ isLoading: false });
    });
  }

  handleStartDateChange = (date) => {
    this.setState({ startDate: date });
  }

  handleEndDateChange = (date) => {
    this.setState({ endDate: date });
  }

  renderFilterContent = () => (
    <div className="date-picker">
      <div>Start Date</div>
      <DatePicker
        onChange={this.handleStartDateChange}
        value={this.state.startDate}
        name="startDate"
      />
      <div>End Date</div>
      <DatePicker
        onChange={this.handleEndDateChange}
        value={this.state.endDate}
        name="endDate"
      />
    </div>
  );

  lineGraphData = ({ datesConsidered, tabbedUserCount }) => ({
    labels: datesConsidered,
    datasets: [
      {
        label: 'tabbed Users',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.8)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: tabbedUserCount
      }
    ]
  });

  renderLineGraph = () => {
    const datesConsidered = [];
    const tabbedUserCount = [];
    const options = {
      showScale: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 0.5,
          }
        }]
      }
    };

    this.props.report.data.map((data) => {
      datesConsidered.push(data.date);
      tabbedUserCount.push(data.count);
    });

    return (
      <Line
        data={this.lineGraphData({ datesConsidered, tabbedUserCount })}
        legend={{ position: 'bottom' }}
        height={150}
        options={options}
      />
    );
  }

  render() {
    return this.state.isLoading
      ? <Loader />
      : (
        <div className="tabbed-users">
          <div className="filter-hearder">
            <div className="heading-style">Tabbed users for {new Date().toDateString()}</div>
            <Filter
              handleFilterToggle={this.handleFilterToggle}
              isOpen={this.state.isOpen}
              handleFilterSubmit={this.handleFilterSubmit}
              handleClearFilter={this.handleClearFilter}
              renderFilterContent={this.renderFilterContent}
            />
          </div>
          <div className="graph">
            {this.renderLineGraph()}
          </div>
          <ToastContainer />
        </div>
      );
  }
}

const mapStateToProps = (state) => ({
  report: state.tappedUserReducer,
});

TappedUsers.propTypes = {
  getTappedUsers: PropTypes.func.isRequired,
  report: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getTappedUsers })(TappedUsers);
