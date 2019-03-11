import faker from 'faker';

export const menuItemsUI = [
  {
    id: 2,
    date: '30 May 2018',
    main: 'White Rice',
    protein: 'Fish',
    soup: 'Stew',
    side: 'Plantain'
  },
  {
    id: 3,
    date: '30 May 2018',
    main: 'White Rice',
    protein: 'Fish',
    soup: 'Stew',
    side: 'Plantain'
  },
  {
    id: 4,
    date: '30 May 2018',
    main: 'White Rice',
    protein: 'Fish',
    soup: 'Stew',
    side: 'Plantain'
  },
  {
    id: 5,
    date: '30 May 2018',
    main: 'White Rice',
    protein: 'Fish',
    soup: 'Stew',
    side: 'Plantain'
  },
  {
    id: 6,
    date: '30 May 2018',
    main: 'White Rice',
    protein: 'Fish',
    soup: 'Stew',
    side: 'Plantain'
  },
  {
    id: 7,
    date: '30 May 2018',
    main: 'White Rice',
    protein: 'Fish',
    soup: 'Stew',
    side: 'Plantain'
  },
  {
    id: 9,
    date: '30 May 2018',
    main: 'White Rice',
    protein: 'Fish',
    soup: 'Stew',
    side: 'Plantain'
  },
];

export const mockMenuItem = [
  { value: "White rice", label: "White rice" },
  { value: "Ofada rice", label: "Ofada rice" },
  { value: "Beans", label: "Beans" },
  { value: "Eba (garri)", label: "Eba (garri)" },
  { value: "Amala", label: "Amala" }
];

export const secondaryItem = [
  { value: "Stew", label: "Stew" },
  { value: "Ofada sauce", label: "Ofada sauce" },
  { value: "Egusi", label: "Egusi" },
  { value: "Ewedu", label: "Ewedu" },
  { value: "Plantain", label: "Plantain" },
  { value: "Salad", label: "Salad" },
  { value: "Moi-Moi", label: "Moi-Moi" }
];

export const mockProtein = [
  { value: "Fish", label: "Fish" },
  { value: "Meat", label: "Meat" },
  { value: "Chicken", label: "Chicken" }
];

export const adminAllowed = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 }
];

export const engagements = [
  {
    endDate: "Sun, 11 Nov 2018 00:00:00 GMT",
    id: 1,
    isDeleted: false,
    startDate: "Wed, 10 Oct 2018 00:00:00 GMT",
    status: 1,
    terminationReason: null,
    timestamps: {
      created_at: "Tue, 09 Oct 2018 16:34:40 GMT",
      date_pretty: "October 09, 2018",
      date_pretty_short: "Oct 09, 2018",
      updated_at: "Tue, 09 Oct 2018 16:34:40 GMT"
    },
    vendor: {
      address: "Ketu, Lagos",
      contactPerson: "Yemi",
      id: 1,
      isDeleted: false,
      name: "Spicy Chops",
      tel: "12345678900",
      timestamps: {
        created_at: "Tue, 09 Oct 2018 16:34:40 GMT",
        date_pretty: "October 09, 2018",
        date_pretty_short: "Oct 09, 2018",
        updated_at: "Tue, 09 Oct 2018 16:34:40 GMT"
      }
    },
    vendorId: 1
  }
];

export const menu = [
  {
    id: 1,
    date: "2018-10-22",
    mealPeriod: "Lunch",
    mainMealId: 1,
    allowedSide: 2,
    allowedProtein: 1,
    sideItems: [1],
    proteinItems: [1, 2],
    vendorEngagementId: faker.random.number({min:0, max:5}),
  },
  {
    id: 2,
    allowedProtein: 1,
    allowedSide: 1,
    date: "2019-01-22",
    mainMealId: 71,
    mealPeriod: "supper",
    proteinItems: [
      1
    ],
    sideItems: [
      1
    ],
    vendorEngagementId: faker.random.number({min:0, max:5}),
  }
];

export default {
  menuItemsUI
};
