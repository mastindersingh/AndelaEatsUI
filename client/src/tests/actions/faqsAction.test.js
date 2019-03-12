/* eslint-disable no-undef */
import moxios from 'moxios';
import {
  FETCH_FAQS_LOADING,
  FETCH_FAQS_SUCCESS,
  FETCH_FAQS_FAILURE
} from '../../actions/actionTypes';
import {
  fetchFaqs
} from '../../actions/faqsAction';
import faqs from '../__mocks__/mockFaqs';

describe('Faqs Action', () => {
  describe('Fetch Faqs', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetch faqs success', async (done) => {
      moxios.stubRequest(`/faqs/`, {
        status: 200,
        response: {
          payload: {
            faqs
          }
        }
      });

      const expectedActions = [
        {
          type: FETCH_FAQS_LOADING,
          payload: true,
        },
        {
          type: FETCH_FAQS_SUCCESS,
          payload: faqs,
        },
        {
          type: FETCH_FAQS_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(fetchFaqs())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });

    it('fetch faqs failure', async (done) => {
      moxios.stubRequest(`/faqs/`, {
        status: 401,
      });

      const expectedActions = [
        {
          type: FETCH_FAQS_LOADING,
          payload: true,
        },
        {
          type: FETCH_FAQS_FAILURE,
          payload: new Error('Request failed with status code 401'),
        },
        {
          type: FETCH_FAQS_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(fetchFaqs())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });
});