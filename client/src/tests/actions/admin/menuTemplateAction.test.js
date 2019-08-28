/* eslint-disable no-undef */
import moxios from 'moxios';
import * as menuTemplatesAction from
  '../../../actions/admin/menuTemplateAction';
import mockStore from '../../helpers/mockStore';
import { menuTemplate } from '../../__mocks__/menuTemplate';
import {
  ADD_MENU_TEMPLATE_SUCCESS,
  ADD_MENU_TEMPLATE_FAILURE,
  GET_MENU_TEMPLATE_SUCCESS,
  GET_MENU_TEMPLATE_FAILURE,
  FETCHING_MENU_TEMPLATES,
} from '../../../actions/actionTypes';


describe('Unit tests for the menuTemplate actions', () => {
  const menuTemplates = [
    { name: 'template name', mealPeriod: 'lunch' },
    { name: 'template name2', mealPeriod: 'lunch' }
  ];
  describe('Unit tests for the action creators', () => {
    it('should return the list of menu templates on a successful '
    + 'request', () => {
      const expectedAction = {
        type: GET_MENU_TEMPLATE_SUCCESS,
        payload: menuTemplates,
      };
      expect(menuTemplatesAction.getMenuTemplateSuccess(menuTemplates))
        .toEqual(expectedAction);
    });
    it('should return the error from the server when '
      + 'a request to fetch menu templates fails', () => {
      const errorMessage = 'some error from the server';
      const expectedAction = {
        type: GET_MENU_TEMPLATE_FAILURE,
        payload: errorMessage
      };
      expect(menuTemplatesAction.getMenuTemplateFailure(errorMessage))
        .toEqual(expectedAction);
    });
  });
  describe('unit tests for the async action creators', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should dispatch the appropriate action when '
    + 'a get request to list menu templates is successful', () => {
      moxios.stubRequest('/menu_template', {
        status: 200,
        response: { payload: { MenuTemplates: [...menuTemplates], meta: '' } },
      });
      const store = mockStore({});
      const expectedAction = [
        { type: FETCHING_MENU_TEMPLATES },
        {
          type: GET_MENU_TEMPLATE_SUCCESS,
          payload: { MenuTemplates: [...menuTemplates], meta: '' },
        }
      ];
      return store.dispatch(menuTemplatesAction.getMenuTemplates()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    it('should dispatch the appropriate action when '
    + 'a get request to list menu templates fails', () => {
      moxios.stubRequest('/menu_template', {
        status: 400,
        response: { message: 'custom error message' },
      });
      const store = mockStore({});
      const expectedAction = [
        { type: FETCHING_MENU_TEMPLATES },
        {
          type: GET_MENU_TEMPLATE_FAILURE,
          payload: { message: 'custom error message' },
        }
      ];
      return store.dispatch(menuTemplatesAction.getMenuTemplates()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
    describe('Unit test for addMenu template', () => {
      it('adds a menu template successfully', async (done) => {
        moxios.stubRequest(`/menu_template`, {
          status: 201,
          response: menuTemplate
        });

        const expectedAction = {
          type: ADD_MENU_TEMPLATE_SUCCESS,
          payload: menuTemplate.payload
        };

        const store = mockStore({});

        await store
          .dispatch(menuTemplatesAction.addMenuTemplate())
          .then(() => {
            expect(store.getActions()[0]).toEqual(expectedAction);
          });

        done();
      });

      it('fails to add a menu template', async (done) => {
        moxios.stubRequest(`/menu_template`, {
          status: 400,
          response: { payload: { message: 'failed' } }
        });

        const expectedAction = {
          type: ADD_MENU_TEMPLATE_FAILURE,
          payload: 'failed'
        };

        const store = mockStore({});

        await store
          .dispatch(menuTemplatesAction.addMenuTemplate())
          .then(() => {
            expect(store.getActions()[0]).toEqual(expectedAction);
          });

        done();
      });
    });
  });
});
