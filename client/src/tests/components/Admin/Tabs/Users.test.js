/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Index from '../../../../components/Admin/Tabs/Users';

describe('Users Tab Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Index />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
});
