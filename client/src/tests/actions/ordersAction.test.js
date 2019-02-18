/* eslint-disable no-undef */
import moxios from 'moxios';
import {
  base,
  fetchOrders,
  filterOrders,
  deleteOrder,
  editOrder,
  updateOrder,
  updateOrderSuccess,
  getOrderByDate,
  userID,
  collectOrder
} from '../../actions/ordersAction';

import {
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDERS_LOADING,
  FETCH_FILTERED_ORDERS,
  DELETE_ORDER_LOADING,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  EDIT_ORDER_SUCCESS,
  UPDATE_ORDER_SUCCESS,
  GET_ORDER_SUCCESS,
  MENU_IS_LOADING,
  COLLECT_ORDER_LOADING,
  COLLECT_ORDER_SUCCESS,
  COLLECT_ORDER_FAILURE
} from '../../actions/actionTypes';

const id = '123';
const date = new Date();

/*
global jest
expect
*/
describe('Order actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  const startDate = '2018-11-21';
  const endDate = '2018-12-02';
  const orderDetails = {}

  it('fetch past orders success', async (done) => {
    moxios.stubRequest(`${base}/orders/user/${userID}/${startDate}/${endDate}`, {
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
        orders: { orders:[], currentPage: 1 }
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(fetchOrders(startDate, endDate, 1, 9))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('fetch past orders failure', async (done) => {
    moxios.stubRequest(`${base}/orders/user/${userID}/${startDate}/${endDate}`, {
      status: 401
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: FETCH_ORDERS_FAILURE,
        error: "Request failed with status code 401"
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(fetchOrders(startDate, endDate, 1, 9))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('tabs an order success', async (done) => {
    moxios.stubRequest(`${base}/orders/collect`, {
      status: 200,
      response: {
        payload: {
          order: []
        }
      }
    });
    const expectedActions = [
      {
        type: COLLECT_ORDER_LOADING,
        payload: true
      },
      {
        type: COLLECT_ORDER_SUCCESS,
        payload: []
      }, {
        type: COLLECT_ORDER_LOADING,
        payload: false
      }];
    const store = mockStore({});
    await store.dispatch(collectOrder(orderDetails))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('fetch past orders failure', async (done) => {
    moxios.stubRequest(`${base}/orders/collect`, {
      status: 401
    });
    const expectedActions = [
      {
        type: COLLECT_ORDER_LOADING,
        payload: true
      },
      {
        type: COLLECT_ORDER_FAILURE,
        payload: "Request failed with status code 401"
      }, {
        type: COLLECT_ORDER_LOADING,
        payload: false
      }];
    const store = mockStore({});
    await store.dispatch(collectOrder(orderDetails))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('edit order success', async (done) => {
    moxios.stubRequest(`${base}/${id}`, {
      status: 200,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: EDIT_ORDER_SUCCESS,
        payload: {}
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(editOrder(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('edit order failure', async (done) => {
    moxios.stubRequest(`${base}/${id}`, {
      status: 401,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(editOrder(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('delete orders success', async (done) => {
    moxios.stubRequest(`${base}/orders/${id}`, {
      status: 200,
      response: {}
    });
    const expectedActions = [
      {
        type: DELETE_ORDER_LOADING,
        payload: true
      },
      {
        type: DELETE_ORDER_SUCCESS,
        payload: id
      }, {
        type: DELETE_ORDER_LOADING,
        payload: false
      }];
    const store = mockStore({});
    await store.dispatch(deleteOrder(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('delete orders failure', async (done) => {
    moxios.stubRequest(`${base}/orders/${id}`, {
      status: 401
    });
    const expectedActions = [
      {
        type: DELETE_ORDER_LOADING,
        payload: true
      },
      {
        type: DELETE_ORDER_FAILURE,
        payload: "Request failed with status code 401"
      },
      {
        type: DELETE_ORDER_LOADING,
        payload: false
      }];
    const store = mockStore({});
    await store.dispatch(deleteOrder(123))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  const order = {
    searchParam: 'rice',
    startDate: '2018-11-21',
    endDate: '2018-12-02',
    page: 1
  };

  it('filter orders success', async (done) => {
    moxios.stubRequest(`${base}/orders/user/${userID}/${order.startDate}/${order.endDate}`, {//eslint-disable-line
      status: 200,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: FETCH_FILTERED_ORDERS,
        orders: { currentPage: 1 }
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(filterOrders(order))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('filter orders failure', async (done) => {
    moxios.stubRequest(`${base}/orders/user/${userID}/${order.startDate}/${order.endDate}`, {//eslint-disable-line
      status: 401
    });

    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: FETCH_ORDERS_FAILURE,
        error: "Request failed with status code 401"
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(filterOrders(order))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('update order success', async (done) => {
    moxios.stubRequest(`${base}/${id}`, {
      status: 200,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: MENU_IS_LOADING,
        payload: true,
      },
      {
        type: UPDATE_ORDER_SUCCESS,
        payload: {}
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      },
      {
        type: MENU_IS_LOADING,
        payload: false,
      }];
    const store = mockStore({});
    await store.dispatch(updateOrder({}, id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('update order failure', async (done) => {
    moxios.stubRequest(`${base}/${id}`, {
      status: 401,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: MENU_IS_LOADING,
        payload: true,
      },
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      },
      {
        type: MENU_IS_LOADING,
        payload: false,
      }];
    const store = mockStore({});
    await store.dispatch(updateOrder({}, id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('get order success', async (done) => {
    moxios.stubRequest(`${base}/search?date=${date}`, {
      status: 200,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: GET_ORDER_SUCCESS,
        order: {}
      }, {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(getOrderByDate(date))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('get order failure', async (done) => {
    moxios.stubRequest(`${base}/search?date=${date}`, {
      status: 419,
      response: {}
    });
    const expectedActions = [
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: true
      },
      {
        type: FETCH_ORDERS_LOADING,
        isLoading: false
      }];
    const store = mockStore({});
    await store.dispatch(getOrderByDate(date))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});
