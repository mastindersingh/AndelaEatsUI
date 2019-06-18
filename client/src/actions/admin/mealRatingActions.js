import axios from 'axios';

import {
  FETCH_MEAL_RATING_LOADING,
  FETCH_MEAL_RATING_SUCCESS,
  FETCH_MEAL_RATING_FAILURE,
} from '../actionTypes';


export const fetchMealRatingsLoading = () => ({
  type: FETCH_MEAL_RATING_LOADING,
});


export const fetchMealRatingsSuccess = (ratingList) => ({
  type: FETCH_MEAL_RATING_SUCCESS,
  payload: ratingList
});

export const fetchMealRatingsFailure = () => ({
  type: FETCH_MEAL_RATING_FAILURE,
});

export const fetchMealRatings = (date) => (dispatch) => {
  dispatch(fetchMealRatingsLoading());
  return axios.get(`/ratings/${date}`)
    .then(response => {
      const { payload: result } = response.data;
      dispatch(fetchMealRatingsSuccess(result));
    })
    .catch((error) => {
      dispatch(fetchMealRatingsFailure());
    });
};
