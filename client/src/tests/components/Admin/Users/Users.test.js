/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Users, mapStateToProps } 
  from '../../../../components/Admin/Users/Users';

const props = {
  users: [
    { 
      name: 'miriam',
      email: "mim@gmail.com",
      id: 1, 
      userRoles: [{ id: 1, name: "admin" }] 
    }],
  fetchUsers: jest.fn(() => Promise.resolve()),
  createUser: jest.fn(() => Promise.resolve()),
  updateUser: jest.fn(() => Promise.resolve()),
  deleteUser: jest.fn(() => Promise.resolve()),
  loading: false,
  roles: [{ id: 1, name: "admin" }]
};
let wrapper;
beforeEach(() => {
  wrapper = mount(<Users {...props} />);
});

describe('Users Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render loader component', () => {
    const loaderProps = { ...props, loading: true };
    const compWrapper = mount(<Users {...loaderProps} />);
    expect(compWrapper).toMatchSnapshot();
  });

  it('should render an empty component', () => {
    const emptyProps = { ...props, users: [] };
    const compWrapper = mount(<Users {...emptyProps} />);
    expect(compWrapper).toMatchSnapshot();
  });

  it('should call createUser', () => {
    wrapper.find('.button-right').simulate('click');
    wrapper
      .find('#firstName').at(1)
      .simulate('change', { target: { name: 'firstName', value: 'Fred' } });
    wrapper
      .find('#lastName').at(1)
      .simulate('change', { target: { name: 'lastName', value: 'Yiga' } });
    wrapper.find('.submit').simulate('click');
    expect(props.createUser).toBeCalled();
  });

  it('should call updateUser', () => {
    wrapper.find('.fa-edit').simulate('click');
    wrapper.setState({
      user: {
        id: 1,
        lastName: 'Fred',
        firstName: 'Yiga',
        userTypeId: 1
      }
    });
    wrapper.find('.submit').simulate('click');
    expect(props.updateUser).toBeCalled();
  });

  it('sets error on an empty field', () => {
    wrapper.setProps({
      users: [
        { ...props.users[0], userRoles: null }
      ]
    });
    wrapper.find('.button-right').simulate('click');
    wrapper
      .find('#firstName').at(1)
      .simulate('change', { target: { name: 'firstName', value: 'Fred' } });
    wrapper.find('.submit').simulate('click');
    expect(wrapper.instance().state.errors.lastName).toBeTruthy();
  });

  it('call deleteUser', () => {
    wrapper.find('.button-right').simulate('click');
    wrapper.find('.fa-trash').simulate('click');
    const spy = jest.spyOn(wrapper.instance().props, 'deleteUser');
    wrapper.find('.delete-vendor').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('call closes modal', () => {
    wrapper.find('.button-right').simulate('click');
    expect(wrapper.instance().state.showModal).toBeTruthy();
    wrapper.find('.grayed').simulate('click');
    expect(wrapper.instance().state.showModal).toBeFalsy();
  });
  
  describe('mapStateToProps', () => {
    it('should map Users to state', () => {
      const initialState = {
        users: { users: [] },
      };
      expect(mapStateToProps(initialState).users).toEqual([]);
    });
  });
});
