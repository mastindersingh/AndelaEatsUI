import {
  GET_ADMIN_USER,
  GET_ALL_ADMIN_USERS,
  ADD_ADMIN_USER_SUCCESS,
  ADD_ADMIN_USER_FAILURE
} from "../../actions/actionTypes";
import { initialUser } from '../initialState';

const adminUserReducer = (state = initialUser, action) => {
    switch (action.type) {
      case GET_ADMIN_USER:
        return {
            ...state,
            role: action.payload
          };
      case GET_ALL_ADMIN_USERS:
        return {
            ...state,
            adminUsers: action.payload? action.payload : []
          };
      case ADD_ADMIN_USER_SUCCESS:
        return {
            ...state,
            message: action.message
          };
      case ADD_ADMIN_USER_FAILURE:
        return {
            ...state,
            error: action.message
          };
      default:
        return state;
    }
  };

  export default adminUserReducer;
