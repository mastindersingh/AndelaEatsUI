/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';

import { Ratings } from '../../../../components/Admin/Ratings/Index';

const setup = () => {
  const props = {
    allRatings: {
      isLoading: false,
      ratingList: [],
    },
    fetchMealRatings: jest.fn(),
  };
  return mount(<Ratings {...props} />);
};

const wrapper = setup();


describe('Ratings Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  it('expects the following methods to be defined', () => {
    wrapper.instance().handleFilterModal();
    wrapper.instance().handleFilterSubmit();
  });
});