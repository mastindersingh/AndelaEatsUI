import React, { Component, Fragment } from 'react';

import Tabs from '../../common/Tab/Index';
import ReactStars from 'react-stars';
import { userRatings } from '../../../store/Ratings';


class RatingsTabs extends Component {
  render() {

    return (
      <div>
        <Tabs>
          {userRatings.result.map((mealObject, key) => (
            <div key={key} label={mealObject.mainMeal}>
              <div className="rating-container" label="Rice">
              <h1 className="rating-sub-title">Main Meal Rated: {mealObject.mainMeal}</h1>
              <h1 className="vendor-name rating-sub-title">Vendor: {userRatings.vendor}</h1>
              <hr className="line-style" />
              <span><br />Overall Rating:</span>
              <ReactStars
                value={mealObject.overallRating}
                color2= {mealObject.overallRating <= 3 ? "orange" : "green"}
                name="ratings"
                size={12}
                edit={false}
                />
              <br /><br /><br />
              <span><strong>Comments</strong></span><br/><br/>
              {
                mealObject.items.map((itemObject, key) => (
                  <div key={key} className="comments-row">
                    <span>{itemObject.comment}</span>
                    <ReactStars
                    value={itemObject.rating}
                    color2={itemObject.rating <= 3 ? "orange" : "green"}
                    name="ratings"
                    size={12}
                    edit={false}
                    />
                </div>
              ))}
              </div>
            </div>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default RatingsTabs;
