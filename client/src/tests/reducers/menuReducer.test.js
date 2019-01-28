import menuReducer from '../../reducers/menuReducer';
import { initialMenus } from '../../reducers/initialState';
import {
  SET_MENUS, SELECT_MEAL, MAKE_ORDER_SUCCESS, MAKE_ORDER_FAILURE, RESET_MENU, MENU_IS_LOADING
} from '../../actions/actionTypes';

/* 
global jest 
expect 
*/
describe('Menu Reducers', () => {
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
});