import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import ConnectedEditOrder, { EditOrder } from '../../../components/EditOrder/EditOrder';
import { mealItems } from '../../__mocks__/mockMealItems';
import Loader from '../../../components/common/Loader/Loader';
import { MockData } from '../../__mocks__/mockMenuListData'

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
  meal: {
    id: 1,
    datebookedFor: "Tue, 12 Mar 2019 00:00:00 GMT",
    channel: 'web',
    mealPeriod: 'lunch',
    mealItems,
  },
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

  it('shows loader', () => {
   const wrapper = getComponent();
   wrapper.setProps({
     isLoading:true,
     meal: null
   });
   expect(wrapper.find(Loader).length).toEqual(1);
  });

  // it('displays modal on click', () => {
  //   const wrapper = getComponent();
  //   expect(wrapper.instance().state.showModal).toBeFalsy();
  //   wrapper.find('.submit-order').simulate('click');
  //   expect(wrapper.instance().state.showModal).toBeTruthy();
  // })

  describe('Class Methods test:: Call', () => {
    it('componentDidMount()', () => {
      const spy = jest.spyOn(EditOrder.prototype, 'componentDidMount');
      getComponent().instance().componentDidMount();
      expect(spy).toHaveBeenCalled();
    });
  });
});


describe('Connected EditOrder component', () => {
  it('component successfully rendered', () => {
    const store = mockStore({
      orders: {
        menu: {},
      },
      upcomingMenus: {menus: [{menus: []}]}
    });
    const wrapper = shallow(<ConnectedEditOrder store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
