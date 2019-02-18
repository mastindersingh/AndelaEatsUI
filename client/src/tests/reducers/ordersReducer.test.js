import { orders } from "../../reducers/initialState";
import ordersReducer from "../../reducers/ordersReducer";
import {
  FETCH_ORDERS_LOADING,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_FILTERED_ORDERS,
  DELETE_ORDER_SUCCESS,
  EDIT_ORDER_SUCCESS,
  UPDATE_ORDER_SUCCESS,
  GET_ORDER_SUCCESS
} from "../../actions/actionTypes";

/* 
global jest 
expect 
*/
describe('Past Orders Reducer', () => {
  describe('FETCH_ORDERS_* action group', () => {
    it('_LOADING :: should set isLoading property', () => {
      const action = {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      };
      const newState = ordersReducer(orders, action);
      expect(newState.isLoading).toEqual(true);
    });
    it('_SUCCESS :: should set orders properties', () => {
      const action = {
        type: FETCH_ORDERS_SUCCESS,
        orders: {
          totalRecords: 1,
          currentPage: 1,
          meals: [{ name: "sweet food" }]
        }
      };
      const newState = ordersReducer(orders, action);
      expect(newState.currentPage).toEqual(1);
      expect(newState.meals).toEqual(action.orders.meals);
    });
    it('_FAILURE :: should set error property/properties', () => {
      const action = {
        type: FETCH_ORDERS_FAILURE,
        error: new Error("Unable to fetch data")
      };
      const newState = ordersReducer(orders, action);
      expect(newState.error).toEqual(action.error);
    });
  });

  describe('EDIT', () => {
    it('_SUCCESS :: should edit successfully', () => {
      const action = {
        type: EDIT_ORDER_SUCCESS,
        id: 123
      };
      const newState = ordersReducer(orders, action);
      expect(newState.currentPage).toEqual(1);
    });
  });

  describe('UPDATE', () => {
    it('_SUCCESS :: should update successfully', () => {
      const action = {
        type: UPDATE_ORDER_SUCCESS,
        id: 123
      };
      const newState = ordersReducer(orders, action);
      expect(newState.currentPage).toEqual(1);
    });
  });


  describe('DELETE', () => {
    it('_SUCCESS :: should delete successfully', () => {
      const action = {
        type: DELETE_ORDER_SUCCESS,
        id: 123
      };
      const newState = ordersReducer({
        ...orders, orders: []
      }, action);
      expect(newState.currentPage).toEqual(1);
      expect(newState.totalRecords).toEqual(-1);
      expect(newState.orders).toEqual([]);
    });
  });

  describe('FETCH_FILTERED_ORDERS action', () => {
    it('should set filtered orders when successful', () => {
      const action = {
        type: FETCH_FILTERED_ORDERS,
        orders: {
          totalRecords: 1,
          currentPage: 1,
          meals: [{ name: "sweet food" }]
        }
      };
      const newState = ordersReducer(orders, action);
      expect(newState.currentPage).toEqual(1);
      expect(newState.meals).toEqual(action.orders.meals);
      expect(newState.isFiltered).toEqual(true);
    });
  });

  describe('GET_ORDER_SUCCESS action', () => {
    it('should set menu/order when successful', () => {
      const action = {
        type: GET_ORDER_SUCCESS,
        order: {
          id: 201
        }
      };
      const newState = ordersReducer(orders, action);
      expect(newState.menu.id).toEqual(201);
    });
  });

  it('should return default state for unlisted initial state/action type', () => { //eslint-disable-line
    const action = {
      type: 'FETCH_ME',
    };
    const newState = ordersReducer(undefined, action);
    expect(newState).toEqual(orders);
  });
});
