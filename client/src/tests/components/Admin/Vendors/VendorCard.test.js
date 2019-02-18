/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { VendorCard } from '../../../../components/Admin/Vendors/VendorCard';
import vendors from '../../../__mocks__/mockVendors';

jest.mock('../../../../helpers/dateFormatter.js');

const setup = () => {
  const props = {
    vendor: vendors[0],
    rating: 3,
    showSuspendModal: jest.fn(),
    showEditModal: jest.fn()
  };

  return mount(<VendorCard {...props} />);
};

const wrapper = setup();

describe('VendorCard Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
});
