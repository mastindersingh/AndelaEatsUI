import {
  FETCH_VENDORS_LOADING,
  FETCH_VENDORS_SUCCESS,
  FETCH_VENDORS_FAILURE,
  CREATE_VENDOR_LOADING,
  CREATE_VENDOR_SUCCESS,
  CREATE_VENDOR_FAILURE,
  SUSPEND_VENDOR_SUCCESS,
  SUSPEND_VENDOR_FAILURE,
  SUSPEND_VENDOR_LOADING,
  UPDATE_VENDOR_SUCCESS,
  UPDATE_VENDOR_FAILURE,
  UPDATE_VENDOR_LOADING
} from '../actions/actionTypes';
import filter from '../helpers/filter';
import findIndex from '../helpers/findindex';

import { initialVendors } from './initialState';

let index;

const vendorsReducer = (state = initialVendors, action) => {
  switch (action.type) {
    case FETCH_VENDORS_LOADING:
      return { ...state, isLoading: action.payload };
    case FETCH_VENDORS_SUCCESS:
      return { ...state, vendors: action.payload };
    case CREATE_VENDOR_LOADING:
      return { ...state, isCreating: action.payload };
    case CREATE_VENDOR_SUCCESS:
      return { ...state, vendors: [...state.vendors, action.payload] };
    case SUSPEND_VENDOR_LOADING:
      return { ...state, isSuspending: action.payload };
    case SUSPEND_VENDOR_SUCCESS:
      return {
        ...state,
        vendors: filter(state.vendors, action.payload)
      };
    case UPDATE_VENDOR_SUCCESS:
      index = findIndex(state.vendors, action.payload.id);
      return {
        ...state,
        vendors: [
          ...state.vendors.slice(0, index),
          action.payload, 
          ...state.vendors.slice(index + 1)
        ]
      };
    case UPDATE_VENDOR_LOADING:
      return { ...state, isUpdating: action.payload };
    case FETCH_VENDORS_FAILURE:
    case CREATE_VENDOR_FAILURE:
    case SUSPEND_VENDOR_FAILURE:
    case UPDATE_VENDOR_FAILURE:
      return state;
    default:
      return state;
  }
};

export default vendorsReducer;
