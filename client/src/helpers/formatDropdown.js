/* 
  Disabled prefer-template because 
  while using template strings, 
  the code kept breaking the linter. 
*/
/* eslint-disable prefer-template */
const formatDropdown = (engagements = []) => {
  engagements.map(engagement => {
    const { name } = engagement.vendor;
    const startDate = engagement.startDate.slice(5, 17);
    const endDate = engagement.endDate.slice(5, 17);
    return {
      value: engagement.id, 
      label: name + " - " + startDate + " to " + endDate
    };
  });
};

export default formatDropdown;
