import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  baseUrl, userID, fetchMenu, createOrder, fetchUserOrders, selectMeal, resetMenu
} from '../../actions/menuAction';
import {
  SET_MENUS,
  SELECT_MEAL,
  RESET_MENU,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_LOADING,
  FETCH_USERS_MENU_SUCCESS,
  FETCH_USERS_MENU_LOADING,
  CREATE_ORDER_LOADING,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE
} from '../../actions/actionTypes';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

/*
global jest
expect
*/
describe('Menu actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should set upcoming menus', async (done) => {
    moxios.stubRequest(`${baseUrl}/menus/lunch/2018-11-11/2018-11-18`, {
      status: 200,
      response: {
        payload: {
          menuList: []
        }
      }
    });
    const expectedActions = [
      {
        type: FETCH_USERS_MENU_LOADING,
        payload: true
      },
      {
        type: FETCH_USERS_MENU_SUCCESS,
        payload: []
      },
      {
        type: FETCH_USERS_MENU_LOADING,
        payload: false
      }
    ];
    const store = mockStore({});
    await store.dispatch(fetchMenu('2018-11-11', '2018-11-18'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('should fetch users orders', async (done) => {
    const startDate = '2018-11-18';
    const endDate = '2018-12-12';

    moxios.stubRequest(`${baseUrl}/orders/user/${userID}/${startDate}/${endDate}`, {
      status: 200,
      response: {
        payload: {
          orders: []
        }
      }
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: FETCH_ORDERS_SUCCESS,
        payload: []
      },
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }
    ];
    const store = mockStore({});
    await store.dispatch(fetchUserOrders(startDate, endDate))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('should handle order success', async (done) => {
    moxios.stubRequest(`${baseUrl}/orders/`, {
      status: 200,
      response: {}
    });
    const expectedActions = [
      {
        type: CREATE_ORDER_LOADING,
        payload: true
      },
      {
        type: CREATE_ORDER_SUCCESS,
        payload: {}
      },
      {
        type: CREATE_ORDER_LOADING,
        payload: false
      }
    ];
    const order = {
      mainMeal: 1,
      acc1: 2,
      acc2: 3
    };
    const store = mockStore({});
    await store.dispatch(createOrder(order))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('should handle order failure', async (done) => {
    moxios.stubRequest(`${baseUrl}/orders/`, {
      status: 400,
    });
    const expectedActions = [{"payload": true, "type": "CREATE_ORDER_LOADING"}, {"payload": new Error("Request failed with status code 400"), "type": "CREATE_ORDER_FAILURE"}, {"payload": false, "type": "CREATE_ORDER_LOADING"}];
    const order = {
      mainMeal: 1,
      acc1: 2,
      acc2: 3
    };
    const store = mockStore({});
    await store.dispatch(createOrder(order))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('should select meal', async (done) => {
    const payload = { prop: '', value: '' };
    const expectedActions = [{
      type: SELECT_MEAL,
      payload
    }];
    const store = mockStore({});
    store.dispatch(selectMeal(payload));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
  it('should reset menu', async (done) => {
    const expectedActions = [{
      type: RESET_MENU
    }];
    const store = mockStore({});
    store.dispatch(resetMenu());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});
