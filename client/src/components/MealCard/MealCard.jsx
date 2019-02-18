import React from 'react';
import PropTypes from 'prop-types';
import CollectedAction from './CollectedAction';
import NotCollectedAction from './NotCollectedAction';
import { format } from 'date-fns';

const MealCard = ({ meal: { id, dateBookedFor, mealItems, orderStatus }, showModal, meal, showRatingModal }) => (
  <div className="card-container">
    <div className="card-image" style={{ backgroundImage: `url(${mealItems[0].image})`}}>
      <p className={`order-id ${orderStatus === 'collected' ?
        'collected' : orderStatus === 'booked' ?
        'not-collected' : 'cancelled'}`}
      >
        {`#${id}`}
      </p>
    </div>
    <div>
      <div className="card-details">
        <div className="main">
          <p className="heading">{`${mealItems[0].name}, ${mealItems[1].name}, ${mealItems[2].name}`}</p>
          <p>
            <span className="sub-head">Order date&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="heading">{format(dateBookedFor, "dddd MMMM D")}</span>
          </p>
        </div>

        {orderStatus !== "booked"
          ? (
            <CollectedAction
              id={id}
              rating={3}
              meal={meal}
              showRatingModal={showRatingModal}
            />
          )
          : (
            <NotCollectedAction
              id={id}
              meal={meal}
              showModal={showModal}
            />
          )}
      </div>
    </div>
  </div>
);

MealCard.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.number,
    isCollected: PropTypes.bool,
    dateBookedFor: PropTypes.string,
    mealItems: PropTypes.array,
    imageUrl: PropTypes.string,
    orderStatus: PropTypes.string,
    rating: PropTypes.number
  }),
  showModal: PropTypes.func
};

export default MealCard;
