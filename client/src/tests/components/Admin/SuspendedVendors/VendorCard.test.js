/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { SuspendCard } from '../../../../components/Admin/SuspendedVendors/SuspendCard';
import vendors from '../../../__mocks__/mockVendors';

jest.mock('../../../../helpers/dateFormatter.js');

const setup = () => {
  const props = {
    vendor: vendors[0]
  };

  return mount(<SuspendCard {...props} />);
};

const wrapper = setup();

describe('SuspendCard Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
});
