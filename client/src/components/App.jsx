/* eslint-disable import/no-named-as-default */

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SideNav from './common/Sidenav/Sidenav';
import Login from './Login/Login';
import Orders from './Order/Orders';
import OrderHistory from './OrderHistory/OrderHistory';
import EditOrder from './EditOrder/EditOrder';
import AdminOrderHistory from './Admin/OrderHistory/Index';
import ExportOrders from './Admin/OrderHistory/ExportOrders';
import Meals from './Admin/Meals/Index';
import Engagements from './Admin/Engagements/Index';
import VendorsTab from './Admin/Tabs/Vendors';
import MenusAndMealsTab from './Admin/Tabs/MenusAndMeals';
import Ratings from './Admin/Ratings/Index';
import UserRatingsTab from './Ratings/RatingsTabs';
import Users from './Admin/Users/Users';

export const NotFound = () => <h1>Page Not Found</h1>;

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <SideNav>
        <Switch>
          <Route path="/ordermeal" component={Orders} />
          <Route exact path="/orders" component={OrderHistory} />
          <Route exact path="/orders/edit/:id" component={EditOrder} />
          <Route exact path="/admin/orders" component={AdminOrderHistory} />
          <Route exact path="/admin/orders/export" component={ExportOrders} />
          <Route exact path="/admin/vendors" component={VendorsTab} />
          <Route exact path="/admin/menus" component={MenusAndMealsTab} />
          <Route exact path="/admin/meals" component={Meals} />
          <Route exact path="/admin/engagements" component={Engagements} />
          <Route exact path="/admin/ratings" component={Ratings} />
          <Route exact path="/users/ratings" component={UserRatingsTab} />
          <Route exact path="/admin/users" component={Users} />
          <Route component={NotFound} />
        </Switch>
      </SideNav>
    </Switch>
  </Router>
);

export default Root;
