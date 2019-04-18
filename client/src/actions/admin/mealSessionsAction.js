import axios from 'axios';
import { toastSuccess, toastError } from '../../helpers/toast';
import {
  SHOW_MEAL_SESSION_MODAL,
  HIDE_MEAL_SESSION_MODAL
} from '../actionTypes';


export const showMealSessionModalAction = (show, edit) => ({
  type: SHOW_MEAL_SESSION_MODAL,
  payload: { show, edit }
});


export const showMealSessionModal = (show, edit) => dispatch => dispatch(
  showMealSessionModalAction(show, edit)
);


export const hideMealSessionModal = () => dispatch => {
  dispatch({
    type: HIDE_MEAL_SESSION_MODAL,
    payload: { show: false }
  });
};