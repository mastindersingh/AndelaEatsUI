import jwtDecode from 'jwt-decode';
import { isAuthorized } from './authorization';

const isValid = () => {
  const { cookie } = document;
  const jwtToken = cookie.split('jwt-token=')[1];
  if (jwtToken) {
    const decodedToken = jwtDecode(jwtToken);
    const { exp } = decodedToken;
    if (exp > Math.floor(new Date().getTime() / 1000)) {      
      return true;
    } 
    return false;
  }
  return false;
};

/**
 * Checks for the environment and then validates token
 *
 * @param {object} store 
 * @param {object} next
 * @param {object} action
 *
 * @returns {function} -  checkTokenStatus
 */
export const tokenValidator = store => next => action => {
  if (process.env.NODE_ENV !== 'test') {    
    if (isValid()) {
      return next(action);
    }
    if (!isAuthorized()) {
      window.location.href = "/";
    } 
    document.cookie = '';
    localStorage.setItem('error', 'Session has expired, kindly re-login');
    window.location.href = "/";
  }
};
