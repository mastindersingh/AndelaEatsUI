/* eslint-disable no-undef */
import {
  FETCH_FAQS_LOADING,
  FETCH_FAQS_SUCCESS,
  FETCH_FAQS_FAILURE
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
        payload: true,
      };

      const newState = faqsReducer(initialFaqs, action);
      expect(newState.isLoading).toEqual(true);
    });

    it('should set isLoading state to false when request is resolved', () => {
      const action = {
        type: FETCH_FAQS_LOADING,
        payload: false,
      };

      const newState = faqsReducer(initialFaqs, action);
      expect(newState.isLoading).toEqual(false);
    });
  });

  describe('FETCH_FAQS_SUCCESS', () => {
    it('should update the allFaqs state in the store', () => {
      const action = {
        type: FETCH_FAQS_SUCCESS,
        payload: faqs,
      };

      const newState = faqsReducer(initialFaqs, action);
      expect(newState.faqs).toEqual(faqs);
    });
  });

  describe('FETCH_FAQS_FAILURE', () => {
    it('should return the previous state of allFaqs in the store', () => {
      const action = {
        type: FETCH_FAQS_FAILURE,
        payload: {},
      };

      const newState = faqsReducer(initialFaqs, action);
      expect(newState.faqs).toEqual([]);
    });
  });
});
