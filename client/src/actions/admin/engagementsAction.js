import axios from 'axios';
import { toastSuccess, toastError } from '../../helpers/toast';
import {
  FETCH_VENDOR_ENGAGEMENT_SUCCESS,
  FETCH_VENDOR_ENGAGEMENT_FAILURE,
  FETCH_VENDOR_ENGAGEMENT_LOADING,
  FETCH_UPCOMING_VENDOR_ENGAGEMENTS_SUCCESS,
  CREATE_VENDOR_ENGAGEMENT_SUCCESS,
  CREATE_VENDOR_ENGAGEMENT_FAILURE,
  CREATE_VENDOR_ENGAGEMENT_LOADING,
  FETCH_VENDORS_SUCCESS,
  FETCH_VENDORS_FAILURE,
  DELETE_VENDOR_ENGAGEMENT_LOADING,
  DELETE_VENDOR_ENGAGEMENT_SUCCESS,
  DELETE_VENDOR_ENGAGEMENT_FAILURE,
  EDIT_VENDOR_ENGAGEMENT_LOADING,
  EDIT_VENDOR_ENGAGEMENT_SUCCESS,
  EDIT_VENDOR_ENGAGEMENT_FAILURE
} from "../actionTypes";


export const fetchEngagementsLoading = isLoading => ({
  type: FETCH_VENDOR_ENGAGEMENT_LOADING,
  payload: isLoading
});

export const fetchEngagementsSuccess = engagements => ({
  type: FETCH_VENDOR_ENGAGEMENT_SUCCESS,
  payload: engagements
});

export const fetchEngagementsFailure = error => ({
  type: FETCH_VENDOR_ENGAGEMENT_FAILURE,
  payload: error
});

export const fetchUpcomingEngagementsSuccess = engagements => ({
  type: FETCH_UPCOMING_VENDOR_ENGAGEMENTS_SUCCESS,
  payload: engagements,
});

export const fetchUpcomingEngagements = () => dispatch => {
  dispatch(fetchEngagementsLoading(true));

  return axios.get(`/engagements/upcoming`)
    .then(response => {
      dispatch(fetchUpcomingEngagementsSuccess(response.data.payload));
      dispatch(fetchEngagementsLoading(false));
    })
    .catch(error => {
      dispatch(fetchEngagementsLoading(false));
      dispatch(fetchEngagementsFailure(error));
    });
};

export const fetchEngagements = () => dispatch => {
  dispatch(fetchEngagementsLoading(true));

  return axios.get(`/engagements/`)
    .then(response => {
      dispatch(fetchEngagementsSuccess(response.data.payload.engagements));
      dispatch(fetchEngagementsLoading(false));
    })
    .catch(error => {
      dispatch(fetchEngagementsFailure(error));
      dispatch(fetchEngagementsLoading(false));
    });
};

export const fetchVendorsSuccess = vendors => ({
  type: FETCH_VENDORS_SUCCESS,
  payload: vendors,
});

export const fetchVendorsFailure = error => ({
  type: FETCH_VENDORS_FAILURE,
  payload: error
});

export const fetchVendors = () => dispatch => axios.get(`/vendors/`)
  .then((res) => {
    dispatch(fetchVendorsSuccess(res.data.payload.vendors));
  })
  .catch((error) => {
    dispatch(fetchVendorsFailure(error));
  });

export const createEngagementsLoading = isLoading => ({
  type: CREATE_VENDOR_ENGAGEMENT_LOADING,
  payload: isLoading
});

export const createEngagementsSuccess = engagement => ({
  type: CREATE_VENDOR_ENGAGEMENT_SUCCESS,
  payload: engagement
});

export const createEngagementFailure = error => ({
  type: CREATE_VENDOR_ENGAGEMENT_FAILURE,
  payload: error
});

export const createEngagement = engagementDetails => dispatch => {
  dispatch(createEngagementsLoading(true));

  const url = `/engagements/`;

  const options = {
    method: 'POST',
    data: engagementDetails,
    url
  };

  return axios(options)
    .then(response => {
      const { msg: message, payload: { engagement } } = response.data;
      toastSuccess('New engagement added successfully');
      dispatch(createEngagementsSuccess(engagement));
      dispatch(createEngagementsLoading(false));
    })
    .catch(error => {
      toastError(error.response.data.msg);
      dispatch(createEngagementFailure(error));
      dispatch(createEngagementsLoading(false));
    });
};


export const deleteEngagementsLoading = isLoading => ({
  type: DELETE_VENDOR_ENGAGEMENT_LOADING,
  payload: isLoading
});

export const deleteEngagementsSuccess = engagement => ({
  type: DELETE_VENDOR_ENGAGEMENT_SUCCESS,
  payload: engagement
});

export const deleteEngagementFailure = error => ({
  type: DELETE_VENDOR_ENGAGEMENT_FAILURE,
  payload: error
});


export const deleteEngagement = (engagementId) => dispatch => {
  dispatch(deleteEngagementsLoading(true));

  return axios.delete(`/engagements/${engagementId}`)
    .then((res) => {
      toastSuccess('Engagement deleted successfully');
      dispatch(deleteEngagementsSuccess(engagementId));
      dispatch(deleteEngagementsLoading(false));
    })
    .catch((error) => {
      toastError(error.response.data.msg);
      dispatch(deleteEngagementFailure(error));
      dispatch(deleteEngagementsLoading(false));
    });
};


export const editEngagementsLoading = isLoading => ({
  type: EDIT_VENDOR_ENGAGEMENT_LOADING,
  payload: isLoading
});

export const editEngagementsSuccess = engagement => ({
  type: EDIT_VENDOR_ENGAGEMENT_SUCCESS,
  payload: engagement
});

export const editEngagementFailure = error => ({
  type: EDIT_VENDOR_ENGAGEMENT_FAILURE,
  payload: error
});

export const editEngagement = (engagementId, engagementDetails) => dispatch => {
  dispatch(editEngagementsLoading(true));

  const url = `/engagements/${engagementId}`;

  const options = {
    method: 'PATCH',
    data: engagementDetails,
    url
  };

  return axios(options)
    .then(response => {
      const { payload: { engagement } } = response.data;
      toastSuccess('Engagement edited successfully');
      dispatch(editEngagementsSuccess(engagement));
      dispatch(editEngagementsLoading(false));
    })
    .catch(error => {
      toastError(error);
      dispatch(editEngagementFailure(error));
      dispatch(editEngagementsLoading(false));
    });
};