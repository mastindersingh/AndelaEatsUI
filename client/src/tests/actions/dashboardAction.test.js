import moxios from 'moxios';

import {
  FETCH_VENDOR_COLLECTED_ORDERS,
  FETCH_VENDOR_UNCOLLECTED_ORDERS,
  FETCH_VENDOR_CANCELED_ORDERS,
  VENDOR_PERFORMANCE_LOADING,
  FETCH_VENDOR_PERFORMANCE_FAILED,
  FETCH_VENDOR_PERFORMANCE_DATES,
  FETCH_VENDOR_NAME, FETCH_VENDOR_RATINGS,
} from '../../actions/actionTypes';

import fetchVendorPerformance, {
  getKeyValues
} from '../../actions/dashboardAction';

import payload from "../__mocks__/mockVendorPerformance";

const successExpectedActions = [
  { type: VENDOR_PERFORMANCE_LOADING, payload: true, },
  { type: FETCH_VENDOR_NAME, payload: "vendor 1", },
  { type: FETCH_VENDOR_PERFORMANCE_DATES, payload: getKeyValues(payload,'date'), },
  { type: FETCH_VENDOR_COLLECTED_ORDERS, payload: getKeyValues(payload,'collectedOrders'), },
  { type: FETCH_VENDOR_UNCOLLECTED_ORDERS, payload: getKeyValues(payload,'uncollectedOrders'), },
  { type: FETCH_VENDOR_CANCELED_ORDERS, payload: getKeyValues(payload,'cancelledOrders'), },
  { type: FETCH_VENDOR_RATINGS, payload: getKeyValues(payload,'averageRating'), },
  { type: VENDOR_PERFORMANCE_LOADING, payload: false, },
];

const failExpectedActions =[
  { type: VENDOR_PERFORMANCE_LOADING, payload: true, },
  { type: FETCH_VENDOR_PERFORMANCE_FAILED, payload: new Error('Request failed with status code 401')},
  { type: VENDOR_PERFORMANCE_LOADING, payload: false, },
];

describe('Dashboard Action ',()=>{
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should fetch vendor performance',async (done)=>{
    moxios.stubRequest(`/reports/`, {
      status: 200,
      response: {
        payload
      }
    });
    const store = mockStore({});
    await store
      .dispatch(fetchVendorPerformance())
      .then(() => {
        expect(store.getActions()).toEqual(successExpectedActions);
      });
    done();
  });

  it('should fail to fetch performance',async (done)=>{
    moxios.stubRequest(`/reports/`, {
      status: 401
    });

    const store = mockStore({});
    await store
      .dispatch(fetchVendorPerformance())
      .then(() => {
        expect(store.getActions()).toEqual(failExpectedActions);
      });
    done();
  })

});
