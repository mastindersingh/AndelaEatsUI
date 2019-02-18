import React from 'react';

import Tabs from '../../common/Tab/Index';
import Vendors from '../Vendors/Vendors';
import Engagement from '../Engagements/Index';
import SuspendedVendors from '../SuspendedVendors/Index';

const Index = () => (
  <div>
    <Tabs>
      <div label="Engagement">
        <Engagement />
      </div>
      <div label="Vendors">
        <Vendors />
      </div>
      <div label="Suspended Vendors">
        <SuspendedVendors />
      </div>
    </Tabs>
  </div>
);

export default Index;