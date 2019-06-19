import {
  GET_TAPPED_USERS_SUCCESS,
  GET_TAPPED_USERS_FAILURE,
} from "../../actions/actionTypes";
import { initialTappedUsers } from '../initialState';

const tappedUserReducer = (state = initialTappedUsers, action) => {
  switch (action.type) {
    case GET_TAPPED_USERS_SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case GET_TAPPED_USERS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default tappedUserReducer;
