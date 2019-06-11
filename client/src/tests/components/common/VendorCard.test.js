/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { VendorCard } from '../../../components/Admin/Vendors/VendorCard';
import vendors from '../../__mocks__/mockVendors';

jest.mock('../../../helpers/dateFormatter.js');

const props = {
  vendor: vendors[0],
  rating: 3,
  showSuspendModal: jest.fn(),
  showEditModal: jest.fn()
};

const setup = () => (
  mount(<VendorCard {...props} />)
);

const wrapper = setup();

describe('VendorCard Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should call showEditModal', () => {
    wrapper.find('.edit-vendor').simulate('click')
    expect(props.showEditModal).toBeCalled()
  });
  it('should call showSuspendModal', () => {
    wrapper.find('.suspend-vendor').simulate('click')
    expect(props.showSuspendModal).toBeCalled()
  });
});
