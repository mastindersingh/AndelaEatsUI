/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';

import { SuspendedVendor } from '../../../../components/Admin/SuspendedVendors/Index';
import vendors from '../../../__mocks__/mockVendors';

const setup = () => {
  const props = {
    vendors,
    isLoading: false,
    fetchSuspensions: jest.fn(),
    unsuspendVendor: jest.fn().mockImplementation(() => Promise.resolve())
  };

  return mount(<SuspendedVendor {...props} />);
};

const wrapper = setup();


describe('Suspended Engagement', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have an SuspendCard component', () => {
    expect(wrapper.find('SuspendCard').exists()).toBe(true);
  });

  it('should call renderVendors method', () => {
    const renderVendorspy = jest.spyOn(wrapper.instance(), 'renderVendors');
    wrapper.instance().renderVendors(vendors);
    expect(renderVendorspy).toBeCalled();
    expect(renderVendorspy).toHaveBeenCalledWith(vendors);
  });

  it('should call closeModal method', () => {
    const closeModalSpy = jest.spyOn(wrapper.instance(), 'closeModal');
    wrapper.instance().closeModal();
    expect(closeModalSpy).toHaveBeenCalled();
  });

  it('should call unsuspendVendor method', () => {
    const unsuspendVendorSpy = jest.spyOn(wrapper.instance(), 'unsuspendVendor');
    wrapper.instance().unsuspendVendor(vendors[0].id);
    expect(unsuspendVendorSpy).toHaveBeenCalled();
  });

  it('should call showUnSuspendModal method', () => {
    const showUnSuspendModalSpy = jest
      .spyOn(wrapper.instance(), 'showUnSuspendModal');
    wrapper.instance().showUnSuspendModal(vendors);
    expect(showUnSuspendModalSpy).toHaveBeenCalled();
  });
});