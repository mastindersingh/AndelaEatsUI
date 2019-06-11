import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Dashboard } from "../../../components/Dashboard/Dashboard";

Enzyme.configure({ adapter: new Adapter() });
const props = {
  collectedOrders: [1, 1, 1],
  uncollectedOrders: [1, 3, 1],
  cancelledOrders: [1, 0, 0],
  datesConsidered: ["Wed Mar 13 2019", "Thu Mar 14 2019", "Fri Mar 15 2019"],
  isLoading: false,
  fetchVendorPerformance: jest.fn()
};

let component;

/*
global jest
expect
*/

describe('Dashboard Component', () => {
  component = mount(<Dashboard {...props} />);

  it('renders properly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should have line  and bar graph', () => {
    expect(component.find('Line')).toHaveLength(1);
    expect(component.find('Bar')).toHaveLength(1);
  });
});
