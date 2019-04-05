import axios from 'axios';
import { toastSuccess, toastError } from '../helpers/toast';
import {
  FETCH_FAQS_SUCCESS,
  FETCH_FAQS_FAILURE,
  FETCH_FAQS_LOADING,
  CREATE_FAQ_SUCCESS,
  CREATE_FAQ_FAILURE,
  CREATE_FAQ_LOADING,
  DELETE_FAQ_SUCCESS,
  DELETE_FAQ_FAILURE,
  DELETE_FAQ_LOADING,
  UPDATE_FAQ_SUCCESS,
  UPDATE_FAQ_FAILURE,
  UPDATE_FAQ_LOADING
} from './actionTypes';

export const fetchFaqsLoading = isLoading => ({
  type: FETCH_FAQS_LOADING,
  payload: isLoading
});

export const fetchFaqsSuccess = faqs => ({
  type: FETCH_FAQS_SUCCESS,
  payload: faqs
});

export const fetchFaqsFailure = error => ({
  type: FETCH_FAQS_FAILURE,
  payload: error
});

export const fetchFaqs = () => dispatch => {
  dispatch(fetchFaqsLoading(true));

  return axios
    .get(`/faqs/`)
    .then(res => {
      dispatch(fetchFaqsSuccess(res.data.payload.faqs));
      dispatch(fetchFaqsLoading(false));
    })
    .catch(error => {
      dispatch(fetchFaqsFailure(error));
      dispatch(fetchFaqsLoading(false));
    });
};

export const createFaqLoading = isCreating => ({
  type: CREATE_FAQ_LOADING,
  payload: isCreating
});

export const createFaqSuccess = faq => ({
  type: CREATE_FAQ_SUCCESS,
  payload: faq
});

export const createFaqFailure = error => ({
  type: CREATE_FAQ_FAILURE,
  payload: error
});

export const createFaq = faqDetails => dispatch => {
  dispatch(createFaqLoading(true));

  const url = `/faqs/`;

  const options = {
    method: 'POST',
    data: faqDetails,
    url
  };

  return axios(options)
    .then(res => {
      const {
        msg: message,
        payload: { faq }
      } = res.data;
      toastSuccess(message);
      dispatch(createFaqSuccess(faq));
      dispatch(createFaqLoading(false));
    })
    .catch(error => {
      toastError(error.response.data.msg);
      dispatch(createFaqFailure(error));
      dispatch(createFaqLoading(false));
    });
};

export const deleteFaqLoading = isDeleteing => ({
  type: DELETE_FAQ_LOADING,
  payload: isDeleteing
});

export const deleteFaqSuccess = faqId => ({
  type: DELETE_FAQ_SUCCESS,
  payload: faqId
});

export const deleteFaqFailure = error => ({
  type: DELETE_FAQ_FAILURE,
  payload: error
});

export const deleteFaq = faqId => dispatch => {
  dispatch(deleteFaqLoading(true));

  const url = `/faqs/${faqId}`;

  const options = {
    method: 'DELETE',
    url
  };

  return axios(options)
    .then(res => {
      toastSuccess(res.data.msg);
      dispatch(deleteFaqSuccess(faqId));
      dispatch(deleteFaqLoading(false));
    })
    .catch(error => {
      toastError(error.response.data.msg);
      dispatch(deleteFaqFailure(error));
      dispatch(deleteFaqLoading(false));
    });
};

export const updateFaqLoading = isUpdating => ({
  type: UPDATE_FAQ_LOADING,
  payload: isUpdating
});

export const updateFaqSuccess = faq => ({
  type: UPDATE_FAQ_SUCCESS,
  payload: faq
});

export const updateFaqFailure = error => ({
  type: UPDATE_FAQ_FAILURE,
  payload: error
});

export const updateFaq = (id, faqDetails) => dispatch => {
  dispatch(updateFaqLoading(true));
  const url = `/faqs/${id}`;

  const options = {
    method: 'PUT',
    data: faqDetails,
    url
  };

  return axios(options)
    .then(res => {
      const {
        msg: message,
        payload: { faq }
      } = res.data;
      toastSuccess(message);
      dispatch(updateFaqSuccess(faq));
      dispatch(updateFaqLoading(false));
    })
    .catch(error => {
      toastError(error.response.data.msg);
      dispatch(updateFaqFailure(error));
      dispatch(updateFaqLoading(false));
    });
};
