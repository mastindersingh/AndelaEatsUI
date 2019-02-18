import {
  SET_MENUS,
  SELECT_MEAL,
  MAKE_ORDER_SUCCESS,
  RESET_MENU,
  MAKE_ORDER_FAILURE,
  MENU_IS_LOADING,
  FETCH_USERS_MENU_LOADING,
  FETCH_USERS_MENU_SUCCESS,
  FETCH_USERS_MENU_FAILURE,
  FETCH_ORDERS_LOADING,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
} from '../actions/actionTypes';
import { initialMenus } from './initialState';

const menuReducer = (state = initialMenus, action) => {
  switch (action.type) {
    case SET_MENUS:
      return { ...state, menus: action.payload };
    case SELECT_MEAL:
      return { ...state, [action.payload.prop]: action.payload.value };
    case MAKE_ORDER_SUCCESS:
      return { ...state, message: action.payload.message };
    case MAKE_ORDER_FAILURE:
      return { ...state, message: action.payload.message };
    case RESET_MENU:
      return {
        ...state, acc1: '', acc2: '', mainMeal: '', message: ''
      };
    case MENU_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case FETCH_USERS_MENU_LOADING:
      return { ...state, isLoading: action.payload };
    case FETCH_USERS_MENU_SUCCESS:
      return { ...state, menus: action.payload };
    case FETCH_ORDERS_LOADING:
      return { ...state, isLoading: action.payload };
    case FETCH_ORDERS_SUCCESS:
      return { ...state, orderedMenus: action.payload };
    case FETCH_USERS_MENU_FAILURE:
    case FETCH_ORDERS_FAILURE:
      return state;
    default:
      return state;
  }
};
export default menuReducer;
