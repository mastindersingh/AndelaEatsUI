import { 
  FETCH_SUSPENDED_VENDOR_LOADING, 
  FETCH_SUSPENDED_VENDOR_SUCCESS, 
  FETCH_SUSPENDED_VENDOR_FAILURE,
  UNSUSPEND_VENDOR_SUCCESS,
  UNSUSPEND_VENDOR_FAILURE,
  UNSUSPEND_VENDOR_LOADING
} from '../../actions/actionTypes';

import filter from '../../helpers/filter';
import { initialSuspendedVendors } from '../initialState';

const suspendedVendorReducer = (state = initialSuspendedVendors, action) => {
  switch (action.type) {
    case FETCH_SUSPENDED_VENDOR_LOADING:
      return { ...state, isLoading: action.payload };
    case FETCH_SUSPENDED_VENDOR_SUCCESS:
      return { ...state, vendors: action.payload };
    case UNSUSPEND_VENDOR_LOADING:
      return { ...state, isSuspending: action.payload };
    case UNSUSPEND_VENDOR_SUCCESS:
      return {
        ...state,
        vendors: filter(state.vendors, action.payload)
      };
    case FETCH_SUSPENDED_VENDOR_FAILURE:
    case UNSUSPEND_VENDOR_FAILURE:
      return state;
    default: 
      return state;
  }
};

export default suspendedVendorReducer;
