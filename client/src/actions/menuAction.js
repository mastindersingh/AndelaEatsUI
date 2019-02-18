import axios from "axios";
import token from '../helpers/jwtDecode';

import {
  SET_MENUS,
  MAKE_ORDER_FAILURE,
  MAKE_ORDER_SUCCESS,
  SELECT_MEAL,
  RESET_MENU,
  MENU_IS_LOADING,
  FETCH_USERS_MENU_LOADING,
  FETCH_USERS_MENU_SUCCESS,
  FETCH_USERS_MENU_FAILURE,
  CREATE_ORDER_LOADING,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  FETCH_ORDERS_LOADING,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,

} from "./actionTypes";
import { config } from "../config";

export const baseUrl = config.ANDELAEATS_API_BASE_URL;
export const userID = token().id;

/**
 *
 *
 * @export
 * @param {*} menus
 * @returns {object} object
 */
export function setMenus(menus) {
  return {
    type: SET_MENUS,
    payload: menus
  };
}

/**
 *
 * @export
 * @param {object} prop value
 * @returns {object} object
 */
export function selectMeal({ prop, value }) {
  return {
    type: SELECT_MEAL,
    payload: { prop, value }
  };
}
/**
 *
 * @export
 * @returns {void}
 */
export function resetMenu() {
  return {
    type: RESET_MENU
  };
}

/**
 *
 * @export
 * @param {boolean} isLoading
 * @returns {object} object
 */
export function setMenuLoading(isLoading) {
  return {
    type: MENU_IS_LOADING,
    payload: isLoading
  };
}

/**
 *
 *
 * @export
 * @param {*} response
 * @returns {object} object
 */
export function handleOrderSuccess(response) {
  return {
    type: MAKE_ORDER_SUCCESS,
    payload: response
  };
}

/**
 *
 *
 * @export
 * @param {*} error
 * @returns {object} object
 */
export function handleOrderFailure(error) {
  return {
    type: MAKE_ORDER_FAILURE,
    payload: error
  };
}


export const fetchMenuLoading = isLoading => ({
  type: FETCH_USERS_MENU_LOADING,
  payload: isLoading
});

export const fetchMenuSuccess = engagements => ({
  type: FETCH_USERS_MENU_SUCCESS,
  payload: engagements
});

export const fetchMenuFailure = error => ({
  type: FETCH_USERS_MENU_FAILURE,
  payload: error
});

export const fetchMenu = (startDate, endDate) => dispatch => {
  dispatch(fetchMenuLoading(true));

  return axios.get(`${baseUrl}/menus/lunch/${startDate}/${endDate}`)
    .then(response => {
      dispatch(fetchMenuSuccess(response.data.payload.menuList));
      dispatch(fetchMenuLoading(false));
    })
    .catch(error => {
      if (error.response.status === 400) {
        document.cookie = "jwt-token=; expires=Tue, 20 Nov 2018 13:21:57 GMT; Path=/; Domain=.andela.com";
      }
      dispatch(fetchMenuFailure(error));
      dispatch(fetchMenuLoading(false));
    });
};

export const setOrdersSuccess = payload => ({
  type: FETCH_ORDERS_SUCCESS,
  payload
});

export const setOrdersFailure = (error) => ({
  type: FETCH_ORDERS_FAILURE,
  error
});

export const setOrdersLoading = (isLoading) => ({
  type: FETCH_ORDERS_LOADING,
  isLoading
});

export const fetchUserOrders = (startDate, endDate) => (dispatch) => {
  dispatch(setOrdersLoading(true));
  return axios.get(`${baseUrl}/orders/user/${userID}/${startDate}/${endDate}`)
    .then((response) => {
      dispatch(setOrdersSuccess(response.data.payload.orders));
      dispatch(setOrdersLoading(false));
    }).catch((error) => {
      if (error.response.status === 400) {
        document.cookie = "jwt-token=; expires=Tue, 20 Nov 2018 13:21:57 GMT; Path=/; Domain=.andela.com";
      }
      dispatch(setOrdersFailure(error));
      dispatch(setOrdersLoading(false));
    });
};


export const createOrderLoading = isCreating => ({
  type: CREATE_ORDER_LOADING,
  payload: isCreating
});

export const createOrderSuccess = order => ({
  type: CREATE_ORDER_SUCCESS,
  payload: order
});

export const createOrderFailure = error => ({
  type: CREATE_ORDER_FAILURE,
  payload: error
});


export const createOrder = orderDetails => dispatch => {
  dispatch(createOrderLoading(true));

  const url = `${baseUrl}/orders/`;

  const options = {
    method: 'POST',
    data: orderDetails,
    url
  };

  return axios(options)
    .then((res) => {
      dispatch(createOrderSuccess(res.data));
      dispatch(createOrderLoading(false));
    })
    .catch((error) => {
      dispatch(createOrderFailure(error));
      dispatch(createOrderLoading(false));
    });
};