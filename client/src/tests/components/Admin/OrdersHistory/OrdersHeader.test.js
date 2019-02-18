/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import { OrdersHeader } from '../../../../components/Admin/OrderHistory/OrdersHeader';

const setup = () => {
  const props = {
    title: '',
    orders: [],
    redirectToExport: jest.fn(),
    svg: '',
    type: 2,
    headers: []
  }

  return shallow(<OrdersHeader {...props} />)
}

const wrapper = setup();


describe('OrdersHeader Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })
});
