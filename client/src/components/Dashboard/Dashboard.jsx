import React, { Component } from 'react';
import '../../styles/components/_dashboard.scss';
import { Bar, Line } from 'react-chartjs-2';
import { connect } from "react-redux";
import fetchVendorPerformance from "../../actions/dashboardAction";
import PropTypes from "prop-types";
import Loader from "../common/Loader/Loader";

class Dashboard extends Component {

  generateBarGraphData =({datesConsidered, collectedOrders, uncollectedOrders, cancelledOrders})=>{
    return {
      labels: datesConsidered,
      datasets: [
        {
          label: 'collectedOrders',
          backgroundColor: 'rgba(39, 174, 96,0.8)',
          strokeColor: 'rgba(39, 174, 96,1)',
          pointColor: 'rgba(39, 174, 96,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(39, 174, 96,1)',
          data: collectedOrders,
        },
        {
          label: 'uncollectedOrders',
          backgroundColor: 'rgba(230, 126, 34,0.8)',
          strokeColor: 'rgba(151,187,205,1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)',
          data: uncollectedOrders,
        },
        {
          label: 'cancelledOrders',
          backgroundColor: 'rgba(231, 76, 60,0.8)',
          strokeColor: 'rgba(151,187,205,1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)',
          data: cancelledOrders,
        },
      ],
    };
  };

  generateLineGraphData =({datesConsidered, vendorRatings})=>{
    return {
      labels:datesConsidered,
      datasets:[
        {
          label: 'Vendor Ratings',
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
          data: vendorRatings
        }
      ]
    };

  };

  renderGraph =({type,data,vendorName})=>{
    return (
      <div className="charts-container">
      <div className="chart-card">
        <div className="chart-header">
          <p>{vendorName}</p>
        </div>
        <div className="chart-content">
          {type==='bar'?
            <Bar data={data} legend={{position:'bottom'}} height={100}/> :
            <Line data={data} legend={{position:'bottom'}} height={100} />
          }
        </div>
      </div>
    </div>
    );
  };

  render() {
    const {
      datesConsidered,
      uncollectedOrders,
      collectedOrders,
      cancelledOrders,
      vendorName,
      vendorRatings,
      isLoading} = this.props;
    const barGraphData = this.generateBarGraphData({datesConsidered,collectedOrders,uncollectedOrders,cancelledOrders});
    const lineGraphData= this.generateLineGraphData({datesConsidered, vendorRatings});
    return (
      <div className>
        {isLoading ? <Loader />:
          (
            <div>
              {this.renderGraph({type:'bar',data:barGraphData,vendorName})}
              {this.renderGraph({type:'line',data:lineGraphData,vendorName:vendorName+ "'s Ratings"})}
            </div>
          )}
      </div>
    );
  }
}

Dashboard.propTypes = {
  collectedOrders:  PropTypes.array,
  uncollectedOrders:  PropTypes.array,
  cancelledOrders:  PropTypes.array,
  datesConsidered:  PropTypes.array,
  vendorName: PropTypes.string,
  isLoading: PropTypes.bool,
  vendorRatings: PropTypes.array,
};

const mapStateToProps = state => ({
  collectedOrders: state.vendorPerformance.collectedOrders,
  uncollectedOrders: state.vendorPerformance.uncollectedOrders,
  cancelledOrders: state.vendorPerformance.cancelledOrders,
  datesConsidered: state.vendorPerformance.datesConsidered,
  vendorName: state.vendorPerformance.vendorName,
  isLoading: state.vendorPerformance.isLoading,
  vendorRatings: state.vendorPerformance.vendorRatings,
});

export default connect(mapStateToProps, fetchVendorPerformance)(Dashboard);
