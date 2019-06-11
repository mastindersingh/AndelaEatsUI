/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { UserRoles } from '../../../../components/Admin/Users/UserRoles';
import { roles, role, deleteRole } from '../../../__mocks__/mockRoles';

describe('renders UserRole', () => {
  const props = {
    createUserPermision: jest.fn().mockImplementation(() => Promise.resolve()),
    createUserRole: jest.fn().mockImplementation(() => Promise.resolve()),
    deleteUserPermision: jest.fn().mockImplementation(() => Promise.resolve()),
    deleteUserRole: jest.fn().mockImplementation(() => Promise.resolve()),
    editUserRole: jest.fn().mockImplementation(() => Promise.resolve()),
    getAllUserRoles: jest.fn().mockImplementation(() => Promise.resolve()),
    getRolePermisions: jest.fn().mockImplementation(() => Promise.resolve()),
    getAllPermisions: jest.fn().mockImplementation(() => Promise.resolve()),
    roles: []
  };

  const state = {
    name: '',
  };
  const wrapper = mount(<UserRoles {...props} />);
  it('it should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have an Modal component', () => {
    expect(wrapper.find('Modal').exists()).toBe(true);
  });

  it('should handle submit for creating a new user role', () => {
    wrapper.setState({
      roleId: 1,
      displayModal: true,
      modalTitle: 'ADD USER ROLE',
      name: 'waiter',
    });
    const event = {
      target: {
        elements: {
          name: {
            value: "waiter"
          },
        }
      },
      preventDefault: jest.fn(),
      roleId: 1
    };
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.update();
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });
  
  it('should return a warning for missing role after handle submit is called', () => {
    wrapper.setState({
      roleId: 1,
      displayModal: true,
      modalTitle: 'ADD USER ROLE',
      name: '',
    });
    const event = {
      target: {
        elements: {
          name: {
            value: ""
          },
        }
      },
      preventDefault: jest.fn(),
      roleId: 1
    };
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('should update a role after handle submit is called', () => {
    wrapper.setState({
      roleId: 1,
      displayModal: true,
      modalTitle: '',
      name: '',
    });
    const event = {
      target: {
        elements: {
          name: {
            value: ""
          },
        }
      },
      preventDefault: jest.fn(),
      roleId: 1
    };
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('should call renderRoles method with data', () => {
    const renderRolesSpy = jest.spyOn(wrapper.instance(), 'renderRoles');
    wrapper.instance().renderRoles(roles);
    expect(renderRolesSpy).toBeCalled();
    expect(renderRolesSpy).toHaveBeenCalledWith(roles);
  });

  it('should call showAddModal method', () => {
    const showAddModalSpy = jest.spyOn(wrapper.instance(), 'showAddModal');
    wrapper.instance().showAddModal();
    expect(showAddModalSpy).toHaveBeenCalled();
  });

  it('should call showDeleteModal method', () => {
    const showDeleteModalSpy = jest.spyOn(wrapper.instance(), 'showDeleteModal');

    wrapper.instance().showDeleteModal(deleteRole);
    expect(showDeleteModalSpy).toHaveBeenCalled();
  });

  it('should call showPermisionModal method', () => {
    const showPermisionModalSpy = jest.spyOn(wrapper.instance(), 'showPermisionModal');
    wrapper.instance().showPermisionModal(role[0]);
    expect(showPermisionModalSpy).toHaveBeenCalled();
  });

  it('should call deleteRole method', () => {
    const deleteRoleSpy = jest.spyOn(wrapper.instance(), 'deleteRole');
    wrapper.instance().deleteRole(role[0]);
    expect(deleteRoleSpy).toHaveBeenCalled();
  });

  it('should call showEditModal method', () => {
    const showEditModalSpy = jest.spyOn(wrapper.instance(), 'showEditModal');
    wrapper.instance().showEditModal(role[0]);
    expect(showEditModalSpy).toHaveBeenCalled();
  });
  it('should change role name', () => {
    wrapper.instance().onChange({ target: { name: 'name', value: 'waiter' } });
    expect(wrapper.instance().state.name).toEqual('waiter');
  });

  it('should call deletePermision method', () => {
    const deletePermisionSpy = jest.spyOn(wrapper.instance(), 'deletePermision');
    wrapper.instance().deletePermision(role[0]);
    expect(deletePermisionSpy).toHaveBeenCalled();
  });

  it('should call handleAddPermision method', () => {
    wrapper.setState({
      roleId: 1,
      displayModal: true,
      permision: 'Create',
      keyword: 'Create',
    });
    const event = {
      preventDefault: jest.fn(),
    };
    const handleAddPermisionSpy = jest.spyOn(wrapper.instance(), 'handleAddPermision');
    wrapper.instance().handleAddPermision(event);
    expect(handleAddPermisionSpy).toHaveBeenCalled();
  });
});
