/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import OrderCard from '../../../../components/Admin/OrderHistory/OrderCard';

const setup = () => {
  const props = {
    order: {
      userId: '39203',
      dateBookedFor: '2018-12-02',
      mealItems: [{name: 'fish'}, {name: 'Luk'}, {name: 'rt'}],
      orderStatus: false
    }
  };

  return mount(<OrderCard {...props} />);
};

const wrapper = setup();

describe('OrderCard Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
});
