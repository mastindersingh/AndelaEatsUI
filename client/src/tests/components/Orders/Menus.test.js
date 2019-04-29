/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';

import { Menus, MealOptions } from '../../../components/Order/Menus';
import Loader from '../../../components/common/Loader/Loader';
import { MockData } from '../../__mocks__/mockMenuListData';

let wrapper;

describe('Menus Component', () => {
  const setup = () => {
    const props = {
      menu: {
        id: '234'
      },
      orderedMenus: [

        { dateBookedFor: '2018-12-02' }

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
      edit: false,
      setSelectedMenu: jest.fn(),
      selectMenuListId: jest.fn()
    }

    return mount(<Menus {...props} />)
  }

  wrapper = setup();
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
      edit: true
    });
    expect(wrapper.find(Loader).length).toEqual(1);
  });

  it('calls toggleModal', () => {
    wrapper.setProps({
      isLoading: false,
      match: null,
      data: MockData.payload.menuList,
      date: '2018-11-23',
      order: { mainMeal: 1, acc1: 2, acc2: 3 }
    })
    const spy = jest.spyOn(wrapper.instance().props, 'toggleModal')
    wrapper.find('.submit-order').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('hshould call updateSelection ', () => {
    const spy = jest.spyOn(wrapper.instance(), 'updateSelection');

    wrapper.instance().updateSelection("mainMeal", "234", "232");
    wrapper.find('.submit-order').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});

describe('MealOptions componen', () => {
  const props = {
    category: 'mainMeal',
    mealOptions: [],
    title: '',
    selectedMealId: '444',
    updateSelection: jest.fn()
  };

  it('should call updateSelection ', () => {
    wrapper = mount(<MealOptions {...props} />)
    wrapper.instance().onChange("234", true, "232")

    expect(props.updateSelection).toHaveBeenCalled();
  });
});
