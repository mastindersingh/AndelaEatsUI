// User info
import decodeToken from './jwtDecode';
import configAxios from './configAxios';

/**
 * This function validates the user information
 *
 * @return {boolean} boolean
 */
export const isAuthorized = () => {
  if (decodeToken() !== 'unauthorised') {
    configAxios(document.cookie.split('jwt-token=')[1]);
    const userEmailAddress = (decodeToken().email);
    const andelaEmailRegex = /@andela.com$/;
    if (!andelaEmailRegex.test(userEmailAddress)) {
      document.cookie = '';
      localStorage.setItem('error', 
        'Unauthorised Access, Please Log in with an Andela Email');
      return false;
    }
    return true;
  }
};


/**
 * This function checks if the user 
 * 
 * @return {boolean} boolean
 */
export const isAdmin = () => (!!decodeToken().roles.Andelan);
