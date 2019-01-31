import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { toast } from 'react-toastify';
import ConnectedOrders, { Orders } from '../../../components/Order/Orders';
import { mockMenu } from '../../helpers/mockOrders';

const props = {
  userMenus: mockMenu,
  match: {
    url: 'http:abc.css'
  },
  fetchMenu: () => Promise.resolve(),
  fetchUserOrders: jest.fn(),
  createOrder: jest.fn().mockImplementation(() => Promise.resolve()),
  resetMenu: jest.fn(),
  selectMeal: jest.fn(),
  mealSelected: {
    acc1: 'fish', acc2: 'cake', mainMeal: 'eba'
  },
  message: "sss"
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const context = {
  router: {
    history: {
      push: jest.fn()
    }
  }
};

jest.mock('../../../helpers/mealsHelper', () => ({
  validateDate: () => true,
  canOrderMeal: () => true,
  endDate: () => new Date()
}));

/* 
global jest 
expect 
*/
describe('Orders Component', () => {
  const wrapper = shallow(
    <Orders {...props} />, { context }
  );

  it('should mount successfully', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have an orders-wrapper div', () => {
    wrapper.setState({ isLoading: false });
    expect(wrapper.find('.orders-wrapper').length).toBeGreaterThan(0);
  });

  describe('class methods test', () => {
    it('toggleModal', () => {
      wrapper.instance().toggleModal();
      expect(wrapper.instance().state.isModalOpen).toBe(true);
    });

    it('showToast', () => {
      const spy = jest.spyOn(toast, 'success');
      wrapper.instance().showToast();
      expect(spy).toHaveBeenCalled();
    });

    it('calls render method of Route', () => {
      const routeWrapper = shallow(wrapper.find('Route').prop('render')(props));
      expect(routeWrapper.length).toBe(1);
    });
  });
});


describe('ConnectedOrders test', () => {
  it('should render correctly', () => {
    const store = mockStore({
      upcomingMenus: {
        userMenus: [],
        acc1: {},
        acc2: {},
        mainMeal: {},
        message: '',
        isLoading: false
      }
    });

    expect(shallow(<ConnectedOrders store={store} />)).toMatchSnapshot();
  });
});