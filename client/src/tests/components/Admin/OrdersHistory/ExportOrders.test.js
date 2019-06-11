/* eslint-disable no-undef */
import React from 'react';
import { mount, shallow } from 'enzyme';

import {
  ExportOrders
} from '../../../../components/Admin/OrderHistory/ExportOrders';

import orders from '../../../__mocks__/mockOrders';

const setup = (isLoading) => {
  const props = {
    fetchOrders: jest.fn(),
    orderHistory: {
      orders,
    },
    isLoading,
  };

  return (shallow(<ExportOrders {...props} />));
};

let wrapper;

describe('ExportOrders Component', () => {
  it('should render correctly', () => {
    wrapper = setup(false);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });


  it('should unmount loader node once api request is done', () => {
    wrapper = setup(false);
    const loader = wrapper.find('div.loader-container');
    expect(loader.exists()).toBe(false);
    expect(loader.length).toBe(0);
  });

  it('should display EmptyContent if no orders', () => {
    wrapper = setup(false);
    wrapper.setProps({
      orderHistory: {
        orders: [],
      },
    });

    expect(wrapper.find('EmptyContent').exists()).toBe(true);
  });
});