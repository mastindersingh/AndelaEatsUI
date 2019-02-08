/* eslint-disable max-len */
const formatDropdown = (engagements = []) => (
  engagements.map(engagement => ({
    value: engagement.id,
    label: `${engagement.vendor.name} - ${engagement.startDate.slice(5, 17)} to ${engagement.endDate.slice(5, 17)}`
  }))
  );

export default formatDropdown;
