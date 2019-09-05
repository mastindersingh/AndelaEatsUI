export const menuTemplate = {
  payload: {
    id: '12',
    name: 'matooke',
    mealPeriod: 'lunch',
    description: 'matooke template'
  }
};

export const deleteMenuTemplateMock = {
  msg: 'menu_template deleted 1',
  payload: {
    status: 'success'
  }
};

export const menuTemplates = [
  {
    description: "Fruits variety served",
    id: 1,
    isDeleted: false,
    locationId: 1,
    mealPeriod: "lunch",
    name: "Fruits variety",
    timestamps: {
      created_at: "2019-09-05",
      updated_at: "Thu, 05 Sep 2019 07:29:57 GMT"
    },
    weekdays: [
      { id: 436, day: "monday" },
      { id: 437, day: "tuesday" },
      { id: 438, day: "wednesday" },
      { id: 439, day: "thursday" },
      { id: 440, day: "friday" }]
  },
  {
    description: "Fruits variety served",
    id: 2,
    isDeleted: false,
    locationId: 1,
    mealPeriod: "lunch",
    name: "Fruits variety",
    timestamps: {
      created_at: "2019-09-05",
      updated_at: "Thu, 05 Sep 2019 07:29:57 GMT"
    },
    weekdays: [
      { id: 436, day: "monday" },
      { id: 437, day: "tuesday" },
      { id: 438, day: "wednesday" },
      { id: 439, day: "thursday" },
      { id: 440, day: "friday" }]
  }
];
