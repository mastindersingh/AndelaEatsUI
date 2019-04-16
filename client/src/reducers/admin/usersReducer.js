import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_LOADING,
  FETCH_USERS_SUCCESS,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  CREATE_USER_LOADING,
  UPDATE_USER_FAILURE,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_LOADING,
  DELETE_USER_SUCCESS,
  FETCH_USER_ROLES_FAILURE,
  FETCH_USER_ROLES_SUCCESS,
  FETCH_USER_ROLES_LOADING
} from '../../actions/actionTypes';
import { initialUsers as initialState } from '../initialState';

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
        loading: false
      };
    case CREATE_USER_LOADING:
    case DELETE_USER_LOADING:
    case UPDATE_USER_LOADING:
    case FETCH_USERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case FETCH_USERS_FAILURE:
    case DELETE_USER_FAILURE:
    case UPDATE_USER_FAILURE:
    case CREATE_USER_FAILURE:
      return { ...state, loading: false };
    case CREATE_USER_SUCCESS:
      return { 
        ...state, users: state.users.concat(action.user), loading: false 
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users
          .map(user => ((user.id === action.user.id) ? action.user : user))
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter(user => user.id !== action.id)
      };
    case FETCH_USER_ROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: action.roles
      };
    case FETCH_USER_ROLES_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case FETCH_USER_ROLES_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default usersReducer;