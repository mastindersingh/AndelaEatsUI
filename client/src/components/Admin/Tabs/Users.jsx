import React from 'react';

import Tabs from '../../common/Tab/Index';
import Users from '../Users/Users';
import UserRoles from '../Users/UserRoles';
import TappedUsers from '../Users/TappedUsers';

const Index = () => (
  <div>
    <Tabs>
      <div label="User">
        <Users />
      </div>
      <div label="User Roles">
        <UserRoles />
      </div>
      <div label="Tapped Users">
        <TappedUsers />
      </div>
    </Tabs>
  </div>
);

export default Index;
