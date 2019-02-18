/* eslint-disable no-undef */
import { 
  FETCH_VENDOR_ENGAGEMENT_LOADING, 
  FETCH_VENDOR_ENGAGEMENT_SUCCESS, 
  FETCH_VENDOR_ENGAGEMENT_FAILURE,
  CREATE_VENDOR_ENGAGEMENT_LOADING,
  CREATE_VENDOR_ENGAGEMENT_SUCCESS,
  CREATE_VENDOR_ENGAGEMENT_FAILURE,
  DELETE_VENDOR_ENGAGEMENT_LOADING,
  DELETE_VENDOR_ENGAGEMENT_SUCCESS,
  DELETE_VENDOR_ENGAGEMENT_FAILURE,
  EDIT_VENDOR_ENGAGEMENT_LOADING,
  EDIT_VENDOR_ENGAGEMENT_SUCCESS,
  EDIT_VENDOR_ENGAGEMENT_FAILURE
} from '../../../actions/actionTypes';

import { initialEngagements } from '../../../reducers/initialState';
import engagementReducer from '../../../reducers/admin/engagementsReducer';
import engagements from '../../__mocks__/mockEngagements';
import { newEngagement } from '../../__mocks__/mockEngagements';

describe('Engagement Reducer', () => {
  it('should return initial state', () => {
    expect(engagementReducer(undefined, {})).toEqual(initialEngagements);
  });

  describe('FETCH_ENGAGEMENT_LOADING', () => {
    it('should set loading state to true when making api request', () => {
      const action = {
        type: FETCH_VENDOR_ENGAGEMENT_LOADING,
        payload: true
      };

      const newState = engagementReducer(initialEngagements, action);
      expect(newState.isLoading).toEqual(true);
    });
    
    describe('FETCH_ENGAGEMENT_SUCCESS', () => {
      it('should update the allEngagements state in the store', () => {
        const action = {
          type: FETCH_VENDOR_ENGAGEMENT_SUCCESS,
          payload: engagements
        };

        const newState = engagementReducer(initialEngagements, action);
        expect(newState.engagements).toEqual(engagements);
      });
    });

    describe('FETCH_ENGAGEMENT_FAILURE', () => {
      it('should return the previous state of allEngagements in the store', () => {
        const actions = {
          type: FETCH_VENDOR_ENGAGEMENT_FAILURE,
          payload: {}
        };

        const newState = engagementReducer(initialEngagements, actions);
        expect(newState.engagements).toEqual([]);
      });
    });
  });

  describe('CREATE_VENDOR_ENGAGEMENT_LOADING', () => {
    it('should set isCreating state to true when creating engagements', () => {
      const action = {
        type: CREATE_VENDOR_ENGAGEMENT_LOADING,
        payload: true,
      };

      const newState = engagementReducer(initialEngagements, action);
      expect(newState.isCreating).toEqual(true);
    });

    it('should set isCreating state to false when request is resolved', () => {
      const action = {
        type: CREATE_VENDOR_ENGAGEMENT_LOADING,
        payload: false,
      };

      const newState = engagementReducer(initialEngagements, action);
      expect(newState.isCreating).toEqual(false);
    });
  });

  describe('CREATE_VENDOR_ENGAGEMENT_SUCCESS', () => {
    it('should update engagements in the store', () => {
      const action = {
        type: CREATE_VENDOR_ENGAGEMENT_SUCCESS,
        payload: newEngagement,
      };

      const newState = engagementReducer(initialEngagements, action);
      expect(newState.engagements).toEqual([newEngagement]);
    });
  });

  describe('CREATE_VENDOR_ENGAGEMENT_FAILURE', () => {
    it('should return the previous state', () => {
      const action = {
        type: CREATE_VENDOR_ENGAGEMENT_FAILURE,
        payload: {},
      };

      const newState = engagementReducer(initialEngagements, action);
      expect(newState.engagements).toEqual([]);
    });
  });

  describe('DELETE_VENDOR_ENGAGEMENT_LOADING', () => {
    it('should set isDeleting state to true when deleting engagements', () => {
      const action = {
        type: DELETE_VENDOR_ENGAGEMENT_LOADING,
        payload: true,
      };
      const newState = engagementReducer(initialEngagements, action);
      expect(newState.isDeleting).toEqual(true);
    });

    it('should set isDeleting state to false when request is resolved', () => {
      const action = {
        type: DELETE_VENDOR_ENGAGEMENT_LOADING,
        payload: false,
      };
      const newState = engagementReducer(initialEngagements, action);
      expect(newState.isDeleting).toEqual(false);
    });
  });

  describe('DELETE_VENDOR_ENGAGEMENT_SUCCESS', () => {
    it('should update engagements in the store', () => {
      const action = {
        type: DELETE_VENDOR_ENGAGEMENT_SUCCESS,
        payload: engagements[0].id,
      };

      const newState = engagementReducer(initialEngagements, action);
      expect(newState.engagements).toEqual([]);
    });
  });

  describe('DELETE_VENDOR_ENGAGEMENT_FAILURE', () => {
    it('should return the previous state', () => {
      const action = {
        type: DELETE_VENDOR_ENGAGEMENT_FAILURE,
        payload: {},
      };
      const newState = engagementReducer(initialEngagements, action);
      expect(newState.engagements).toEqual([]);
    });
  });


  describe('EDIT_VENDOR_ENGAGEMENT_LOADING', () => {
    it('should set isUpdating state to true when deleting engagement', () => {
      const action = {
        type: EDIT_VENDOR_ENGAGEMENT_LOADING,
        payload: true,
      };
      const newState = engagementReducer(initialEngagements, action);
      expect(newState.isUpdating).toEqual(true);
    });
    
    it('should set isUpdating state to false when request is resolved', () => {
      const action = {
        type: EDIT_VENDOR_ENGAGEMENT_LOADING,
        payload: false,
      };
      const newState = engagementReducer(initialEngagements, action);
      expect(newState.isUpdating).toEqual(false);
    });
  });

  describe('EDIT_VENDOR_ENGAGEMENT_SUCCESS', () => {
    it('should update vendors in the store', () => {
      const action = {
        type: EDIT_VENDOR_ENGAGEMENT_SUCCESS,
        payload: engagements[0],
      };

      const newState = engagementReducer(initialEngagements, action);
      expect(newState.engagements).toEqual([engagements[0]]);
    });
  });

  describe('EDIT_VENDOR_ENGAGEMENT_FAILURE', () => {
    it('should return the previous state', () => {
      const action = {
        type: EDIT_VENDOR_ENGAGEMENT_FAILURE,
        payload: {},
      };
      const newState = engagementReducer(initialEngagements, action);
      expect(newState.engagements).toEqual([]);
    });
  });
});
