import axios from 'axios';
import { toastSuccess, toastError } from '../helpers/toast';
import {
  FETCH_VENDORS_SUCCESS,
  FETCH_VENDORS_FAILURE,
  FETCH_VENDORS_LOADING,
  CREATE_VENDOR_SUCCESS,
  CREATE_VENDOR_FAILURE,
  CREATE_VENDOR_LOADING,
  SUSPEND_VENDOR_SUCCESS,
  SUSPEND_VENDOR_FAILURE,
  SUSPEND_VENDOR_LOADING,
  UPDATE_VENDOR_SUCCESS,
  UPDATE_VENDOR_FAILURE,
  UPDATE_VENDOR_LOADING
} from './actionTypes';

import { config } from '../config';

export const baseUrl = config.ANDELAEATS_API_BASE_URL;

export const fetchVendorsLoading = isLoading => ({
  type: FETCH_VENDORS_LOADING,
  payload: isLoading
});

export const fetchVendorsSuccess = vendors => ({
  type: FETCH_VENDORS_SUCCESS,
  payload: vendors,
});

export const fetchVendorsFailure = error => ({
  type: FETCH_VENDORS_FAILURE,
  payload: error
});

export const fetchVendors = () => dispatch => {
  dispatch(fetchVendorsLoading(true));

  return axios.get(`${baseUrl}/vendors/`)
    .then((res) => {
      dispatch(fetchVendorsSuccess(res.data.payload.vendors));
      dispatch(fetchVendorsLoading(false));
    })
    .catch((error) => {
      dispatch(fetchVendorsFailure(error));
      dispatch(fetchVendorsLoading(false));
    });
};

export const createVendorLoading = isCreating => ({
  type: CREATE_VENDOR_LOADING,
  payload: isCreating
});

export const createVendorSuccess = vendor => ({
  type: CREATE_VENDOR_SUCCESS,
  payload: vendor
});

export const createVendorFailure = error => ({
  type: CREATE_VENDOR_FAILURE,
  payload: error
});


export const createVendor = (vendorDetails) => dispatch => {
  dispatch(createVendorLoading(true));

  const url = `${baseUrl}/vendors/`;

  const options = {
    method: 'POST',
    data: vendorDetails,
    url
  };

  return axios(options)
    .then((res) => {
      const { msg: message, payload: { vendor } } = res.data;
      toastSuccess(message);
      dispatch(createVendorSuccess(vendor));
      dispatch(createVendorLoading(false));
    })
    .catch((error) => {
      toastError(error.response.data.message);
      dispatch(createVendorFailure(error));
      dispatch(createVendorLoading(false));
    });
};


export const suspendVendorLoading = isSuspending => ({
  type: SUSPEND_VENDOR_LOADING,
  payload: isSuspending
});


export const suspendVendorSuccess = vendorId => ({
  type: SUSPEND_VENDOR_SUCCESS,
  payload: vendorId
});

export const suspendVendorFailure = error => ({
  type: SUSPEND_VENDOR_FAILURE,
  payload: error
});


export const suspendVendor = (vendorId) => dispatch => {
  dispatch(suspendVendorLoading(true));

  const url = `${baseUrl}/vendors/suspend/${vendorId}`;

  const options = {
    method: 'PATCH',
    url
  };

  return axios(options)
    .then((res) => {
      toastSuccess(res.data.msg);
      dispatch(suspendVendorSuccess(vendorId));
      dispatch(suspendVendorLoading(false));
    })
    .catch((error) => {
      toastError(error.response.data.message);
      dispatch(suspendVendorFailure(error));
      dispatch(suspendVendorLoading(false));
    });
};


export const updateVendorLoading = isUpdating => ({
  type: UPDATE_VENDOR_LOADING,
  payload: isUpdating
});


export const updateVendorSuccess = vendor => ({
  type: UPDATE_VENDOR_SUCCESS,
  payload: vendor
});

export const updateVendorFailure = error => ({
  type: UPDATE_VENDOR_FAILURE,
  payload: error
});


export const updateVendor = (id, vendorDetails) => dispatch => {
  dispatch(updateVendorLoading(true));

  const url = `${baseUrl}/vendors/${id}`;

  const options = {
    method: 'PUT',
    data: vendorDetails,
    url
  };

  return axios(options)
    .then((res) => {
      const { msg: message, payload: { vendor } } = res.data;
      toastSuccess(message);
      dispatch(updateVendorSuccess(vendor));
      dispatch(updateVendorLoading(false));
    })
    .catch((error) => {
      toastError(error.response.data.message);
      dispatch(updateVendorFailure(error));
      dispatch(updateVendorLoading(false));
    });
};
