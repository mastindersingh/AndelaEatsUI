import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';

import { fetchMealRatings } from '../../../actions/admin/mealRatingActions';
import Loader from '../../common/Loader/Loader';
import EmptyContent from '../../common/EmptyContent';

/**
 * Reports class
 */
export class Reports extends Component {
  state = {}

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  render() {
    return (
      <Fragment>
      <hr className="line"/>
        
      </Fragment>
    )
  }
};


export default connect(null, {})(Reports);
