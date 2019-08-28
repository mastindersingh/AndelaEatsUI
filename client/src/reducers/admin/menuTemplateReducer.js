import {
  ADD_MENU_TEMPLATE_SUCCESS,
  ADD_MENU_TEMPLATE_FAILURE,
  GET_MENU_TEMPLATE_SUCCESS,
  GET_MENU_TEMPLATE_FAILURE,
  FETCHING_MENU_TEMPLATES,
} from '../../actions/actionTypes';
import { initialMenuTemplates } from '../initialState';

export default (state = initialMenuTemplates, { type, payload }) => {
  switch (type) {
    case ADD_MENU_TEMPLATE_SUCCESS:
      return {
        ...state,
        menuTemplates: [payload, ...state.menuTemplates],
        meta: { ...state.meta, total_rows: state.meta.total_rows + 1 }
      };
    
    case ADD_MENU_TEMPLATE_FAILURE:
      return {
        ...state,
        error: payload
      };
    
    case FETCHING_MENU_TEMPLATES:
      return {
        ...state,
        isLoading: true,
      };
    
    case GET_MENU_TEMPLATE_SUCCESS:
      return {
        ...state,
        menuTemplates: payload.MenuTemplates,
        meta: payload.meta,
        isLoading: false,
      };

    case GET_MENU_TEMPLATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: {
          status: true,
          message: payload,
        }
      };

    default: return state;
  }
};
