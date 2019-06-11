import menuReducer from '../../reducers/menuReducer';
import { initialMenus } from '../../reducers/initialState';
import {
  SET_MENUS, SELECT_MEAL,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILURE,
  RESET_MENU,
  MENU_IS_LOADING,
  FETCH_USERS_MENU_LOADING,
  FETCH_USERS_MENU_SUCCESS,
  FETCH_ORDERS_LOADING,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE
} from '../../actions/actionTypes';

/*
global jest
expect
*/
describe('Menu Reducers', () => {
  it('should return initial state', () => {
    expect(menuReducer(undefined, {})).toEqual(initialMenus);
  });

  it('SET_MENUS: should set upcoming menus to state', () => {
    const payload = [
      {
        id: 1,
        meal: 'eba'
      }
    ];
    const action = {
      type: SET_MENUS,
      payload
    };
    const newState = menuReducer(initialMenus, action);
    expect(newState.menus).toEqual(action.payload);
  });
  it('SELECT_MEAL: should set selected meal to state', () => {
    const payload = {
      prop: 'mainMeal',
      value: 1
    };
    const action = {
      type: SELECT_MEAL,
      payload
    };
    const newState = menuReducer(initialMenus, action);
    expect(newState.mainMeal).toEqual(action.payload.value);
  });
  it('MAKE_ORDER_SUCCESS: should set message to state', () => {
    const payload = {
      message: 'Your order has been placed'
    };
    const action = {
      type: MAKE_ORDER_SUCCESS,
      payload
    };
    const newState = menuReducer(initialMenus, action);
    expect(newState.message).toEqual(action.payload.message);
  });
  it('MAKE_ORDER_FAILURE: should set message to state', () => {
    const payload = {
      message: 'An error has occured'
    };
    const action = {
      type: MAKE_ORDER_FAILURE,
      payload
    };
    const newState = menuReducer(initialMenus, action);
    expect(newState.message).toEqual(action.payload.message);
  });
  it('MENU_IS_LOADING: should set isLoding state', () => {
    const action = {
      type: MENU_IS_LOADING,
      payload: true
    };
    const newState = menuReducer(initialMenus, action);
    expect(newState.isLoading).toEqual(action.payload);
  });
  it('RESET_MENU: should reset state', () => {
    const payload = {
      message: '',
      acc1: '',
      acc2: '',
      mainMeal: ''
    };
    const action = {
      type: RESET_MENU,
      payload
    };
    const newState = menuReducer(initialMenus, action);
    expect(newState.message).toEqual(action.payload.message);
    expect(newState.acc1).toEqual(action.payload.acc1);
    expect(newState.acc2).toEqual(action.payload.acc2);
  });

  it('FETCH_USERS_MENU_LOADING: should set isLoading state', () => {
    const action = {
      type: FETCH_USERS_MENU_LOADING,
      payload: true
    };
    const newState = menuReducer(initialMenus, action);

    expect(newState.isLoading).toEqual(action.payload);
  });

  it('FETCH_USERS_MENU_SUCCESS: should fetch menus successfully', () => {
    const action = {
      type: FETCH_USERS_MENU_SUCCESS,
      payload: ["menu1", "menu2"]
    };
    const newState = menuReducer(initialMenus, action);

    expect(newState.menus).toEqual(action.payload);
  });

  it('FETCH_ORDERS_LOADING: should set isLoading state', () => {
    const action = {
      type: FETCH_ORDERS_LOADING,
      payload: true
    };
    const newState = menuReducer(initialMenus, action);

    expect(newState.isLoading).toEqual(action.payload);
  });

  it('FETCH_ORDERS_SUCCESS: should set isLoading state', () => {
    const action = {
      type: FETCH_ORDERS_SUCCESS,
      payload: ["menu1", "menu2"]
    };
    const newState = menuReducer(initialMenus, action);

    expect(newState.orderedMenus).toEqual(action.payload);
  });

  it('FETCH_ORDERS_FAILURE: should return initial statee', () => {
    const payload = {
      orderedMenus: "an error occured"
    };
    const action = {
      type: FETCH_ORDERS_FAILURE,
      payload
    };
    const newState = menuReducer(initialMenus, action);

    expect(newState).toEqual(initialMenus);
  });
});