const getToken = () => {
  const token = document.cookie.split('jwt-token=');
  return (token.length === 2)
    ? token[1]
    : null;
};

export default getToken;
