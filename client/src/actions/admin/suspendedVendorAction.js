import axios from 'axios';
import { toastSuccess, toastError } from '../../helpers/toast';
import { 
  FETCH_SUSPENDED_VENDOR_LOADING, 
  FETCH_SUSPENDED_VENDOR_SUCCESS, 
  FETCH_SUSPENDED_VENDOR_FAILURE,
  UNSUSPEND_VENDOR_LOADING,
  UNSUSPEND_VENDOR_SUCCESS,
  UNSUSPEND_VENDOR_FAILURE
} from '../actionTypes';

import { config } from '../../config';

export const baseUrl = config.ANDELAEATS_API_BASE_URL;

export const fetchSuspensionLoading = isLoading => ({
  type: FETCH_SUSPENDED_VENDOR_LOADING,
  payload: isLoading
});

export const fetchSuspensionSuccess = suspensions => ({
  type: FETCH_SUSPENDED_VENDOR_SUCCESS,
  payload: suspensions
});

export const fetchSuspensionFailure = error => ({
  type: FETCH_SUSPENDED_VENDOR_FAILURE,
  payload: error
});

export const fetchSuspensions = () => dispatch => {
  dispatch(fetchSuspensionLoading(true));

  return axios.get(`${baseUrl}/vendors/suspended/`)
    .then(response => {
      dispatch(fetchSuspensionSuccess(response.data.payload.vendors));
      dispatch(fetchSuspensionLoading(false));
    })
    .catch(error => {
      dispatch(fetchSuspensionFailure(error));
      dispatch(fetchSuspensionLoading(false));
    });
};


export const unsuspendVendorLoading = isLoading => ({
  type: UNSUSPEND_VENDOR_LOADING,
  payload: isLoading
});

export const unsuspendVendorSuccess = suspensions => ({
  type: UNSUSPEND_VENDOR_SUCCESS,
  payload: suspensions
});

export const unsuspendVendorFailure = error => ({
  type: UNSUSPEND_VENDOR_FAILURE,
  payload: error
});

export const unsuspendVendor = (vendorId) => dispatch => {
  dispatch(unsuspendVendorLoading(true));

  const url = `${baseUrl}/vendors/un_suspend/${vendorId}`;

  const options = {
    method: 'PATCH',
    url
  };

  return axios(options)
    .then((res) => {
      toastSuccess(res.data.msg);
      dispatch(unsuspendVendorSuccess(vendorId));
      dispatch(unsuspendVendorLoading(false));
    })
    .catch((error) => {
      toastError(error.response.data.message);
      dispatch(unsuspendVendorFailure(error));
      dispatch(unsuspendVendorLoading(false));
    });
};
