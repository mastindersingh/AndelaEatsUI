const formatDropdown = (engagements = []) => {
  engagements.map(engagement => {
    const name = engagement.vendor.name;
    const startDate = engagement.startDate.slice(5, 17);
    const endDate = engagement.endDate.slice(5, 17);
    return {
      value: engagement.id,
      label:`${name} - ${startDate} to ${endDate}`
    };
  });
};

export default formatDropdown;
