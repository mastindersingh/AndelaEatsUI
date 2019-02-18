import React from 'react';

import Tabs from '../../common/Tab/Index';
import Meals from '../Meals/Index';
import Menus from '../Menus/Index';

const Index = () => (
  <div>
    <Tabs>
      <div label="Meals">
        <Meals />
      </div>
      <div label="Menus">
        <Menus />
      </div>
    </Tabs>
  </div>
);

export default Index;