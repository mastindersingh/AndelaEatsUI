import { 
  FETCH_VENDOR_ENGAGEMENT_LOADING, 
  FETCH_VENDOR_ENGAGEMENT_SUCCESS, 
  FETCH_VENDOR_ENGAGEMENT_FAILURE,
  FETCH_UPCOMING_VENDOR_ENGAGEMENTS_SUCCESS,
  FETCH_VENDORS_SUCCESS,
  FETCH_VENDORS_FAILURE,
  CREATE_VENDOR_ENGAGEMENT_LOADING,
  CREATE_VENDOR_ENGAGEMENT_SUCCESS,
  CREATE_VENDOR_ENGAGEMENT_FAILURE,
  DELETE_VENDOR_ENGAGEMENT_LOADING,
  DELETE_VENDOR_ENGAGEMENT_SUCCESS,
  DELETE_VENDOR_ENGAGEMENT_FAILURE,
  EDIT_VENDOR_ENGAGEMENT_LOADING,
  EDIT_VENDOR_ENGAGEMENT_SUCCESS,
  EDIT_VENDOR_ENGAGEMENT_FAILURE
} from '../../actions/actionTypes';

import { initialEngagements } from '../initialState';
import filter from '../../helpers/filter';
import findIndex from '../../helpers/findindex';

let index;

const engagementsReducer = (state = initialEngagements, action) => {
  switch (action.type) {
    case FETCH_VENDOR_ENGAGEMENT_LOADING:
      return { ...state, isLoading: action.payload };
    case FETCH_VENDOR_ENGAGEMENT_SUCCESS:
      return { ...state, engagements: action.payload };
    case FETCH_VENDORS_SUCCESS:
      return { ...state, vendors: action.payload };
    case FETCH_UPCOMING_VENDOR_ENGAGEMENTS_SUCCESS:
      return {
        ...state,
        upComingEngagements: {
          ...action.payload
        }
      };
    case CREATE_VENDOR_ENGAGEMENT_LOADING:
      return { ...state, isCreating: action.payload };
    case CREATE_VENDOR_ENGAGEMENT_SUCCESS:
      return { ...state, engagements: [...state.engagements, action.payload] };
    case DELETE_VENDOR_ENGAGEMENT_LOADING:
      return { ...state, isDeleting: action.payload };
    case DELETE_VENDOR_ENGAGEMENT_SUCCESS: 
      return {
        ...state,
        engagements: filter(state.engagements, action.payload)
      };
    case EDIT_VENDOR_ENGAGEMENT_LOADING:
      return { ...state, isUpdating: action.payload };
    case EDIT_VENDOR_ENGAGEMENT_SUCCESS:
      index = findIndex(state.engagements, action.payload.id);
      
      return {
        ...state,
        engagements: [
          ...state.engagements.slice(0, index),
          action.payload, 
          ...state.engagements.slice(index + 1)
        ]
      };
    case FETCH_VENDOR_ENGAGEMENT_FAILURE:
    case FETCH_VENDORS_FAILURE:
    case CREATE_VENDOR_ENGAGEMENT_FAILURE:
    case DELETE_VENDOR_ENGAGEMENT_FAILURE:
    case EDIT_VENDOR_ENGAGEMENT_FAILURE:
      return state;
    default:
      return state;
  }
};

export default engagementsReducer;
