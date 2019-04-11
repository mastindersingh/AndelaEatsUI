/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { Users } from '../../../../components/Admin/Users/Users';

const props = {
  adminUsers: [{ name: 'miriam', email: "mim@gmail.com"}],
  message: "",
  userEmail: "",
  createAdminUser: jest.fn(),
  getAllAdminUsers: jest.fn(),
};

const wrapper = shallow(<Users {...props} />);

describe('Users Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle submit', () => {
    const event = {
      target: {
        elements: {
          userEmail: {
            value: "miriam@gmail.com"
          },
        }
      },
      preventDefault: jest.fn(),
    };

    wrapper.update();
    wrapper.find('form').simulate('submit',
      event
    );

    expect(props.createAdminUser).toBeCalled();
  });
});
