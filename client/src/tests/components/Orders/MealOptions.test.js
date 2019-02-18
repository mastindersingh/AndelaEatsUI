import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedMenus,
{ MealOptions, Menus } from '../../../components/Order/Menus';
import { mockMenu } from '../../helpers/mockOrders';

const props = {
  data: [
    {
      date: "2018-11-21",
      id: 29,
      menus: []
    }
  ],
  mealOptions: mockMenu,
  title: 'Test Meal',
  selectedMealId: 1,
  toggleModal: jest.fn(),
  selectMeal: jest.fn(),
  match: {
    params: { date: "2018-11-21" }
  },
  resetMenu: jest.fn(),
  updateSelection: jest.fn(),
  menu: mockMenu[0],
  getOrderByDate: () => Promise.resolve(),
  menusLists: {
    menus: [
      {
        date: "2018-11-21",
        id: 29,
        menus: []
      }
    ]
  },
  orderedMenus: []
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let wrapper;
/*
global jest
expect
*/
describe('MealOptions Component', () => {
  it('should mount successfully', () => {
    wrapper = shallow(<MealOptions {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('should have a title', () => {
    wrapper = shallow(<MealOptions {...props} />);
    expect(wrapper.find('h3').contains(props.title)).toBeTruthy();
  });

  describe('class methods test', () => {
    it('onChange method', () => {
      const mealId = 1;

      const selectMealSpy = jest.spyOn(props, 'updateSelection');
      wrapper = shallow(<MealOptions {...props} />);
      wrapper.instance().onChange(mealId, true);

      expect(selectMealSpy).toHaveBeenCalled();
    });
  });
});


describe('ConnectedMenus Test', () => {
  it('renders without problems', () => {
    const store = mockStore({
      orders: {
        isLoading: false,
        menu: mockMenu
      }
    });
    wrapper = shallow(<ConnectedMenus store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
