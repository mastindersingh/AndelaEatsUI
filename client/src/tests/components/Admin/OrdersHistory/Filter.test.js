/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';

import { Filter } from '../../../../components/Admin/OrderHistory/Filter';

const setup = () => {
  const props = {
    fetchOrders: jest.fn(),
    currentPage: 1
  }

  return mount(<Filter {...props} />)
}

const wrapper = setup();


describe('Filter Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })
  
  it('expects the following methods to be defined', () => {
    wrapper.instance().toggleFilterModal();
    wrapper.instance().handleSubmit();
  })
})
