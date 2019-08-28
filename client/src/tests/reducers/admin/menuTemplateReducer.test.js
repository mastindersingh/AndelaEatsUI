/* eslint-disable no-undef */
import {
  ADD_MENU_TEMPLATE_SUCCESS,
  ADD_MENU_TEMPLATE_FAILURE,
  GET_MENU_TEMPLATE_SUCCESS,
  GET_MENU_TEMPLATE_FAILURE,
  FETCHING_MENU_TEMPLATES,
} from '../../../actions/actionTypes';
import menuTemplateReducer from '../../../reducers/admin/menuTemplateReducer';
import { initialMenuTemplates } from '../../../reducers/initialState';
import { menuTemplate } from '../../__mocks__/menuTemplate';

describe('Add Menu Template Reducer', () => {
  let newState, action;
  it('should return initial state', () => {
    action = {
      type: "Undifined",
      payload: {},
    };

    expect(menuTemplateReducer(initialMenuTemplates, action))
      .toEqual(initialMenuTemplates);
  });

  it('ADD_MENU_TEMPLATE_SUCCESS', () => {
    action = {
      type: ADD_MENU_TEMPLATE_SUCCESS,
      payload: menuTemplate.payload
    };

    newState = menuTemplateReducer(initialMenuTemplates, action);
    expect(newState.menuTemplates).toEqual([action.payload]);
  });

  it('ADD_MENU_TEMPLATE_FAILURE', () => {
    action = {
      type: ADD_MENU_TEMPLATE_FAILURE,
      payload: 'error',
    };

    newState = menuTemplateReducer(initialMenuTemplates, action);
    expect(newState.error).toEqual('error');
  });
});

describe('Unit test for the menuTemplate reducer ', () => {
  it('should return the initial state of the store ', () => {
    expect(menuTemplateReducer(undefined, {})).toEqual({
      menuTemplates: [],
      meta: {},
      isLoading: true,
      error: null,
    });
  });
  it('should update the store when a get menuTemplates '
    + 'request is successful ', () => {
    const expectedState = {
      menuTemplates: [
        { name: 'Indomie' },
        { name: 'chicken' },
      ],
      meta: '',
      isLoading: false,
      error: null,
    };
    const menuTemplateActionDispatched = {
      type: GET_MENU_TEMPLATE_SUCCESS,
      payload: {
        MenuTemplates: [
          { name: 'Indomie' },
          { name: 'chicken' },
        ],
        meta: '',
      },
    };
    expect(menuTemplateReducer(undefined, menuTemplateActionDispatched))
      .toEqual(expectedState);
  });
  it('should update the store when there is a pending '
    + 'request to get menu templates ', () => {
    const expectedState = {
      menuTemplates: [],
      meta: {},
      isLoading: true,
      error: null
    };
    const menuTemplateActionDispatched = {
      type: FETCHING_MENU_TEMPLATES,
    };
    expect(menuTemplateReducer(undefined, menuTemplateActionDispatched))
      .toEqual(expectedState);
  });
  it('should update the store when a get menuTemplates '
    + 'request fails ', () => {
    const expectedState = {
      menuTemplates: [],
      meta: {},
      isLoading: false,
      error: {
        status: true,
        message: 'my message',
      },
    };
    const menuTemplateActionDispatched = {
      type: GET_MENU_TEMPLATE_FAILURE,
      payload: 'my message',
    };
    expect(menuTemplateReducer(undefined, menuTemplateActionDispatched))
      .toEqual(expectedState);
  });
});
