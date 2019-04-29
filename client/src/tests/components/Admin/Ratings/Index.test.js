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
    fetchMealRatings: jest.fn(() => Promise.resolve()),
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

  it('expects should call handle filters', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleFilterSubmit');
    wrapper.setState({
      end: "2018-12-20"

    });
    wrapper.instance().handleFilterSubmit();
    expect(spy).toBeCalled();
  });

  it('should clear filter', () => {
    wrapper.setState({
      isOpen: true,
      end: "1/2/2019",
    });
    wrapper.find('.action-item').first().simulate('click');
    expect(wrapper.instance().state.end).toEqual('');
  });
});
