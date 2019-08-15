import {
  ADD_MENU_TEMPLATE_SUCCESS,
  ADD_MENU_TEMPLATE_FAILURE
} from '../../actions/actionTypes';

export const initialMenuTemplate = {
  menuTemplates: [],
  menuTemplate: {},
  error: null,
};

const menuTemplateReducer = (state = initialMenuTemplate, action) => {
  switch (action.type) {
    case ADD_MENU_TEMPLATE_SUCCESS:
      return {
        ...state,
        menuTemplate: action.payload,
      };
    case ADD_MENU_TEMPLATE_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default menuTemplateReducer;
