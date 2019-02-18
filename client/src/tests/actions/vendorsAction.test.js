/* eslint-disable no-undef */
import moxios from 'moxios';
import {
  FETCH_VENDORS_LOADING,
  FETCH_VENDORS_SUCCESS,
  FETCH_VENDORS_FAILURE,
  CREATE_VENDOR_SUCCESS,
  CREATE_VENDOR_FAILURE,
  CREATE_VENDOR_LOADING,
  SUSPEND_VENDOR_SUCCESS,
  SUSPEND_VENDOR_FAILURE,
  SUSPEND_VENDOR_LOADING,
  UPDATE_VENDOR_SUCCESS,
  UPDATE_VENDOR_FAILURE,
  UPDATE_VENDOR_LOADING
} from '../../actions/actionTypes';
import {
  baseUrl,
  fetchVendors,
  createVendor,
  suspendVendor,
  updateVendor
} from '../../actions/vendorsAction';
import {
  newVendor,
  createdVendor,
  update
} from '../__mocks__/mockNewVendor';
import vendors from '../__mocks__/mockVendors';
import { Vendors } from '../../components/Admin/Vendors/Vendors';

describe('Vendors Action', () => {
  describe('Fecth Vendors', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetch vendors success', async (done) => {
      moxios.stubRequest(`${baseUrl}/vendors/`, {
        status: 200,
        response: {
          payload: {
            vendors
          }
        }
      });

      const expectedActions = [
        {
          type: FETCH_VENDORS_LOADING,
          payload: true,
        },
        {
          type: FETCH_VENDORS_SUCCESS,
          payload: vendors,
        },
        {
          type: FETCH_VENDORS_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(fetchVendors())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });

    it('fetch vendors failure', async (done) => {
      moxios.stubRequest(`${baseUrl}/vendors/`, {
        status: 401,
      });

      const expectedActions = [
        {
          type: FETCH_VENDORS_LOADING,
          payload: true,
        },
        {
          type: FETCH_VENDORS_FAILURE,
          payload: new Error('Request failed with status code 401'),
        },
        {
          type: FETCH_VENDORS_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(fetchVendors())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });

  describe('Create Vendor', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('create vendor success', async (done) => {
      moxios.stubRequest(`${baseUrl}/vendors/`, {
        status: 201,
        response: {
          payload: {
            vendor: createdVendor
          }
        }
      });

      const expectedActions = [
        {
          type: CREATE_VENDOR_LOADING,
          payload: true,
        },
        {
          type: CREATE_VENDOR_SUCCESS,
          payload: createdVendor,
        },
        {
          type: CREATE_VENDOR_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(createVendor(newVendor))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });

    it('create vendor failure', async (done) => {
      moxios.stubRequest(`${baseUrl}/vendors/`, {
        status: 401,
        response: {}
      });

      const expectedActions = [
        {
          type: CREATE_VENDOR_LOADING,
          payload: true,
        },
        {
          type: CREATE_VENDOR_FAILURE,
          payload: new Error('Request failed with status code 401'),
        },
        {
          type: CREATE_VENDOR_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(createVendor(newVendor))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });
  describe('Suspend Vendor', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('suspend vendor success', async (done) => {
      moxios.stubRequest(`${baseUrl}/vendors/suspend/${vendors[0].id}`, {
        status: 200,
        response: {}
      });

      const expectedActions = [
        {
          type: SUSPEND_VENDOR_LOADING,
          payload: true,
        },
        {
          type: SUSPEND_VENDOR_SUCCESS,
          payload: vendors[0].id
        },
        {
          type: SUSPEND_VENDOR_LOADING,
          payload: false,
        }
      ];
      const store = mockStore({});
      await store
        .dispatch(suspendVendor(vendors[0].id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
    it('return vendor failure', async (done) => {
      moxios.stubRequest(`${baseUrl}/vendors/suspend/${vendors[0].id}`, {
        status: 401,
        response: {}
      });

      const expectedActions = [
        {
          type: SUSPEND_VENDOR_LOADING,
          payload: true,
        },
        {
          type: SUSPEND_VENDOR_FAILURE,
          payload: new Error('Request failed with status code 401'),
        },
        {
          type: SUSPEND_VENDOR_LOADING,
          payload: false,
        }
      ];
      const store = mockStore({});
      await store
        .dispatch(suspendVendor(vendors[0].id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });


  describe('Update Vendor', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('update vendor success', async (done) => {  
      moxios.stubRequest(`${baseUrl}/vendors/${createdVendor.id}`, {
        status: 200,
        response: {
          payload: {
            vendor: createdVendor
          }
        }
      });

      const expectedActions = [
        {
          type: UPDATE_VENDOR_LOADING,
          payload: true,
        },
        {
          type: UPDATE_VENDOR_SUCCESS,
          payload: createdVendor
        },
        {
          type: UPDATE_VENDOR_LOADING,
          payload: false,
        }
      ];
      const store = mockStore({});
      await store
        .dispatch(updateVendor(update.id, update.vendor))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
    it('return vendor failure', async (done) => {
      moxios.stubRequest(`${baseUrl}/vendors/${createdVendor.id}`, {
        status: 401,
        response: {}
      });

      const expectedActions = [
        {
          type: UPDATE_VENDOR_LOADING,
          payload: true,
        },
        {
          type: UPDATE_VENDOR_FAILURE,
          payload: new Error('Request failed with status code 401'),
        },
        {
          type: UPDATE_VENDOR_LOADING,
          payload: false,
        }
      ];
      const store = mockStore({});
      await store
        .dispatch(updateVendor(update.id, update.vendor))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });
});