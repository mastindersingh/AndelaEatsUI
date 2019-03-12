import {
  FETCH_FAQS_LOADING,
  FETCH_FAQS_SUCCESS,
  FETCH_FAQS_FAILURE
} from '../actions/actionTypes';

import { initialFaqs } from './initialState';

let index;

const faqsReducer = (state = initialFaqs, action) => {
  switch (action.type) {
    case FETCH_FAQS_LOADING:
      return { ...state, isLoading: action.payload };
    case FETCH_FAQS_SUCCESS:
      return { ...state, faqs: action.payload };
    case FETCH_FAQS_FAILURE:
      return state;
    default:
      return state;
  }
};

export default faqsReducer;
