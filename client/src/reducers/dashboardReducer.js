import { initialVendorsPerformance } from './initialState';
import {
  FETCH_VENDOR_COLLECTED_ORDERS,
  FETCH_VENDOR_UNCOLLECTED_ORDERS,
  FETCH_VENDOR_CANCELED_ORDERS,
  VENDOR_PERFORMANCE_LOADING,
  FETCH_VENDOR_PERFORMANCE_FAILED,
  FETCH_VENDOR_PERFORMANCE_DATES, FETCH_VENDOR_NAME, FETCH_VENDOR_RATINGS,
} from "../actions/actionTypes";

const dashBoardReducer = (state = initialVendorsPerformance, action) => {
  switch (action.type) {
    case VENDOR_PERFORMANCE_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case FETCH_VENDOR_COLLECTED_ORDERS:
      return { ...state, collectedOrders: action.payload };
    case FETCH_VENDOR_UNCOLLECTED_ORDERS:
      return { ...state, uncollectedOrders: action.payload };
    case FETCH_VENDOR_CANCELED_ORDERS:
      return { ...state, cancelledOrders: action.payload };
    case FETCH_VENDOR_PERFORMANCE_FAILED:
      return { ...state, error: action.payload };
    case FETCH_VENDOR_PERFORMANCE_DATES:
      return { ...state, datesConsidered: action.payload };
    case FETCH_VENDOR_NAME:
      return { ...state, vendorName: action.payload };
    case FETCH_VENDOR_RATINGS:
      return { ...state, vendorRatings: action.payload };
    default:
      return state;
  }
};

export default dashBoardReducer;
