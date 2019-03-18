import React from 'react';

import Tabs from '../common/Tab/Index';
import UserRatings from './VendorRatings';
import UserOrders from './UserOrders';

const Index = () => (
  <div>
    <Tabs>
      <div label="My Orders">
        <UserOrders />
      </div>
      <div label="Meals">
        <p>Meal Ratings</p>
      </div>
      <div label="Vendors">
        <UserRatings />
      </div>
    </Tabs>
  </div>
);

export default Index;
