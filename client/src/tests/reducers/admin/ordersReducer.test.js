/* eslint-disable no-undef */
import {
  FETCH_MEAL_ORDERS_LOADING,
  FETCH_MEAL_ORDERS_SUCCESS,
  FETCH_MEAL_ORDERS_FAILURE
} from '../../../actions/actionTypes';
import { mealOrders } from '../../../reducers/initialState';
import ordersReducer from '../../../reducers/admin/ordersReducer';
import orders from '../../__mocks__/mockOrders';

describe('Admin::Orders Reducer', () => {
  it('should return initial state', () => {
    expect(ordersReducer(undefined, {})).toEqual(mealOrders);
  });

  describe('FETCH_MEAL_ORDERS_LOADING', () => {
    it('should set isLoading state to true when making api request', () => {
      const action = {
        type: FETCH_MEAL_ORDERS_LOADING,
        payload: true,
      };

      const newState = ordersReducer(mealOrders, action);
      expect(newState.isLoading).toEqual(true);
    });

    it('should set isLoading state to false when request is resolved', () => {
      const action = {
        type: FETCH_MEAL_ORDERS_LOADING,
        payload: false,
      };

      const newState = ordersReducer(mealOrders, action);
      expect(newState.isLoading).toEqual(false);
    });
  });

  describe('FETCH_MEAL_ORDERS_SUCCESS', () => {
    it('should update the mealOrders state in the store', () => {
      const action = {
        type: FETCH_MEAL_ORDERS_SUCCESS,
        payload: orders,
      };

      const newState = ordersReducer(mealOrders, action);
      expect(newState.orders).toEqual(orders);
    });
  });

  describe('FETCH_MEAL_ORDERS_FAILURE', () => {
    it('should return the previous state of mealOrders in the store', () => {
      const action = {
        type: FETCH_MEAL_ORDERS_FAILURE,
        payload: {},
      };

      const newState = ordersReducer(mealOrders, action);
      expect(newState.orders).toEqual([]);
    });
  });
});
