import axios from 'axios';
import { toastSuccess, toastError } from '../helpers/toast';
import {
  FETCH_FAQS_SUCCESS,
  FETCH_FAQS_FAILURE,
  FETCH_FAQS_LOADING
} from './actionTypes';

export const fetchFaqsLoading = isLoading => ({
  type: FETCH_FAQS_LOADING,
  payload: isLoading
});

export const fetchFaqsSuccess = faqs => ({
  type: FETCH_FAQS_SUCCESS,
  payload: faqs,
});

export const fetchFaqsFailure = error => ({
  type: FETCH_FAQS_FAILURE,
  payload: error
});

export const fetchFaqs = () => dispatch => {
  dispatch(fetchFaqsLoading(true));

  return axios.get(`/faqs/`)
    .then((res) => {
      dispatch(fetchFaqsSuccess(res.data.payload.faqs));
      dispatch(fetchFaqsLoading(false));
    })
    .catch((error) => {
      dispatch(fetchFaqsFailure(error));
      dispatch(fetchFaqsLoading(false));
    });
};