import axios from 'axios';

import {
  FETCH_VENDOR_COLLECTED_ORDERS,
  FETCH_VENDOR_UNCOLLECTED_ORDERS,
  FETCH_VENDOR_CANCELED_ORDERS,
  VENDOR_PERFORMANCE_LOADING,
  FETCH_VENDOR_PERFORMANCE_FAILED,
  FETCH_VENDOR_PERFORMANCE_DATES,
  FETCH_VENDOR_NAME,
  FETCH_VENDOR_RATINGS,
} from "./actionTypes";

export const getKeyValues = (payload, key) => payload.map(data => {
  if (key === 'date') {
    const date = new Date(data[key]);
    return date.toDateString();
  } 
  return data[key] === null ? 0 : data[key];
});

export const fetchPerformanceLoading = isLoading => ({
  type: VENDOR_PERFORMANCE_LOADING,
  payload: isLoading,
});

export const fetchVendorName = vendorName => ({
  type: FETCH_VENDOR_NAME,
  payload: vendorName,
});


export const fetchPerformanceFailure = error => ({
  type: FETCH_VENDOR_PERFORMANCE_FAILED,
  payload: error,
});

export const fetchCollectedOrders = collectedOrders => ({
  type: FETCH_VENDOR_COLLECTED_ORDERS,
  payload: collectedOrders,
});

export const fetchUnCollectedOrders = unCollectedOrders => ({
  type: FETCH_VENDOR_UNCOLLECTED_ORDERS,
  payload: unCollectedOrders,
});

export const fetchCanceledOrders = canceledOrders => ({
  type: FETCH_VENDOR_CANCELED_ORDERS,
  payload: canceledOrders,
});

export const fetchConsideredDates = payload => ({
  type: FETCH_VENDOR_PERFORMANCE_DATES,
  payload,
});

export const fetchVendorRatings = payload => ({
  type: FETCH_VENDOR_RATINGS,
  payload
});

const fetchVendorPerformance = () => dispatch => {
  dispatch(fetchPerformanceLoading(true));
  return axios.get(`/reports/`)
    .then((res) => {
      const { payload } = res.data;
      const vendorName = payload[0].vendor.name;
      dispatch(fetchVendorName(vendorName));
      dispatch(fetchConsideredDates(getKeyValues(payload, 'date')));
      dispatch(fetchCollectedOrders(getKeyValues(payload, 'collectedOrders')));
      dispatch(fetchUnCollectedOrders(getKeyValues(payload, 'uncollectedOrders')));
      dispatch(fetchCanceledOrders(getKeyValues(payload, 'cancelledOrders')));
      dispatch(fetchVendorRatings(getKeyValues(payload, 'averageRating')));
      dispatch(fetchPerformanceLoading(false));
    })
    .catch((error) => {
      dispatch(fetchPerformanceFailure(error));
      dispatch(fetchPerformanceLoading(false));
    });
};

export default fetchVendorPerformance;
