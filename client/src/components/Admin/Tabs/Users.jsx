import React from 'react';

import Tabs from '../../common/Tab/Index';
import Users from '../Users/Users';
import UserRoles from '../Users/UserRoles';

const Index = () => (
  <div>
    <Tabs>
      <div label="User">
        <Users />
      </div>
      <div label="User Roles">
        <UserRoles />
      </div>
    </Tabs>
  </div>
);

export default Index;
