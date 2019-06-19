import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { wrap } from 'module';
import ConnectedEditOrder, { EditOrder } from '../../../components/EditOrder/EditOrder';
import { mealItems } from '../../__mocks__/mockMealItems';
import { MockData } from '../../__mocks__/mockMenuListData';

/*
global jest
expect
*/
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let mountedComponent;
const props = {
  menus: MockData.payload.menuList,
  match: {
    params: { id: 1 },
    url: '/orders/edit/000023"'
  },
  location: {
    query: {
      main: "Beans",
      protein: "Cake"
    }
  },
  meal: null,
  mealSelected: {},
  history: {
    push: () => jest.fn()
  },
  editOrder: () => Promise.resolve(),
  updateOrder: () => Promise.resolve(),
  fetchMenu: () => Promise.resolve(),

};

/**
 * @description Initialise the component
 *
 * @returns {object} ManageRecipe - Mounted component
 */
const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<EditOrder {...props} />);
  }
  return mountedComponent;
};

describe('Component: Orders', () => {
  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(getComponent()).toMatchSnapshot();
  });

  it('should change menuListId state when selectMenuListId is called ', () => {
    const wrapper = getComponent();
    const spy = jest.spyOn(wrapper.instance(), 'selectMenuListId');
    wrapper.setProps({
      meal: {
        id: 2,
        datebookedFor: "Wed, 10 Mar 2019 00:00:00 GMT",
        channel: 'web',
        mealPeriod: 'dinner',
        mealItems,
        menuId: 28
      },
    });
    wrapper.instance().selectMenuListId('1');
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.menuListId).toEqual("1");
  });

  it('should change selectedMenu state when setSelectedMenu is called ', () => {
    const wrapper = getComponent();
    const spy = jest.spyOn(wrapper.instance(), 'setSelectedMenu');

    wrapper.instance().setSelectedMenu('1');
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.selectedMenu).toEqual("1");
  });

  it('should display modal', () => {
    const wrapper = getComponent();
    expect(wrapper.instance().state.showModal).toBeFalsy();
    wrapper.instance().handleModalDisplay();
    expect(wrapper.instance().state.showModal).toBeTruthy();
  });

  it('should show loader', () => {
    const wrapper = getComponent();
    wrapper.setProps({
      isLoading: true
    });
    expect(wrapper.find('.wheel'));
  });
});

describe('Connected EditOrder component', () => {
  it('component successfully rendered', () => {
    const store = mockStore({
      orders: {
        menu: {},
      },
      upcomingMenus: { menus: [{ menus: [] }] }
    });
    const wrapper = shallow(<ConnectedEditOrder store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
