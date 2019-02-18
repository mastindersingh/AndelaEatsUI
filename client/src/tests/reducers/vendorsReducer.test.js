/* eslint-disable no-undef */
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
import { initialVendors } from '../../reducers/initialState';
import vendorsReducer from '../../reducers/vendorsReducer';
import vendors from '../__mocks__/mockVendors';
import { createdVendor } from '../__mocks__/mockNewVendor';

describe('Vendors Reducer', () => {
  it('should return initial state', () => {
    expect(vendorsReducer(undefined, {})).toEqual(initialVendors);
  });

  describe('FETCH_VENDORS_LOADING', () => {
    it('should set isLoading state to true when making api request', () => {
      const action = {
        type: FETCH_VENDORS_LOADING,
        payload: true,
      };

      const newState = vendorsReducer(initialVendors, action);
      expect(newState.isLoading).toEqual(true);
    });

    it('should set isLoading state to false when request is resolved', () => {
      const action = {
        type: FETCH_VENDORS_LOADING,
        payload: false,
      };

      const newState = vendorsReducer(initialVendors, action);
      expect(newState.isLoading).toEqual(false);
    });
  });

  describe('FETCH_VENDORS_SUCCESS', () => {
    it('should update the allVendors state in the store', () => {
      const action = {
        type: FETCH_VENDORS_SUCCESS,
        payload: vendors,
      };

      const newState = vendorsReducer(initialVendors, action);
      expect(newState.vendors).toEqual(vendors);
    });
  });

  describe('FETCH_VENDORS_FAILURE', () => {
    it('should return the previous state of allVendors in the store', () => {
      const action = {
        type: FETCH_VENDORS_FAILURE,
        payload: {},
      };

      const newState = vendorsReducer(initialVendors, action);
      expect(newState.vendors).toEqual([]);
    });
  });

  describe('CREATE_VENDOR_LOADING', () => {
    it('should set isCreating state to true when creating vendor', () => {
      const action = {
        type: CREATE_VENDOR_LOADING,
        payload: true,
      };

      const newState = vendorsReducer(initialVendors, action);
      expect(newState.isCreating).toEqual(true);
    });

    it('should set isCreating state to false when request is resolved', () => {
      const action = {
        type: CREATE_VENDOR_LOADING,
        payload: false,
      };

      const newState = vendorsReducer(initialVendors, action);
      expect(newState.isCreating).toEqual(false);
    });
  });

  describe('CREATE_VENDOR_SUCCESS', () => {
    it('should update vendprs in the store', () => {
      const action = {
        type: CREATE_VENDOR_SUCCESS,
        payload: createdVendor,
      };

      const newState = vendorsReducer(initialVendors, action);
      expect(newState.vendors).toEqual([createdVendor]);
    });
  });

  describe('CREATE_VENDOR_FAILURE', () => {
    it('should return the previous state', () => {
      const action = {
        type: CREATE_VENDOR_FAILURE,
        payload: {},
      };

      const newState = vendorsReducer(initialVendors, action);
      expect(newState.vendors).toEqual([]);
    });
  });

  describe('SUSPEND_VENDOR_LOADING', () => {
    it('should set isSuspending state to true when deleting vendor', () => {
      const action = {
        type: SUSPEND_VENDOR_LOADING,
        payload: true,
      };
      const newState = vendorsReducer(initialVendors, action);
      expect(newState.isSuspending).toEqual(true);
    });

    it('should set isSuspending state to false when request is resolved', () => {
      const action = {
        type: SUSPEND_VENDOR_LOADING,
        payload: false,
      };
      const newState = vendorsReducer(initialVendors, action);
      expect(newState.isSuspending).toEqual(false);
    });
  });

  describe('SUSPEND_VENDOR_SUCCESS', () => {
    it('should update vendors in the store', () => {
      const action = {
        type: SUSPEND_VENDOR_SUCCESS,
        payload: vendors[0].id,
      };

      const newState = vendorsReducer(initialVendors, action);
      expect(newState.vendors).toEqual([]);
    });
  });
  
  describe('SUSPEND_VENDOR_FAILURE', () => {
    it('should return the previous state', () => {
      const action = {
        type: SUSPEND_VENDOR_FAILURE,
        payload: {},
      };
      const newState = vendorsReducer(initialVendors, action);
      expect(newState.vendors).toEqual([]);
    });
  });

  describe('UPDATE_VENDOR_LOADING', () => {
    it('should set isUpdating state to true when deleting vendor', () => {
      const action = {
        type: UPDATE_VENDOR_LOADING,
        payload: true,
      };
      const newState = vendorsReducer(initialVendors, action);
      expect(newState.isUpdating).toEqual(true);
    });
    
    it('should set isUpdating state to false when request is resolved', () => {
      const action = {
        type: UPDATE_VENDOR_LOADING,
        payload: false,
      };
      const newState = vendorsReducer(initialVendors, action);
      expect(newState.isUpdating).toEqual(false);
    });
  });

  describe('UPDATE_VENDOR_SUCCESS', () => {
    it('should update vendors in the store', () => {
      const action = {
        type: UPDATE_VENDOR_SUCCESS,
        payload: vendors[0],
      };

      const newState = vendorsReducer(initialVendors, action);
      expect(newState.vendors).toEqual([vendors[0]]);
    });
  });

  describe('UPDATE_VENDOR_FAILURE', () => {
    it('should return the previous state', () => {
      const action = {
        type: UPDATE_VENDOR_FAILURE,
        payload: {},
      };
      const newState = vendorsReducer(initialVendors, action);
      expect(newState.vendors).toEqual([]);
    });
  });
});
