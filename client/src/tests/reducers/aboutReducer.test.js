/* eslint-disable no-undef */
import {
  FETCH_ABOUT_LOADING,
  FETCH_ABOUT_SUCCESS,
  FETCH_ABOUT_FAILURE,
  UPDATE_ABOUT_SUCCESS,
  UPDATE_ABOUT_FAILURE,
  UPDATE_ABOUT_LOADING
} from '../../actions/actionTypes';
import { initialAbout } from '../../reducers/initialState';
import aboutReducer from '../../reducers/aboutReducer';
import about from '../__mocks__/mockAbout';

describe('About Reducer', () => {
  it('should return initial state', () => {
    expect(aboutReducer(undefined, {})).toEqual(initialAbout);
  });

  describe('FETCH_ABOUT_LOADING', () => {
    it('should set isLoading state to true when making api request', () => {
      const action = {
        type: FETCH_ABOUT_LOADING,
        payload: true
      };

      const newState = aboutReducer(initialAbout, action);
      expect(newState.isLoading).toEqual(true);
    });

    it('should set isLoading state to false when request is resolved', () => {
      const action = {
        type: FETCH_ABOUT_LOADING,
        payload: false
      };

      const newState = aboutReducer(initialAbout, action);
      expect(newState.isLoading).toEqual(false);
    });
  });

  describe('FETCH_ABOUT_SUCCESS', () => {
    it('should update the allAbout state in the store', () => {
      const action = {
        type: FETCH_ABOUT_SUCCESS,
        payload: about
      };

      const newState = aboutReducer(initialAbout, action);
      expect(newState.about).toEqual(about);
    });
  });

  describe('FETCH_ABOUT_FAILURE', () => {
    it('should return the previous state of allAbout in the store', () => {
      const action = {
        type: FETCH_ABOUT_FAILURE,
        payload: {}
      };

      const newState = aboutReducer(initialAbout, action);
      expect(newState.about).toEqual({});
    });
  });

  describe('UPDATE_ABOUT_LOADING', () => {
    it('should set isUpdating state to true when deleting faq', () => {
      const action = {
        type: UPDATE_ABOUT_LOADING,
        payload: true
      };
      const newState = aboutReducer(initialAbout, action);
      expect(newState.isUpdating).toEqual(true);
    });

    it('should set isUpdating state to false when request is resolved', () => {
      const action = {
        type: UPDATE_ABOUT_LOADING,
        payload: false
      };
      const newState = aboutReducer(initialAbout, action);
      expect(newState.isUpdating).toEqual(false);
    });
  });

  describe('UPDATE_ABOUT_SUCCESS', () => {
    it('should update about in the store', () => {
      const initialAboutState = {
        ...initialAbout,
        about: { id: 1, details: 'Html Page' }
      };
      const action = {
        type: UPDATE_ABOUT_SUCCESS,
        payload: {
          id: 1,
          details: 'Html Page'
        }
      };
      const newState = aboutReducer(initialAboutState, action);
      expect(newState.about.details).toEqual('Html Page');
    });
  });

  describe('UPDATE_ABOUT_FAILURE', () => {
    it('should return the previous state', () => {
      const action = {
        type: UPDATE_ABOUT_FAILURE,
        payload: {}
      };
      const newState = aboutReducer(initialAbout, action);
      expect(newState.about).toEqual({});
    });
  });
});
