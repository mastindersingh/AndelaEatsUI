import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import ConnectedEditOrder, { EditOrder } from '../../../components/EditOrder/EditOrder';

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
  menu: {
    date: "2018-07-19",
    id: 2001,
    meal: {
      main: [{
        id: 1,
        meal: {}
      }],
      firstAccompaniment: [{
        id: 1,
        meal: {}
      }],
      secondAccompaniment: [{
        id: 1,
        meal: {}
      }]
    }
  },
  history: { 
    push: () => jest.fn()
  },
  editOrder: () => Promise.resolve(),
  updateOrder: () => Promise.resolve(),
  
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

  describe('Class Methods test:: Call', () => {
    it('componentDidMount()', () => {
      const spy = jest.spyOn(EditOrder.prototype, 'componentDidMount');
      getComponent().instance().componentDidMount();
      expect(spy).toHaveBeenCalled();
    });

    it('componentWillReceiveProps()', () => {
      const newState = {
        main: "1",
        firstAccompaniment: "2", 
        secondAccompaniment: "3"
      };
      const nextProps = {
        order: {
          orderData: {
            main: "1",
            firstAccompaniment: "2", 
            secondAccompaniment: "3"
          }
        }
      }
      const spy = jest.spyOn(EditOrder.prototype, 'componentWillReceiveProps');
      const wrapper = getComponent().instance();
      wrapper.componentWillReceiveProps(nextProps);

      expect(spy).toHaveBeenCalled();
      expect(wrapper.state).toEqual(newState);
    });

    const event = {
      target: {
        name: "searchParam",
        value: "Rice Beans"
      },
      preventDefault: () => jest.fn()
    };

    it('handleOptionChange()', () => {
      const wrapper = getComponent().instance();

      const spy = jest.spyOn(wrapper, 'handleOptionChange');
      wrapper.handleOptionChange(event);
      expect(spy).toHaveBeenCalled();
      expect(wrapper.state.searchParam).toBe(event.target.value);
    });

    it('handleFormSubmit', () => {
      const wrapper = getComponent().instance();

      const spy = jest.spyOn(wrapper, 'handleFormSubmit');
      wrapper.handleFormSubmit(event);
      expect(spy).toHaveBeenCalled();
    });

    it('isDisabled', () => {
      const wrapper = getComponent().instance();

      const spy = jest.spyOn(wrapper, 'isDisabled');
      wrapper.isDisabled();
      expect(spy).toHaveBeenCalled();
    });

    it('should handle redirect', () => {
      const historySpy = jest.spyOn(props.history, 'push');
      // const history = { push: jest.fn() }

      getComponent().find('.reset-order').simulate('click');

      expect(historySpy).toHaveBeenCalled();
    });
  });
});


describe('Connected EditOrder component', () => {
  it('component successfully rendered', () => {
    const store = mockStore({
      orders: {
        menu: {}
      }
    });
    const wrapper = shallow(<ConnectedEditOrder store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
