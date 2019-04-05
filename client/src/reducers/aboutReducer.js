import {
  FETCH_ABOUT_LOADING,
  FETCH_ABOUT_SUCCESS,
  FETCH_ABOUT_FAILURE,
  UPDATE_ABOUT_SUCCESS,
  UPDATE_ABOUT_FAILURE,
  UPDATE_ABOUT_LOADING
} from '../actions/actionTypes';

import { initialAbout } from './initialState';

let index;

const aboutReducer = (state = initialAbout, action) => {
  switch (action.type) {
    case FETCH_ABOUT_LOADING:
      return { ...state, isLoading: action.payload };
    case FETCH_ABOUT_SUCCESS:
      return { ...state, about: action.payload };
    case UPDATE_ABOUT_SUCCESS:
      return { ...state, about: action.payload };
    case UPDATE_ABOUT_LOADING:
      return { ...state, isUpdating: action.payload };
    case FETCH_ABOUT_FAILURE:
    case UPDATE_ABOUT_FAILURE:
    default:
      return state;
  }
};
export default aboutReducer;
