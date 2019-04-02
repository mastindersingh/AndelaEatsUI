/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';

import { Menus } from '../../../components/Order/Menus';
import Loader from '../../../components/common/Loader/Loader';
import { MockData } from '../../__mocks__/mockMenuListData';

const setup = () => {
  const props = {
    menu: {
      id: '234'
    },
    orderedMenus: [
      
        {dateBookedFor:  '2018-12-02'}
      
    ],
    isLoading: false,
    toggleModal: jest.fn(),
    match: {
      params: {
        date: '2018-12-02'
      }
    },
    data: [],
    resetMenu: jest.fn(),
    selectMeal: jest.fn(),
    mealSelected: jest.fn(),
    edit:false
  }

  return mount(<Menus {...props} />)
}

const wrapper = setup();


describe('Menus Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })
  
  it('expects the following methods to be defined', () => {
    wrapper.instance().resetMenus();
    wrapper.instance().updateSelection();
    wrapper.instance().hasUserAlreadyBooked();
    wrapper.instance().validateMeals();
  })

  it('shows loader', () => {
    wrapper.setProps({
      isLoading: true,
      edit:true
    });
    expect(wrapper.find(Loader).length).toEqual(1);
  });

  it('calls toggleModal', () => {
    wrapper.setProps({
      isLoading: false,
      match: null,
      data: MockData.payload.menuList,
      date:'2018-11-23',
      order: {mainMeal: 1, acc1:2, acc2:3}
    })
    const spy = jest.spyOn(wrapper.instance().props, 'toggleModal')
    wrapper.find('.submit-order').simulate('click');
    expect(spy).toHaveBeenCalled();
  })
})