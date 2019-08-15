import axios from 'axios';
import { toastError, toastSuccess } from '../../helpers/toast';
import {
  ADD_MENU_TEMPLATE_SUCCESS,
  ADD_MENU_TEMPLATE_FAILURE
} from '../actionTypes';

const menuTemplateType = (type, payload) => ({
  type,
  payload,
});

export const addMenuTemplate = (data) => dispatch => (
  axios.post(`/menu_template`, data)
    .then(response => {
      toastSuccess("Menu Template Created Succesfully")
      dispatch(menuTemplateType(ADD_MENU_TEMPLATE_SUCCESS, response.data.payload));
    })
    .catch(error => {
      const { payload } = error.response.data;
      toastError(payload.message);
      dispatch(menuTemplateType(ADD_MENU_TEMPLATE_FAILURE, payload.message));
    })
);
