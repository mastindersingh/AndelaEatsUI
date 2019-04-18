import React from 'react';

import Tabs from '../../common/Tab/Index';
import Meals from '../Meals/Index';
import Menus from '../Menus/Index';
import Sessions from '../Meals/Sessions';

const Index = () => (
  <div>
    <Tabs>
      <div label="Meals">
        <Meals />
      </div>
      <div label="Menus">
        <Menus />
      </div>
      <div label="Meal Sessions">
        <Sessions />
      </div>
    </Tabs>
  </div>
);

export default Index;