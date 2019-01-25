import { combineReducers } from 'redux';

import userReducer from './userReducer';
import ordersReducer from './ordersReducer';
import menuReducer from './menuReducer';
import vendorsReducer from './vendorsReducer';
import mealOrdersReducer from './admin/ordersReducer';
import mealItemsReducer from './admin/mealItemsReducer';
import adminMenusReducer from './admin/menusReducer';
import engagementsReducer from './admin/engagementsReducer';
import suspendedVendorReducer from './admin/suspendedVendorReducer';
import adminUserReducer from './admin/adminUserReducer';
import mealRatingsReducer from './admin/ratingsReducer';

export default combineReducers({
  userReducer,
  upcomingMenus: menuReducer,
  orders: ordersReducer,
  allVendors: vendorsReducer,
  mealOrders: mealOrdersReducer,
  mealItems: mealItemsReducer,
  menus: adminMenusReducer,
  allEngagements: engagementsReducer,
  suspendVendors: suspendedVendorReducer,
  user: adminUserReducer,
  ratingList: mealRatingsReducer,
});
