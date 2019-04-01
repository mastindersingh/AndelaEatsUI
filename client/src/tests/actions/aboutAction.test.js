/* eslint-disable no-undef */
import moxios from 'moxios';
import {
  FETCH_ABOUT_LOADING,
  FETCH_ABOUT_SUCCESS,
  FETCH_ABOUT_FAILURE,
  UPDATE_ABOUT_SUCCESS,
  UPDATE_ABOUT_FAILURE,
  UPDATE_ABOUT_LOADING
} from '../../actions/actionTypes';
import {
  fetchAbout,
  updateAbout
} from '../../actions/aboutAction';
import { createdAbout, update } from '../__mocks__/mockNewAbout';
import about from '../__mocks__/mockAbout';

describe('About Action', () => {
  describe('Fetch About', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetch about success', async done => {
      moxios.stubRequest(`/about/view`, {
        status: 200,
        response: {
          payload: {
            data: { about }
          }
        }
      });

      const expectedActions = [
        {
          type: FETCH_ABOUT_LOADING,
          payload: true
        },
        {
          type: FETCH_ABOUT_SUCCESS,
          payload: { about }
        },
        {
          type: FETCH_ABOUT_LOADING,
          payload: false
        }
      ];

      const store = mockStore({});
      await store.dispatch(fetchAbout()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });

    it('fetch about failure', async done => {
      moxios.stubRequest(`/about/view`, {
        status: 401
      });

      const expectedActions = [
        {
          type: FETCH_ABOUT_LOADING,
          payload: true
        },
        {
          type: FETCH_ABOUT_FAILURE,
          payload: new Error('Request failed with status code 401')
        },
        {
          type: FETCH_ABOUT_LOADING,
          payload: false
        }
      ];

      const store = mockStore({});
      await store.dispatch(fetchAbout()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });
  });

  describe('Update About', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('update about success', async done => {
      moxios.stubRequest(`/about/create_or_update`, {
        status: 200,
        response: {
          payload: {
            data: createdAbout
          }
        }
      });

      const expectedActions = [
        {
          type: UPDATE_ABOUT_LOADING,
          payload: true
        },
        {
          type: UPDATE_ABOUT_SUCCESS,
          payload: createdAbout
        },
        {
          type: UPDATE_ABOUT_LOADING,
          payload: false
        }
      ];
      const store = mockStore({});
      await store.dispatch(updateAbout(update.about)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });
    it('return about failure', async done => {
      moxios.stubRequest(`/about/create_or_update`, {
        status: 401,
        response: {}
      });

      const expectedActions = [
        {
          type: UPDATE_ABOUT_LOADING,
          payload: true
        },
        {
          type: UPDATE_ABOUT_FAILURE,
          payload: new Error('Request failed with status code 401')
        },
        {
          type: UPDATE_ABOUT_LOADING,
          payload: false
        }
      ];
      const store = mockStore({});
      await store.dispatch(updateAbout(update.about)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });
  });
});
