import axios from 'axios';
import { toastSuccess, toastError } from '../../helpers/toast';

import {
  FETCH_MENUS_LOADING,
  FETCH_MENUS_SUCCESS,
  FETCH_MENUS_FAILURE,
  FETCH_VENDOR_ENGAGEMENT_SUCCESS,
  FETCH_VENDOR_ENGAGEMENT_FAILURE,
  DELETE_MENU_ITEM_LOADING,
  DELETE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_FAILURE,
  FETCH_MEALITEMS_SUCCESS,
  FETCH_MEALITEMS_FAILURE,
  CREATE_MENU_LOADING,
  CREATE_MENU_SUCCESS,
  CREATE_MENU_FAILURE,
  EDIT_MENU_SUCCESS,
  EDIT_MENU_FAILURE
} from '../actionTypes';

export const editMenuSuccess = (menu) => ({
  type: EDIT_MENU_SUCCESS,
  payload: menu,
});

export const editMenuFailure = (error) => ({
  type: EDIT_MENU_FAILURE,
  payload: error
});
export const fetchMenusLoading = isLoading => ({
  type: FETCH_MENUS_LOADING,
  payload: isLoading
});

export const fetchMenusSuccess = (menus) => ({
  type: FETCH_MENUS_SUCCESS,
  payload: menus
});

export const fetchMenusError = (message) => ({
  type: FETCH_MENUS_FAILURE,
  payload: message
});

export const mockMenu = menuList => dispatch => dispatch({
  type: 'MOCK_MENU_LIST',
  payload: menuList
});

export const editMenu = menu => dispatch => {
  dispatch(fetchMenusLoading(true));
  return axios.put(`/admin/menus/${menu.id}`, menu)
    .then(response => {
      const { payload } = response.data;
      toastSuccess('Menu edited successfully');
      dispatch(editMenuSuccess(payload));
      dispatch(fetchMenusLoading(false));
    })
    .catch((error) => {
      toastError(error.response.data.msg);
      dispatch(editMenuFailure(error));
      dispatch(fetchMenusLoading(false));
    });
};

export const fetchMenus = (startDate, endDate) => (dispatch) => {
  dispatch(fetchMenusLoading(true));
  return axios.get(`/admin/menus/lunch/${startDate}/${endDate}`)
    .then(response => {
      const { payload } = response.data;

      dispatch(fetchMenusSuccess(payload));
      dispatch(fetchMenusLoading(false));
    })
    .catch(() => {
      dispatch(fetchMenusError(null));
      dispatch(fetchMenusLoading(false));
    });
};

const deleteMenuItemLoading = isDeleting => ({
  type: DELETE_MENU_ITEM_LOADING,
  payload: isDeleting
});

const deleteMenuItemFailure = error => ({
  type: DELETE_MENU_ITEM_FAILURE,
  payload: error
});

const deleteMenuItemSuccess = menuId => ({
  type: DELETE_MENU_ITEM_SUCCESS,
  payload: menuId
});

export const deleteMenuItem = menuId => dispatch => {
  dispatch(deleteMenuItemLoading(true));
  return axios.delete(`/admin/menus/${menuId}`)
    .then(() => {
      toastSuccess('Menu deleted Successfully');
      dispatch(deleteMenuItemSuccess(menuId));
      dispatch(deleteMenuItemLoading(false));
    })
    .catch(error => {
      const { data: { msg } } = error.response;
      toastError(msg);
      dispatch(deleteMenuItemFailure(msg));
      dispatch(deleteMenuItemLoading(false));
    });
};

const fetchVendorEngagementSuccess = engagements => ({
  type: FETCH_VENDOR_ENGAGEMENT_SUCCESS,
  payload: engagements
});

const fetchVendorEngagementFailure = payload => ({
  type: FETCH_VENDOR_ENGAGEMENT_FAILURE,
  payload
});

export const fetchVendorEngagements = () => dispatch => axios
  .get(`/engagements/`)
  .then((response) => {
    const { payload } = response.data;
    dispatch(fetchVendorEngagementSuccess(payload));
  }).catch((error) => {
    dispatch(fetchVendorEngagementFailure(error));
  });

const fetchMealItemsSuccess = mealItems => ({
  type: FETCH_MEALITEMS_SUCCESS,
  payload: mealItems
});

const fetchMealItemsFailure = payload => ({
  type: FETCH_MEALITEMS_FAILURE,
  payload
});

export const fetchMealItems = () => dispatch => axios
  .get(`/meal-items/`)
  .then((response) => {
    const { payload } = response.data;
    dispatch(fetchMealItemsSuccess(payload));
  })
  .catch((error) => {
    dispatch(fetchMealItemsFailure(error));
  });

const createMenuLoading = payload => ({
  type: CREATE_MENU_LOADING,
  payload
});

const createMenuSuccess = mealItems => ({
  type: CREATE_MENU_SUCCESS,
  payload: mealItems
});

const createMenuFailure = message => ({
  type: CREATE_MENU_FAILURE,
  payload: message
});

export const createMenu = (menu) => dispatch => {
  dispatch(createMenuLoading(true));

  return axios.post(`/admin/menus/`, menu)
    .then((response) => {
      const { msg, payload } = response.data;
      toastSuccess('New menu created successfully');
      dispatch(createMenuSuccess(payload));
      dispatch(createMenuLoading(false));
    })
    .catch((error) => {
      toastError(error.response.data.msg);
      dispatch(createMenuFailure(error));
      dispatch(createMenuLoading(false));
    });
};
