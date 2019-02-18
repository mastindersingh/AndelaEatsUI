const formatMealItems = (mealItems = []) => {
  const Output = { main: [], protein: [], side: [] };

  mealItems.map(mealItem => {
    if (mealItem.mealType === 'main') {
      Output.main.push({ value: mealItem.id, label: mealItem.name });
    } else if (mealItem.mealType === 'protein') {
      Output.protein.push({ value: mealItem.id, label: mealItem.name });
    } else if (mealItem.mealType === 'side') {
      Output.side.push({ value: mealItem.id, label: mealItem.name });
    }
  });

  return Output;
};

export const getIds = (mealItem) => {
  const ids = [];
  mealItem.map(id => {
    ids.push(id.value);
  });

  return ids;
};

export const formatDate = (date) => (
  date.format("YYYY-MM-DD")
);

export const isStartgreaterThanEnd = (startDate, endDate) => {
  if (startDate.diff(endDate, 'days') > -1) {
    return "Start date must be greater than end date. Use a minimum range of 2 days.";
  }
};


export default formatMealItems;
