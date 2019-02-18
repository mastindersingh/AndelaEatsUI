// helper
import decodeToken from '../helpers/jwtDecode';

// types
import { LOAD_ACTIVE_USER_SUCCESS } from './actionTypes';

const loadActiveUserSuccess = (activeUser) => ({ 
  type: LOAD_ACTIVE_USER_SUCCESS, activeUser 
});

const loadActiveUser = () => (dispatch) => { 
  const activeUser = decodeToken();
  dispatch(loadActiveUserSuccess(activeUser));
};

export default loadActiveUser;