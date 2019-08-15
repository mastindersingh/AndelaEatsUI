/* eslint-disable no-undef */
import {
  ADD_MENU_TEMPLATE_SUCCESS,
  ADD_MENU_TEMPLATE_FAILURE
} from '../../../actions/actionTypes';
import
menuTemplateReducer,
{ initialMenuTemplate } from '../../../reducers/admin/menuTemplateReducer';
import { menuTemplate } from '../../__mocks__/menuTemplate';

describe('Menu Template Reducer', () => {
  let newState, action;
  it('should return initial state', () => {
    action = {
      type: "Undifined",
      payload: {},
    };

    expect(menuTemplateReducer(initialMenuTemplate, action))
      .toEqual(initialMenuTemplate);
  });

  it('ADD_MENU_TEMPLATE_SUCCESS', () => {
    action = {
      type: ADD_MENU_TEMPLATE_SUCCESS,
      payload: menuTemplate.payload
    };

    newState = menuTemplateReducer(initialMenuTemplate, action);
    expect(newState.menuTemplate).toEqual(action.payload);
  });

  it('ADD_MENU_TEMPLATE_FAILURE', () => {
    action = {
      type: ADD_MENU_TEMPLATE_FAILURE,
      payload: 'error',
    };

    newState = menuTemplateReducer(initialMenuTemplate, action);
    expect(newState.error).toEqual('error');
  });
});
