import React from 'react';
import { shallow } from 'enzyme';
import CollectedAction from '../../../components/MealCard/CollectedAction';

const props = {
  id: '0023',
  rating: 5
};
/* 
global jest 
expect 
*/
describe('CollectedAction Component', () => {
  const wrapper = shallow(<CollectedAction {...props} />);

  it('should render atleast once', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
});
