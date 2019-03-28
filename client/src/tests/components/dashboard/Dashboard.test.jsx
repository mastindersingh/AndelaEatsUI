import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dashboard from "../../../components/Dashboard/Dashboard";
import { createStore } from 'redux'
import rootReducer from "../../../reducers/rootReducer";

Enzyme.configure({adapter:new Adapter()});
let props = {
  collectedOrders:  [1,1,1],
  uncollectedOrders:  [1,3,1],
  cancelledOrders:  [1,0,0],
  datesConsidered:  ["Wed Mar 13 2019","Thu Mar 14 2019","Fri Mar 15 2019"],
  isLoading: true,
};

let component;

const store = createStore(rootReducer, ['Use Redux']);

describe('Dashboard Component', () => {

  beforeEach(()=>{
    component= mount(<Dashboard store={store} {...props} />);
    console.log(component);
  });

  it('should have charts-container div', () => {
    expect(component.find('.loader-container')).toHaveLength(1);
  });

});
