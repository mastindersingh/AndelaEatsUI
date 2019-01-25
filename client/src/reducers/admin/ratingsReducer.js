import {
  FETCH_MEAL_RATING_LOADING,
  FETCH_MEAL_RATING_SUCCESS,
  FETCH_MEAL_RATING_FAILURE,
} from '../../actions/actionTypes';

import { intialMealRatings } from '../initialState';

const mealRatingsReducer = (state = intialMealRatings, action) => {
  switch (action.type) {
    case FETCH_MEAL_RATING_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_MEAL_RATING_SUCCESS:
      return {
        ...state,
        ratingList: action.payload,
        isLoading: false,
      };
    case FETCH_MEAL_RATING_FAILURE:
      return state;
    default:
      return state;
  }
};

export default mealRatingsReducer;
