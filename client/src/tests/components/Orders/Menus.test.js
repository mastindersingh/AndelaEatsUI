/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';

import { Menus } from '../../../components/Order/Menus';

const setup = () => {
  const props = {
    menu: {
      id: '234'
    },
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
    mealSelected: jest.fn()
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
})