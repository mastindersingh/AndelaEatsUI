import axios from 'axios';

const location = localStorage.getItem('location')
if(!location) {
  document.cookie = "jwt-token=; expires=Tue, 20 Nov 2018 13:21:57 GMT; Path=/; Domain=.andela.com";
}

const configAxios = (token) => {
  axios.defaults.headers.Authorization = `Bearer ${token}` || "";
  axios.defaults.headers["X-Location"] = location
};

export default configAxios;
