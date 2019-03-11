import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import ConnectedEditOrder, { EditOrder } from '../../../components/EditOrder/EditOrder';
import menus from '../../__mocks__/mockMenuList';
import { mealItems } from '../../__mocks__/mockMealItems';
import Loader from '../../../components/common/Loader/Loader';

/* 
global jest 
expect 
*/
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let mountedComponent;
const props = {
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
  menus,
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

  it('displays modal on click', () => {
    const wrapper = getComponent();
    expect(wrapper.instance().state.showModal).toBeFalsy();
    wrapper.find('.submit-order').simulate('click');
    expect(wrapper.instance().state.showModal).toBeTruthy();
  })

  describe('Class Methods test:: Call', () => {
    it('componentDidMount()', () => {
      const spy = jest.spyOn(EditOrder.prototype, 'componentDidMount');
      getComponent().instance().componentDidMount();
      expect(spy).toHaveBeenCalled();
    });

    const event = {
      target: {
        name: "main",
        value: "Rice Beans"
      },
      preventDefault: () => jest.fn()
    };

    it('handleOptionChange() for main meal', () => {
      const wrapper = getComponent();
      wrapper.setState({
        menu: menus[0],
        filteredMenus: menus
      })
      const instance = wrapper.instance();
      wrapper.update()
      const spy = jest.spyOn(instance, 'handleOptionChange');
      
      instance.handleOptionChange(event);
      expect(spy).toHaveBeenCalled();
    });

    it('handleOptionChange() for main meal', () => {
      const event = {
        target: {
          name: "side",
          value: "Rice Beans"
        },
        preventDefault: () => jest.fn()
      };
  
      const wrapper = getComponent();
      wrapper.setState({
        menu: menus[0]
      })
      const instance = wrapper.instance();
      wrapper.update()
      const spy = jest.spyOn(instance, 'handleOptionChange');
      
      instance.handleOptionChange(event);
      expect(spy).toHaveBeenCalled();
    });

    it('handleFormSubmit', () => {
      const wrapper = getComponent();
      wrapper.setState({
          firstAccompaniment: 'Rice and Stew',
          secondAccompaniment: 'Fish',
          menu: {allowedProtein: 1, allowedSide:1, 
          date: "Tue, 12 Mar 2019 00:00:00 GMT",
          mainMeal: mealItems[0],
          proteinItems: [mealItems[2]],
          sideItems: [mealItems[1]]
      }
      })
      const spy = jest.spyOn(wrapper.instance(), 'handleFormSubmit');
      
      wrapper.instance().handleFormSubmit(event);
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
