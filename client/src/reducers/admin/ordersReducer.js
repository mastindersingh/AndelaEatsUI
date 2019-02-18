import {
  FETCH_MEAL_ORDERS_SUCCESS,
  FETCH_MEAL_ORDERS_FAILURE,
  FETCH_MEAL_ORDERS_LOADING,
  PAGINATION_CHANGE
} from '../../actions/actionTypes';

import { mealOrders } from '../initialState';

const vendorsReducer = (state = mealOrders, action) => {
  switch (action.type) {
    case FETCH_MEAL_ORDERS_LOADING:
      return { ...state, isLoading: action.payload };
    case FETCH_MEAL_ORDERS_SUCCESS:
      return { ...state, orders: action.payload };
    case PAGINATION_CHANGE:
      return { ...state, currentPage: action.payload }
    case FETCH_MEAL_ORDERS_FAILURE:
      return state;
    default:
      return state;
  }
};

export default vendorsReducer;
