export default {
  isLoading: false,
  activeUser: {},
  menus: []
};

export const initialMenus = {
  menus: [],
  isLoading: false,
  acc1: '',
  acc2: '',
  mainMeal: '',
  message: '',
  selectedMeal: '',
  orderedMenus: []
};

export const orders = {
  isLoading: false,
  error: "",
  totalRecords: 0,
  currentPage: 1,
  meals: [],
  isFiltered: false,
  orders: [],
  menu: {
    meal: {
      main: [],
      firstAccompaniment: [],
      secondAccompaniment: []
    }
  },
  isDeleting: false
};

export const initialVendors = {
  isLoading: false,
  isCreating: false,
  isSuspending: false,
  isUpdating: false,
  vendors: [],
};

export const mealOrders = {
  isLoading: false,
  orders: [],
  currentPage: ''
};

export const initialMealItems = {
  isLoading: false,
  isDeleting: false,
  meals: [],
  pagination: null,

  mealModal: {
    show: false,
    edit: false,
    addBtnDisabled: false,
    errors: [],
    isLoading: false
  }
};

export const initialAdminMenus = {
  isLoading: false,
  isDeleting: false,
  isCreating: false,

  dateOfMeal: null,
  mealPeriod: null,
  menuList: [],
  vendorEngagements: [],
  mealItems: [],

  meta: null,
  error: {
    status: false,
    message: null
  }
};

export const initialEngagements = {
  isLoading: false,
  isCreating: false,
  isDeleting: false,
  isUpdating: false,
  engagements: [],
  vendors: []
};

export const initialSuspendedVendors = {
  isLoading: false,
  vendors: [],
};

export const initialUser = {
  role: 0,
  email: '',
  message: ''
};

export const intialMealRatings = {
  isLoading: false,
  ratingList: [],
};
