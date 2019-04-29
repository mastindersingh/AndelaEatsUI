/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { SuspendCard } from '../../../../components/Admin/SuspendedVendors/SuspendCard';
import vendors from '../../../__mocks__/mockVendors';
import UnSuspendModal from '../../../../components/Admin/SuspendedVendors/UnSuspendModal';

jest.mock('../../../../helpers/dateFormatter.js');

const props = {
  vendor: vendors[0],
  showUnSuspendModal: jest.fn()

};
const setup = () => (
  mount(<SuspendCard {...props} />)
);

const wrapper = setup();

describe('SuspendCard Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should call showUnSuspendModal', () => {

    wrapper.find('span[name="suspended-card"]').simulate('click')
    expect(props.showUnSuspendModal).toBeCalled()
  });
});

describe('UnSuspendModal Component', () => {
  const unsuspendedProps = {
    modalContent: {
      name: ''
    },
    unsuspendVendor: jest.fn()
  };
  const wrappedComponent = mount(<UnSuspendModal {...unsuspendedProps} />);

  it('should render correctly', () => {
    expect(wrappedComponent).toMatchSnapshot();
    expect(wrappedComponent.length).toEqual(1);
  });

  it('should call unsuspendVendor', () => {
    wrappedComponent.setProps({ displayUnsuspendModal: true });
    wrappedComponent.find('button[name="unsuspended-card"]').simulate('click')
    expect(unsuspendedProps.unsuspendVendor).toBeCalled()
  });
});
