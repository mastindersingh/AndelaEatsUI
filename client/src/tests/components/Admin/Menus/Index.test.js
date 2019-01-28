/* eslint-disable no-undef */

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Menus } from '../../../../components/Admin/Menus/Index';
import menu from '../../../__mocks__/mockMenuList';
import Loader from '../../../../components/common/Loader/Loader';

const menusState = {
  error: {
    status: false,
    message: null
  },
  isLoading: false,
  menuList: [
    menu[0],
  ],
  vendorEngagements: [{
    vendorId: 1,
    vendor: { name: 'Tasty', id: 1 },
    startDate: "Fri, 07 Dec 2018 00:00:00 GMT",
    endDate: "Fri, 14 Dec 2018 00:00:00 GMT"
  }],
  isDeleting: false,
};

describe('Admin: Menu Component', () => {
  let wrapper;

  const props = {
    menus: { ...menusState },
    fetchMenus: jest.fn(),
    fetchVendorEngagements: jest.fn(),
    fetchMealItems: jest.fn(),
    createMenu: jest.fn(() => Promise.resolve()),
    editMenu: jest.fn(() => Promise.resolve()),
    deleteMenuItem: jest.fn(() => Promise.resolve())
  };

  beforeEach(() => {
    wrapper = mount(<Menus {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it('should render loader', () => {
    wrapper.setProps({
      ...props,
      menus: {
        ...menusState,
        isLoading: true,
      }
    });

    expect(wrapper.find(Loader).length).toEqual(1);
  });

  it('should render error', () => {
    wrapper.setProps({
      ...props,
      menus: {
        ...menusState,
        isLoading: false,
        error: {
          status: true,
          message: 'Error message'
        }
      }
    });

    expect(wrapper.find('.no-content').length).toEqual(1);
  });

  it('should render empty menus items', () => {
    wrapper.setProps({
      ...props,
      menus: {
        ...menusState,
        menuList: [],
      }
    });

    expect(wrapper.find('.empty-content').length).toEqual(1);
  });

  it('should call showAddModal method when creating a menu', () => {
    const spy = jest.spyOn(wrapper.instance(), 'showAddModal');
    wrapper.setState({
      displayModal: true,
      modalTitle: 'ADD MENU',
      modalButtontext: 'Add Menu',
    });
    wrapper.instance().showAddModal(menu[0]);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.find('.custom-table').length).toEqual(1);
  });

  it('should call showAddModal method when editing a menu', () => {
    const spy = jest.spyOn(wrapper.instance(), 'showAddModal');
    wrapper.setState({
      displayModal: true,
      modalTitle: 'ADD MENU',
      modalButtontext: 'Add Menu',
    });
    wrapper.instance().showAddModal(menu[0], true);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.find('.custom-table').length).toEqual(1);
  });

  it('should call closeModal method', () => {
    const closeModalSpy = jest.spyOn(wrapper.instance(), 'closeModal');
    wrapper.update();
    wrapper.instance().closeModal();
    expect(closeModalSpy).toHaveBeenCalled();
  });

  it('should call handleSubmit method on creating a menu', () => {
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.update();
    wrapper.instance().handleSubmit();
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('should call handleSubmit method on editing a menu', () => {
    wrapper.setState({
      editMenu: true,
      menuDetails: menusState.menuList[0],
    });
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.update();
    wrapper.instance().handleSubmit();
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('should display menu on clicking viewMenu', () => {
    expect(wrapper.instance().state.displayModal).toBe(false);
    const handleViewMenuspy = jest.spyOn(wrapper.instance(), 'handleViewMenu');
    const button = wrapper.find('#view-menu').simulate('click');
  });

  it('should call deleteMenu on clicking delete', () => {
    expect(wrapper.instance().state.displayDeleteModal).toBe(false);
    const deleteButton = wrapper.find('.delete-menu').simulate('click');
    expect(wrapper.instance().state.displayDeleteModal).toBe(true);
    const callDeleteButton = wrapper.find('#delete-meal').simulate('click');
  });
});
