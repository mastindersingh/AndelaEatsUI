import axios from 'axios';
import { toastError, toastSuccess } from '../../helpers/toast';
import {
  ADD_MENU_TEMPLATE_SUCCESS,
  ADD_MENU_TEMPLATE_FAILURE,
  GET_MENU_TEMPLATES_SUCCESS,
  GET_MENU_TEMPLATES_FAILURE,
  FETCHING_MENU_TEMPLATES,
  GET_MENU_TEMPLATE_SUCCESS,
  GET_MENU_TEMPLATE_FAILURE,
  DELETE_MENU_TEMPLATE_SUCCESS,
  DELETE_MENU_TEMPLATE_FAILURE
} from '../actionTypes';

const menuTemplateType = (type, payload) => ({
  type,
  payload,
});

export const addMenuTemplate = (data) => dispatch => (
  axios.post(`/menu_template`, data)
    .then(response => {
      toastSuccess("Menu Template Created Successfully");
      dispatch(menuTemplateType(
        ADD_MENU_TEMPLATE_SUCCESS, response.data.payload
      ));
    })
    .catch(error => {
      const { payload } = error.response.data;
      toastError(payload.message);
      dispatch(menuTemplateType(
        ADD_MENU_TEMPLATE_FAILURE, payload.message
      ));
    })
);

export const fetchingMenuTemplates = () => ({
  type: FETCHING_MENU_TEMPLATES,
});

export const getMenuTemplateSuccess = (menuTemplates) => ({
  type: GET_MENU_TEMPLATES_SUCCESS,
  payload: menuTemplates,
});

export const getMenuTemplateFailure = (error) => ({
  type: GET_MENU_TEMPLATES_FAILURE,
  payload: error
});

export const getMenuTemplates = () => dispatch => {
  dispatch(fetchingMenuTemplates());
  return axios.get('/menu_template').then(response => {
    const { payload } = response.data;
    dispatch(getMenuTemplateSuccess(payload));
  }).catch((error) => {
    dispatch(getMenuTemplateFailure(error.response.data));
    return false;
  });
};

export const deleteMenuTemplate = (id) => dispatch => (
  axios.delete(`/menu_template/${id}`)
    .then((response) => {
      toastSuccess("Menu Template Deleted Succesfully");
      dispatch(menuTemplateType(DELETE_MENU_TEMPLATE_SUCCESS,
        response.data.payload.status));
    })
    .catch(error => {
      toastError(`An error occured while deleting the menu template,
      please try again`);
      dispatch(menuTemplateType(DELETE_MENU_TEMPLATE_FAILURE,
        'An error occured while deleting the menu template, please try again'));
    })
);

export const getMenuTemplate = (id) => dispatch => {
  return axios.get(`/menu_template/${id}`).then(response => {
    const { payload } = response.data;

    dispatch(menuTemplateType(
      GET_MENU_TEMPLATE_SUCCESS, payload));
  }).catch((error) => {
    const { msg } = error.response.data;

    toastError(msg);
    dispatch(menuTemplateType(
      GET_MENU_TEMPLATE_FAILURE, msg));
  });
};
