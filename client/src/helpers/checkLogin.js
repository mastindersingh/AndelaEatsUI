// User info
import decodeToken from './jwtDecode';

/**
 * This function checks if the user is logged
 *
 * @returns {boolean} true
 */
const CheckLogIn = () => {
  const token = document.cookie.split('jwt-token=');
  if (token.length === 2) {
    const userEmailAddress = (decodeToken().email);
    const andelaEmailRegex = /@andela.com$/;
    return (andelaEmailRegex.test(userEmailAddress));
  }
};

export default CheckLogIn;