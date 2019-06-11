/* 
  Disabled prefer-template because 
  while using template strings, 
  the code kept breaking the linter. 
*/
/* eslint-disable prefer-template */
const formatPermisionDropdown = (permisions = []) => permisions.map(permision => {
  const { name, id, keyword } = permision;
  return {
    value: name,
    label: keyword
  };
});

export default formatPermisionDropdown;
