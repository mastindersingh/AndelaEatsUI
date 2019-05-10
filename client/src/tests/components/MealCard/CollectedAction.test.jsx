import React from 'react';
import { shallow } from 'enzyme';
import CollectedAction from '../../../components/MealCard/CollectedAction';

const props = {
  id: '0023',
  rating: 5,
  meal: {
    hasRated: false,
  },
  showRatingModal: jest.fn()
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

  it('should render atleast once', () => {
    wrapper.find('a[name="rate-meal"]').simulate('click')
    expect(props.showRatingModal).toBeCalled();
  });
});
