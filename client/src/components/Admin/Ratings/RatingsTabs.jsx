import React, { Component, Fragment } from 'react';

import Tabs from '../../common/Tab/Index';
import ReactStars from 'react-stars';
import { userRatings } from '../../../store/Ratings';


class RatingsTabs extends Component {
  render() {
    let results = [userRatings.result];
    let me = "jksdkdk";
    console.log(userRatings);
    
    return (
      <div>
      
          <Tabs>
            <div label={me}>
            </div>
            <div label="ghjk">
            </div>
          </Tabs>
        <div className="rating-container" label="Rice">
          <h1 className="rating-sub-title">Main Meal Rated: {userRatings.result[0].mainMeal}</h1>
          <h1 className="vendor-name rating-sub-title">Vendor: {userRatings.vendor}</h1>
          <hr className="line-style" />
          <span><br />Overall Rating:</span>
          <ReactStars
            value={userRatings.result[0].overallRating}
            color2="green"
            name="ratings"
            size={12}
            edit={false}
            />
          <br /><br /><br />
          <span><strong>Comments</strong></span><br/><br/>
          <div className="comments-row">
            <span>Awesome!</span><br /><br />
            <ReactStars
            value={4}
            color2="green"
            name="ratings"
            size={12}
            edit={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RatingsTabs;
