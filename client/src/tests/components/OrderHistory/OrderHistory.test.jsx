import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import OrderHistory, {
  Orders
} from '../../../components/OrderHistory/OrderHistory';

/* 
global jest 
expect 
*/
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let mountedComponent;
let props = {
  match: {
    url: '/orders'
  },
  orders: {
    isLoading: false,
    meals: [{
      id: '000023',
      name: {
        main: 'Ugali',
        protein: 'Beef'
      },
      imageUrl: 'http://cdn.playbuzz.com/cdn/89c9243a-e0cd-495e-90e0-11642327f13f/f4b834c8-a506-43f5-8c2c-3e125311275c_560_420.jpg', //eslint-disable-line
      orderDate: '2018-07-09T10:51:21.876Z',
      isCollected: false,
      rating: 0,
      isFiltered: false,
    }],
    currentPage: 1,
    totalRecords: 0,
  },
  fetchOrders: () => Promise.resolve(),
  filterOrders: () => Promise.resolve(),
  deleteOrder: () => Promise.resolve()
};

/**
 * @description Initialise the component
 *
 * @returns {object} ManageRecipe - Mounted component
 */
const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<Orders {...props} />);
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
      const spy = jest.spyOn(Orders.prototype, 'componentDidMount');
      getComponent().instance().componentDidMount();
      expect(spy).toHaveBeenCalled();
    });

    it('onChange()', () => {
      const target = {
        name: "searchParam",
        value: "Rice Beans"
      };
      const spy = jest.spyOn(Orders.prototype, 'onChange');
      getComponent().instance().onChange({ target });
      expect(spy).toHaveBeenCalled();
      expect(getComponent().instance().state.searchParam).toBe(target.value);
    });

    it('clearForm()', () => {
      const spy = jest.spyOn(Orders.prototype, 'clearForm');
      getComponent().instance().setState({
        isOpen: true,
        searchParam: 'Beans yam',
        start: 'today',
        end: 'tomorrow',
        showModal: false,
        modalContent: null
      });
      getComponent().instance().clearForm();
      expect(spy).toHaveBeenCalled();

      expect(getComponent().instance().state).toEqual({
        isOpen: true,
        searchParam: '',
        start: '',
        end: '',
        showModal: false,
        modalContent: null,
        newRating: 0,
        showModal: false,
        showRatingModal: false,
        start: "",
        textArea: "",
        modalTitle: ""
      });
    });

    describe('handlePageChange()', () => {
      it('then calls fetchOrders', () => {
        const page = 2;
        const fetchOrdersSpy = jest.spyOn(props, 'fetchOrders');
        const pageChangeSpy = jest.spyOn(Orders.prototype, 'handlePageChange');
        getComponent().instance().handlePageChange(page);
        expect(pageChangeSpy).toHaveBeenCalled();
        expect(fetchOrdersSpy).toHaveBeenCalled();
      });

      it('then calls filterOrders', () => {
        const page = 2;
        props = { ...props, orders: { ...props.orders, isFiltered: true } };
        const filterOrdersSpy = jest.spyOn(props, 'filterOrders');
        getComponent().instance().handlePageChange(page);
        expect(filterOrdersSpy).toHaveBeenCalled();
      });
    });

    it('handleFilter()', () => {
      const spy = jest.spyOn(Orders.prototype, 'handleFilter');
      getComponent().instance().handleFilter();
      expect(spy).toHaveBeenCalled();
      expect(getComponent().instance().state.isOpen).toEqual(false);
    });

    it('showTotal()', () => {
      const spy = jest.spyOn(Orders.prototype, 'showTotal');
      const summary = getComponent().instance().showTotal(5, [1, 3]);
      expect(spy).toHaveBeenCalled();
      expect(summary).toEqual("Showing 1 - 3 of 5 items");
    });
  });

  describe('Page interactions', () => {
    it('simulate click action on filter button', () => {
      const wrapper = getComponent();
      expect(wrapper.find('.filter .dropdown.active').length).toBe(0);
      (wrapper.find('.filter > button').at(0)).simulate('click');
      expect(wrapper.find('.filter .dropdown.active').length).toBe(1);
    });

    it('simulate click action on cancel button', () => {
      const spy = jest.spyOn(Orders.prototype, 'clearForm');
      const cancelButton = getComponent().find('.actions .action-item').at(0);
      cancelButton.simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    it('simulate click action on close button', () => {
      const wrapper = getComponent();
      const cancelButton = wrapper.find('.actions .action-item').at(1);
      cancelButton.simulate('click');
      expect(wrapper.find('.filter .dropdown.active').length).toBe(0);
    });

    it('simulate click action on DatePicker components', () => {
      const wrapper = getComponent();
      const startDatePicker = wrapper.find('DatePicker').at(0);
      startDatePicker.simulate('change');
      expect(wrapper.instance().state.start).toEqual(undefined);

      const endDatePicker = wrapper.find('DatePicker').at(1);
      endDatePicker.simulate('change');
      expect(wrapper.instance().state.end).toEqual(undefined);
    });
  });

  describe('Modal Interaction', () => {
    it('show Modal', () => {
      const { meals } = props.orders;
      const spy = jest.spyOn(Orders.prototype, 'showModal');
      getComponent().instance().showModal(meals[0]);
      expect(spy).toHaveBeenCalled();
      expect(getComponent().instance().state.modalContent).toBe(meals[0]);
      expect(getComponent().instance().state.showModal).toBe(true);
    });

    it('delete Modal', () => {
      const { meals } = props.orders;
      const spy = jest.spyOn(Orders.prototype, 'deleteOrder');
      getComponent().instance().deleteOrder(meals[0].id);
      expect(spy).toHaveBeenCalled();
      expect(getComponent().instance().state.showModal).toBe(false);
    });

    it('hide Modal', () => {
      const spy = jest.spyOn(Orders.prototype, 'hideModal');
      getComponent().instance().hideModal();
      expect(spy).toHaveBeenCalled();
      expect(getComponent().instance().state.showModal).toBe(false);
    });    
  });
});

describe('Connected OrderHistory component', () => {
  it('component successfully rendered', () => {
    const store = mockStore({
      orders: {}
    });
    const wrapper = shallow(<OrderHistory store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
