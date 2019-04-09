import {
  GET_ADMIN_USER,
  GET_ALL_ADMIN_USERS,
  ADD_ADMIN_USER_SUCCESS,
  ADD_ADMIN_USER_FAILURE
} from "../actionTypes";
import token from '../../helpers/jwtDecode';
import axios from "axios";
import { toastSuccess, toastError } from '../../helpers/toast';


export const userID = token().id;

export const setAdminUser = role => ({
    type: GET_ADMIN_USER,
    payload: role
  });

export const fetchAdminUsers = adminUsers => ({
    type: GET_ALL_ADMIN_USERS,
    payload: adminUsers
  });

export const addAdminUser = (message, type) => ({
    type,
    message
  });

  export const getAdminUser = () => dispatch => {
    return axios.get(`/roles/user/${userID}`)
      .then((response) => {
        dispatch(setAdminUser(response.data.payload.user_role[0].roleId));
      });
  };

  export const getAllAdminUsers = () => dispatch => {

    return axios.get('/users/admin')
      .then((response) => {
        dispatch(fetchAdminUsers(response.data.payload.AdminUsers));
      });
  };

  export const createAdminUser = (userData) => dispatch => {
    return axios.post(`/roles/user`, userData)
      .then((response) => {
        const { msg, payload } = response.data;
        toastSuccess("User role changed to Admin successfully");
        dispatch(addAdminUser(msg, ADD_ADMIN_USER_SUCCESS));
      })
      .catch((error) => {
        error = error.response ? error.response.data.msg : 'Invalid Email Address entered!';
        toastError(error);
        dispatch(addAdminUser(error, ADD_ADMIN_USER_FAILURE));
      });
  };
