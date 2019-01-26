/* eslint-disable no-undef */
import {
  FETCH_MEAL_RATING_LOADING,
  FETCH_MEAL_RATING_FAILURE,
  FETCH_MEAL_RATING_SUCCESS
} from '../../../actions/actionTypes';

import mealRatingsReducer from '../../../reducers/admin/ratingsReducer';

import { initialMealRatings } from '../../../reducers/initialState';

describe('Admin: Meal ratings', () => {
  let newState, action;
  it('should return initial state', () => {
    expect(mealRatingsReducer(undefined, {}))
      .toEqual(initialMealRatings);
  });

  describe('FETCH_MEAL_RATING_LOADING', () => {
    action = {
      type: FETCH_MEAL_RATING_LOADING,
    };
    newState = mealRatingsReducer(initialMealRatings, action);
    expect(newState.isLoading).toBe(true);
  });

  describe('FETCH_MEAL_RATING_SUCCESS', () => {
    action = {
      type: FETCH_MEAL_RATING_SUCCESS,
      payload: {},
    };
    newState = mealRatingsReducer(initialMealRatings, action);
    expect(newState.ratingList.length).toEqual(1);
  });

  describe('FETCH_MEAL_RATING_FAILURE', () => {
    action = {
      type: FETCH_MEAL_RATING_FAILURE,
      payload: {},
    };
    newState = mealRatingsReducer(initialMealRatings, action);
  });
  expect(newState).toEqual(initialMealRatings);
});
