import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedNavBar, { Navbar } from '../../../components/common/Navbar/Navbar'; //eslint-disable-line

const props = {
  activeUser: {
    name: 'Larrystone Yakov',
    picture: ''
  },
  userRole: {
      role: 0
  },
  logoutActiveUser: jest.fn(),
  loadActiveUser: jest.fn(),
  getAdminUser: jest.fn(),
  history: {
    push: jest.fn()
  }
};

let wrapper;
/*
global jest
expect
*/
describe('NotCollectedAction Component', () => {
  it('should render atleast once', () => {
    wrapper = shallow(<Navbar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Class methods test', () => {
    it('componentDidUpdate method', () => {
      const prevProp = { ...props, activeUser: { name: 'Bamboo HR', userRole: { role: 1 } } };
      wrapper = shallow(<Navbar {...props} />);
      wrapper.instance().componentDidUpdate(prevProp);
      expect(wrapper.instance().state.activeUser).toBe(props.activeUser);
    });

    it('logOutUser method', () => {
      const logOutSpy = jest.spyOn(props, 'logoutActiveUser');
      wrapper = shallow(<Navbar {...props} />);
      wrapper.instance().logOutUser();
      expect(logOutSpy).toHaveBeenCalled();
    });
  });
});

