/* eslint-disable no-undef */
import {
  SHOW_MEAL_SESSION_MODAL,
  HIDE_MEAL_SESSION_MODAL,
} from '../../../actions/actionTypes';

import mealSessionsReducer from '../../../reducers/admin/mealSessionsReducer';

import { initialMealSessions } from '../../../reducers/initialState';

describe('Admin: Meal sessions', () => {
  let newState, action;

  it('should return initial state', () => {
    expect(mealSessionsReducer(initialMealSessions, {})).toEqual(
      initialMealSessions
    );
  });

  it('should return the state to show the model', () => {
    newState = { mealSessionModal: { show: true, edit: true } };
    action = {
      type: SHOW_MEAL_SESSION_MODAL,
      payload: { show: true, edit: true },
    };
    expect(mealSessionsReducer(initialMealSessions, action)).toEqual(newState);
  });

  it('should return the state to hide the model', () => {
    newState = { mealSessionModal: { show: false, edit: false } };
    action = {
      type: HIDE_MEAL_SESSION_MODAL,
      payload: { show: false },
    };
    expect(mealSessionsReducer(initialMealSessions, action)).toEqual(newState);
  });
});
