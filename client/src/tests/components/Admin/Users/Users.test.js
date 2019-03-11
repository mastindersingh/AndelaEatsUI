import React from 'react';
import { mount } from 'enzyme';

import { Users } from '../../../../components/Admin/Users/Users';

const setup = () => {
  const props = {
    adminUsers: [],
    message: "",
    userEmail: "",
    createAdminUser: jest.fn(),
    getAllAdminUsers: jest.fn(),
  };
  return mount(<Users {...props} />);
};

const wrapper = setup();

describe('Users Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
