import Cookie from 'js-cookie';
import configAxios from './configAxios';

const logoutActiveUser = () => {
  Cookie.remove('jwt-token', { path: '/', domain: '.andela.com' });
  configAxios(null);
  window.location.href = '/login';
};

export default logoutActiveUser;