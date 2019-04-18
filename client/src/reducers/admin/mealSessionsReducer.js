import {
  SHOW_MEAL_SESSION_MODAL,
  HIDE_MEAL_SESSION_MODAL
  
} from '../../actions/actionTypes';

import { initialMealSessions } from '../initialState';


const mealSessionsReducer = (state = initialMealSessions, action) => {
  switch (action.type) {
    case SHOW_MEAL_SESSION_MODAL:
      return {
        ...state,
        mealSessionModal: {
          ...state.mealSessionModal,
          show: action.payload.show,
          edit: action.payload.edit
        }
      };
    case HIDE_MEAL_SESSION_MODAL:
      return {
        ...state,
        mealSessionModal: {
          ...state.mealSessionModal,
          show: action.payload.show
        }
      };
    default:
      return state;
  }
};

export default mealSessionsReducer;