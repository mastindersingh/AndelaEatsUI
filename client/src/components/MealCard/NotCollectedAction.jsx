import React from 'react';
import PropTypes from 'prop-types';
import { isFuture } from 'date-fns';
import { Link } from 'react-router-dom';


const NotCollectedAction = ({
  meal, showModal, edit
}) => (
  <div className="card-action not-collected">
    <div>
      <p className="sub-head">Status</p>
      <span className="heading">Not Collected</span>
    </div>
    <div className="item">
      <p className="sub-head">Order options</p>
      <div className="button-group">
        {isFuture(new Date(meal.dateBookedFor))
          ? (
            <React.Fragment>
              <Link
                to={{
                  pathname:`/orders/edit/${meal.id}/${meal.dateBookedFor}`,
                  date: meal.dateBookedFor,
                }}
                className="button test rate-button"
                tabIndex="0"
              > Edit
              </Link>
              <a
                className="button test"
                role="button"
                tabIndex="0"
                onClick={() => showModal(meal, 'Delete Order', edit=false)}
              > Delete
              </a>
            </React.Fragment>
          )
          : (
            <a
              className="button test rate-button"
              role="button"
              tabIndex="0"
              onClick={() => showModal(meal, 'Collect Order', edit=false)}
            > Collect
            </a>
          )
        }
      </div>
    </div>
  </div>
);

NotCollectedAction.propTypes = {
  meal: PropTypes.shape({
    mealItems: PropTypes.array,
    rating: PropTypes.number
  }),
  showModal: PropTypes.func,
  edit: PropTypes.bool,
};

export default NotCollectedAction;
