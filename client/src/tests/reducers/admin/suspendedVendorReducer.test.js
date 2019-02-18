/* eslint-disable no-undef */
import { 
  FETCH_SUSPENDED_VENDOR_LOADING,
  FETCH_SUSPENDED_VENDOR_SUCCESS,
  FETCH_SUSPENDED_VENDOR_FAILURE,
  UNSUSPEND_VENDOR_SUCCESS,
  UNSUSPEND_VENDOR_FAILURE,
  UNSUSPEND_VENDOR_LOADING
} from '../../../actions/actionTypes';

import { initialSuspendedVendors } from '../../../reducers/initialState';
import vendorReducer from '../../../reducers/admin/suspendedVendorReducer';
import vendors from '../../__mocks__/mockVendors';

describe('Suspended Vendor Reducer', () => {
  it('should return initial state', () => {
    expect(vendorReducer(undefined, {})).toEqual(initialSuspendedVendors);
  });

  describe('FETCH_SUSPENDED_VENDOR_LOADING', () => {
    it('should set loading state to true when making api request', () => {
      const action = {
        type: FETCH_SUSPENDED_VENDOR_LOADING,
        payload: true
      };

      const newState = vendorReducer(initialSuspendedVendors, action);
      expect(newState.isLoading).toEqual(true);
    });
    
    describe('FETCH_SUSPENDED_VENDOR_SUCCESS', () => {
      it('should update the allEngagements state in the store', () => {
        const action = {
          type: FETCH_SUSPENDED_VENDOR_SUCCESS,
          payload: vendors
        };

        const newState = vendorReducer(initialSuspendedVendors, action);
        expect(newState.vendors).toEqual(vendors);
      });
    });

    describe('FETCH_SUSPENDED_VENDOR_FAILURE', () => {
      it('should return the previous state of vednors in the store', () => {
        const actions = {
          type: FETCH_SUSPENDED_VENDOR_FAILURE,
          payload: {}
        };

        const newState = vendorReducer(initialSuspendedVendors, actions);
        expect(newState.vendors).toEqual([]);
      });
    });
  });
});


describe('UNSUSPEND_VENDOR_LOADING', () => {
  it('should set isSuspending state to true when deleting vendor', () => {
    const action = {
      type: UNSUSPEND_VENDOR_LOADING,
      payload: true,
    };
    const newState = vendorReducer(initialSuspendedVendors, action);
    expect(newState.isSuspending).toEqual(true);
  });

  it('should set isSuspending state to false when request is resolved', () => {
    const action = {
      type: UNSUSPEND_VENDOR_LOADING,
      payload: false,
    };
    const newState = vendorReducer(initialSuspendedVendors, action);
    expect(newState.isSuspending).toEqual(false);
  });
});

describe('UNSUSPEND_VENDOR_SUCCESS', () => {
  it('should update vendors in the store', () => {
    const action = {
      type: UNSUSPEND_VENDOR_SUCCESS,
      payload: vendors[0].id,
    };

    const newState = vendorReducer(initialSuspendedVendors, action);
    expect(newState.vendors).toEqual([]);
  });
});

describe('UNSUSPEND_VENDOR_FAILURE', () => {
  it('should return the previous state', () => {
    const action = {
      type: UNSUSPEND_VENDOR_FAILURE,
      payload: {},
    };
    const newState = vendorReducer(initialSuspendedVendors, action);
    expect(newState.vendors).toEqual([]);
  });
});