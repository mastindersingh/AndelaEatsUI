import axios from 'axios';
import { toastSuccess, toastError } from '../helpers/toast';
import {
  FETCH_ABOUT_SUCCESS,
  FETCH_ABOUT_FAILURE,
  FETCH_ABOUT_LOADING,
  UPDATE_ABOUT_SUCCESS,
  UPDATE_ABOUT_FAILURE,
  UPDATE_ABOUT_LOADING
} from './actionTypes';

export const fetchAboutLoading = isLoading => ({
  type: FETCH_ABOUT_LOADING,
  payload: isLoading
});

export const fetchAboutSuccess = about => ({
  type: FETCH_ABOUT_SUCCESS,
  payload: about
});

export const fetchAboutFailure = error => ({
  type: FETCH_ABOUT_FAILURE,
  payload: error
});

export const fetchAbout = () => dispatch => {
  dispatch(fetchAboutLoading(true));

  return axios
    .get(`/about/view`)
    .then(res => {
      dispatch(fetchAboutSuccess(res.data.payload.data));
      dispatch(fetchAboutLoading(false));
    })
    .catch(error => {
      dispatch(fetchAboutFailure(error));
      dispatch(fetchAboutLoading(false));
    });
};

export const updateAboutLoading = isUpdating => ({
  type: UPDATE_ABOUT_LOADING,
  payload: isUpdating
});

export const updateAboutSuccess = about => ({
  type: UPDATE_ABOUT_SUCCESS,
  payload: about
});

export const updateAboutFailure = error => ({
  type: UPDATE_ABOUT_FAILURE,
  payload: error
});

export const updateAbout = (aboutDetails) => dispatch => {
  dispatch(updateAboutLoading(true));
  const url = '/about/create_or_update';

  const options = {
    method: 'POST',
    data: { data: aboutDetails.details },
    url
  };

  return axios(options)
    .then(res => {
      const {
        msg: message,
        payload: { data }
      } = res.data;
      toastSuccess('Content updated successfully');
      dispatch(updateAboutSuccess(data));
      dispatch(updateAboutLoading(false));
    })
    .catch(error => {
      toastError(error.response.data.msg);
      dispatch(updateAboutFailure(error));
      dispatch(updateAboutLoading(false));
    });
};
