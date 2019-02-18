/* eslint-disable no-undef */
import React, { Component } from 'react';
import { mount } from 'enzyme';
import SuspendVendorModal from '../../../../components/Admin/Vendors/SuspendVendorModal';

const setup = (status) => {
  const props = {
    modalContent: {
      contactPerson: "Chibueze",
      createdAt: "Fri, 14 Sep 2018 06:52:30 GMT",
      id: "-LMLqYeE1Ubdy79p4Nwo",
      phoneNumber: "01234567890",
      updatedAt: "Fri, 14 Sep 2018 06:52:30 GMT",
      vendorAddress: "No 233, Ikorodu road, Lagos",
      vendorName: "Mr Medium"
    },
    displaySuspendModal: status,
    closeSuspendModal: jest.fn(),
    suspendVendor: jest.fn(),
  };

  return mount(<SuspendVendorModal {...props} />);
};

const wrapper = setup(true);

describe('SuspendVendorModal Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should simulate suspend button click', () => {
    wrapper.find('.delete-vendor').simulate('click');
  });
});
