/* eslint-disable no-undef */
import moxios from 'moxios';

import {
  FETCH_MEAL_ORDERS_SUCCESS,
  FETCH_MEAL_ORDERS_FAILURE,
  FETCH_MEAL_ORDERS_LOADING
} from '../../../actions/actionTypes';

import {
  baseUrl,
  fetchOrders
} from '../../../actions/admin/ordersAction';


describe('Admin Orders Action', () => {
  describe('Fetch Orders', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    const currentPage = 1;

    it('fetch orders success', async (done) => {
      moxios.stubRequest(`${baseUrl}/orders/?page=${currentPage}&per_page=15`, {
        status: 200,
        response: {
          payload: {
            orders: []
          }
        }
      });

      const expectedActions = [
        {
          type: FETCH_MEAL_ORDERS_LOADING,
          payload: true,
        },
        {
          type: FETCH_MEAL_ORDERS_SUCCESS,
          payload: {
            orders: []
          },
        },
        {
          type: FETCH_MEAL_ORDERS_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(fetchOrders(currentPage))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });

    it('fetch orders failure', async (done) => {
      moxios.stubRequest(`${baseUrl}/orders/?page=${currentPage}&per_page=15`, {
        status: 401,
        response: {
          payload: {
            orders: []
          }
        }
      });

      const expectedActions = [
        {
          type: FETCH_MEAL_ORDERS_LOADING,
          payload: true,
        },
        {
          type: FETCH_MEAL_ORDERS_FAILURE,
          payload: new Error('Request failed with status code 401'),
        },
        {
          type: FETCH_MEAL_ORDERS_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(fetchOrders(currentPage))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });


  })
})