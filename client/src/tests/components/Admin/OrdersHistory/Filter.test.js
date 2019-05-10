/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { Filter } from '../../../../components/Admin/OrderHistory/Filter';
import { formatDateToISOString } from '../../../../helpers/dateFormatter';

const props = {
  fetchOrders: jest.fn(),
  currentPage: 1
}
const setup = () => {
  return mount(<Filter {...props} />)
}

const wrapper = setup();


describe('Filter Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handle submit', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.setState({
      start: '"2017-12-20"',
      end: "2018-12-20"

    });

    wrapper.instance().handleSubmit();
    expect(spy).toBeCalled();
  });

  it('should toggle filter', () => {
    wrapper.find('.filter-btn').simulate('click');
    expect(wrapper.instance().state.isOpen).toBe(true);

    wrapper.find('.filter-btn').simulate('click');
    expect(wrapper.instance().state.isOpen).toBe(false);
  });

  it('should call onChange', () => {
    wrapper.setState({
      isOpen: true,
    });

    wrapper.find('input[name="start-date"]').simulate('change',
      { target: { name: "start-date", value: "1" } });
    wrapper.find('input[name="end-date"]').simulate('change',
      { target: { name: "end-date", value: "1" } });

    expect(props.fetchOrders).toBeCalled();
  });
});