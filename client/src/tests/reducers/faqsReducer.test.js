/* eslint-disable no-undef */
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
import { initialFaqs } from '../../reducers/initialState';
import faqsReducer from '../../reducers/faqsReducer';
import faqs from '../__mocks__/mockFaqs';
import { createdFaq } from '../__mocks__/mockNewFaq';

describe('Faqs Reducer', () => {
  it('should return initial state', () => {
    expect(faqsReducer(undefined, {})).toEqual(initialFaqs);
  });

  describe('FETCH_FAQS_LOADING', () => {
    it('should set isLoading state to true when making api request', () => {
      const action = {
        type: FETCH_FAQS_LOADING,
        payload: true
      };

      const newState = faqsReducer(initialFaqs, action);
      expect(newState.isLoading).toEqual(true);
    });

    it('should set isLoading state to false when request is resolved', () => {
      const action = {
        type: FETCH_FAQS_LOADING,
        payload: false
      };

      const newState = faqsReducer(initialFaqs, action);
      expect(newState.isLoading).toEqual(false);
    });
  });

  describe('FETCH_FAQS_SUCCESS', () => {
    it('should update the allFaqs state in the store', () => {
      const action = {
        type: FETCH_FAQS_SUCCESS,
        payload: faqs
      };

      const newState = faqsReducer(initialFaqs, action);
      expect(newState.faqs).toEqual(faqs);
    });
  });

  describe('FETCH_FAQS_FAILURE', () => {
    it('should return the previous state of allFaqs in the store', () => {
      const action = {
        type: FETCH_FAQS_FAILURE,
        payload: {}
      };

      const newState = faqsReducer(initialFaqs, action);
      expect(newState.faqs).toEqual([]);
    });
  });

  describe('CREATE_FAQ_LOADING', () => {
    it('should set isCreating state to true when creating faq', () => {
      const action = {
        type: CREATE_FAQ_LOADING,
        payload: true
      };

      const newState = faqsReducer(initialFaqs, action);
      expect(newState.isLoading).toEqual(true);
    });

    it('should set isCreating state to false when request is resolved', () => {
      const action = {
        type: CREATE_FAQ_LOADING,
        payload: false
      };

      const newState = faqsReducer(initialFaqs, action);
      expect(newState.isLoading).toEqual(false);
    });
  });

  describe('CREATE_FAQ_SUCCESS', () => {
    it('should update vendprs in the store', () => {
      const action = {
        type: CREATE_FAQ_SUCCESS,
        payload: createdFaq
      };

      const newState = faqsReducer(initialFaqs, action);
      expect(newState.faqs).toEqual([createdFaq]);
    });
  });

  describe('CREATE_FAQ_FAILURE', () => {
    it('should return the previous state', () => {
      const action = {
        type: CREATE_FAQ_FAILURE,
        payload: {}
      };

      const newState = faqsReducer(initialFaqs, action);
      expect(newState.faqs).toEqual([]);
    });
  });

  describe('DELETE_FAQ_LOADING', () => {
    it('should set isDeleting state to true when deleting faq', () => {
      const action = {
        type: DELETE_FAQ_LOADING,
        payload: true
      };
      const newState = faqsReducer(initialFaqs, action);
      expect(newState.isLoading).toEqual(true);
    });

    it('should set isDeleting state to false when request is resolved', () => {
      const action = {
        type: DELETE_FAQ_LOADING,
        payload: false
      };
      const newState = faqsReducer(initialFaqs, action);
      expect(newState.isLoading).toEqual(false);
    });
  });

  describe('DELETE_FAQ_SUCCESS', () => {
    it('should update faqs in the store', () => {
      const action = {
        type: DELETE_FAQ_SUCCESS,
        payload: faqs[0].id
      };

      const newState = faqsReducer(initialFaqs, action);
      expect(newState.faqs).toEqual([]);
    });
  });

  describe('DELETE_FAQ_FAILURE', () => {
    it('should return the previous state', () => {
      const action = {
        type: DELETE_FAQ_FAILURE,
        payload: {}
      };
      const newState = faqsReducer(initialFaqs, action);
      expect(newState.faqs).toEqual([]);
    });
  });

  describe('UPDATE_FAQ_LOADING', () => {
    it('should set isUpdating state to true when deleting faq', () => {
      const action = {
        type: UPDATE_FAQ_LOADING,
        payload: true
      };
      const newState = faqsReducer(initialFaqs, action);
      expect(newState.isLoading).toEqual(true);
    });

    it('should set isUpdating state to false when request is resolved', () => {
      const action = {
        type: UPDATE_FAQ_LOADING,
        payload: false
      };
      const newState = faqsReducer(initialFaqs, action);
      expect(newState.isLoading).toEqual(false);
    });
  });

  describe('UPDATE_FAQ_SUCCESS', () => {
    it('should update faqs in the store', () => {
      const initialFaqState = {
        ...initialFaqs,
        faqs: [
          { id: 1, question: 'How can i order a meal', answer: 'an answer' }
        ]
      };
      const action = {
        type: UPDATE_FAQ_SUCCESS,
        payload: {
          id: 1,
          question: 'How can i order my meal',
          answer: 'an answer'
        }
      };
      const newState = faqsReducer(initialFaqState, action);
      expect(newState.faqs[0].question).toEqual('How can i order my meal');
    });
  });

  describe('UPDATE_FAQ_FAILURE', () => {
    it('should return the previous state', () => {
      const action = {
        type: UPDATE_FAQ_FAILURE,
        payload: {}
      };
      const newState = faqsReducer(initialFaqs, action);
      expect(newState.faqs).toEqual([]);
    });
  });
});
