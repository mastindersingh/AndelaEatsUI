/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import { OrderHistory } from '../../../../components/Admin/OrderHistory/Index';

const setup = () => {
  const props = {
    orderHistory: {
      orders: []
    },
    isLoading: false,
    fetchOrders: jest.fn(),
    handlePaginationChange: jest.fn(),
    history: {
      push: jest.fn()
    },
    orders: []
  }

  return shallow(<OrderHistory {...props} />)
}

const wrapper = setup();


describe('OrderHistory Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })
  
  it('expects the following methods to be defined', () => {
    wrapper.instance().componentDidMount();
    wrapper.instance().redirectToExport();
    wrapper.instance().onChange();
    wrapper.instance().renderOrder() 
  })
});
