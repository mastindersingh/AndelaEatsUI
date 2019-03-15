/* eslint-disable no-undef */
import moxios from 'moxios';
import {
  FETCH_FAQS_LOADING,
  FETCH_FAQS_SUCCESS,
  FETCH_FAQS_FAILURE,
  CREATE_FAQ_SUCCESS,
  CREATE_FAQ_FAILURE,
  CREATE_FAQ_LOADING,
  DELETE_FAQ_SUCCESS,
  DELETE_FAQ_FAILURE,
  DELETE_FAQ_LOADING,
  UPDATE_FAQ_SUCCESS,
  UPDATE_FAQ_FAILURE,
  UPDATE_FAQ_LOADING
} from '../../actions/actionTypes';
import {
  fetchFaqs,
  createFaq,
  deleteFaq,
  updateFaq
} from '../../actions/faqsAction';
import {
  newFaq,
  createdFaq,
  update
} from '../__mocks__/mockNewFaq';
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

  describe('Create Faq', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('create faq success', async (done) => {
      moxios.stubRequest(`/faqs/`, {
        status: 201,
        response: {
          payload: {
            faq: createdFaq
          }
        }
      });

      const expectedActions = [
        {
          type: CREATE_FAQ_LOADING,
          payload: true,
        },
        {
          type: CREATE_FAQ_SUCCESS,
          payload: createdFaq,
        },
        {
          type: CREATE_FAQ_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(createFaq(newFaq))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });

    it('create faq failure', async (done) => {
      moxios.stubRequest(`/faqs/`, {
        status: 401,
        response: {}
      });

      const expectedActions = [
        {
          type: CREATE_FAQ_LOADING,
          payload: true,
        },
        {
          type: CREATE_FAQ_FAILURE,
          payload: new Error('Request failed with status code 401'),
        },
        {
          type: CREATE_FAQ_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(createFaq(newFaq))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });

  describe('Delete Faq', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('delete faq success', async (done) => {
      moxios.stubRequest(`/faqs/delete/${faqs[0].id}`, {
        status: 200,
        response: {}
      });

      const expectedActions = [
        {
          type: DELETE_FAQ_LOADING,
          payload: true,
        },
        {
          type: DELETE_FAQ_SUCCESS,
          payload: faqs[0].id
        },
        {
          type: DELETE_FAQ_LOADING,
          payload: false,
        }
      ];
      const store = mockStore({});
      await store
        .dispatch(deleteFaq(faqs[0].id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
    it('return faq failure', async (done) => {
      moxios.stubRequest(`/faqs/delete/${faqs[0].id}`, {
        status: 401,
        response: {}
      });

      const expectedActions = [
        {
          type: DELETE_FAQ_LOADING,
          payload: true,
        },
        {
          type: DELETE_FAQ_FAILURE,
          payload: new Error('Request failed with status code 401'),
        },
        {
          type: DELETE_FAQ_LOADING,
          payload: false,
        }
      ];
      const store = mockStore({});
      await store
        .dispatch(deleteFaq(faqs[0].id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });

  describe('Update Faq', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('update faq success', async (done) => {  
      moxios.stubRequest(`/faqs/${createdFaq.id}`, {
        status: 200,
        response: {
          payload: {
            faq: createdFaq
          }
        }
      });

      const expectedActions = [
        {
          type: UPDATE_FAQ_LOADING,
          payload: true,
        },
        {
          type: UPDATE_FAQ_SUCCESS,
          payload: createdFaq
        },
        {
          type: UPDATE_FAQ_LOADING,
          payload: false,
        }
      ];
      const store = mockStore({});
      await store
        .dispatch(updateFaq(update.id, update.faq))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
    it('return faq failure', async (done) => {
      moxios.stubRequest(`/faqs/${createdFaq.id}`, {
        status: 401,
        response: {}
      });

      const expectedActions = [
        {
          type: UPDATE_FAQ_LOADING,
          payload: true,
        },
        {
          type: UPDATE_FAQ_FAILURE,
          payload: new Error('Request failed with status code 401'),
        },
        {
          type: UPDATE_FAQ_LOADING,
          payload: false,
        }
      ];
      const store = mockStore({});
      await store
        .dispatch(updateFaq(update.id, update.faq))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });
});