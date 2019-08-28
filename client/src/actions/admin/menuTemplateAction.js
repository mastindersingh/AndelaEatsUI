import axios from 'axios';
import { toastError, toastSuccess } from '../../helpers/toast';
import {
  ADD_MENU_TEMPLATE_SUCCESS,
  ADD_MENU_TEMPLATE_FAILURE,
  GET_MENU_TEMPLATE_SUCCESS,
  GET_MENU_TEMPLATE_FAILURE,
  FETCHING_MENU_TEMPLATES,
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
  type: GET_MENU_TEMPLATE_SUCCESS,
  payload: menuTemplates,
});

export const getMenuTemplateFailure = (error) => ({
  type: GET_MENU_TEMPLATE_FAILURE,
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
