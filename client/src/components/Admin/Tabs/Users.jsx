import React from 'react';

import Tabs from '../../common/Tab/Index';
import Users from '../Users/Users';
import UserRoles from '../Users/UserRoles';
import AdminUsers from '../Users/AdminUsers';
import TappedUsers from '../Users/TappedUsers';

const Index = () => (
  <Tabs>
    <div label="Admin Users">
      <AdminUsers />
    </div>
    <div label="Regular Users">
      <Users />
    </div>
    <div label="User Roles">
      <UserRoles />
    </div>
    <div label="Tapped Users">
      <TappedUsers />
    </div>
  </Tabs>
);

export default Index;
