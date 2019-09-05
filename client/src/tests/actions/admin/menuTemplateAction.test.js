/* eslint-disable no-undef */
import moxios from 'moxios';
import * as menuTemplatesAction from
  '../../../actions/admin/menuTemplateAction';
import mockStore from '../../helpers/mockStore';
import {
  menuTemplate,
  deleteMenuTemplateMock,
  menuTemplates
} from '../../__mocks__/menuTemplate';
import {
  ADD_MENU_TEMPLATE_SUCCESS,
  ADD_MENU_TEMPLATE_FAILURE,
  GET_MENU_TEMPLATES_SUCCESS,
  GET_MENU_TEMPLATES_FAILURE,
  FETCHING_MENU_TEMPLATES,
  GET_MENU_TEMPLATE_SUCCESS,
  GET_MENU_TEMPLATE_FAILURE,
  DELETE_MENU_TEMPLATE_SUCCESS,
  DELETE_MENU_TEMPLATE_FAILURE
} from '../../../actions/actionTypes';

describe('Unit tests for the menuTemplate actions', () => {
  describe('Unit tests for the action creators', () => {
    it('should return the list of menu templates on a successful '
    + 'request', () => {
      const expectedAction = {
        type: GET_MENU_TEMPLATES_SUCCESS,
        payload: menuTemplates,
      };
      expect(menuTemplatesAction.getMenuTemplateSuccess(menuTemplates))
        .toEqual(expectedAction);
    });

    it('should return the error from the server when '
      + 'a request to fetch menu templates fails', () => {
      const errorMessage = 'some error from the server';
      const expectedAction = {
        type: GET_MENU_TEMPLATES_FAILURE,
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
          type: GET_MENU_TEMPLATES_SUCCESS,
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
          type: GET_MENU_TEMPLATES_FAILURE,
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

    describe('Unit test for get a single template', () => {
      it('gets a menu template successfully', async (done) => {
        moxios.stubRequest(`/menu_template/${menuTemplates[0].id}`, {
          status: 200,
          response: { payload: menuTemplates[0] }
        });

        const expectedAction = {
          type: GET_MENU_TEMPLATE_SUCCESS,
          payload: menuTemplates[0]
        };

        const store = mockStore({});
        await store
          .dispatch(menuTemplatesAction.getMenuTemplate(menuTemplates[0].id))
          .then(() => {
            expect(store.getActions()[0]).toEqual(expectedAction);
          });
        done();
      });

      it('fails to get a menu template', async (done) => {
        moxios.stubRequest(`/menu_template/404`, {
          status: 400,
          response: { msg: 'failed' }
        });

        const expectedAction = {
          type: GET_MENU_TEMPLATE_FAILURE,
          payload: 'failed'
        };
        const store = mockStore({});

        await store
          .dispatch(menuTemplatesAction.getMenuTemplate(404))
          .then(() => {
            expect(store.getActions()[0]).toEqual(expectedAction);
          });
        done();
      });
    });
  });

  describe('Delete Menu Template', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    it('deletes a menu template successfully', async (done) => {
      moxios.stubRequest('/menu_template/1', {
        status: 200,
        response: deleteMenuTemplateMock
      });

      const expectedAction = {
        type: DELETE_MENU_TEMPLATE_SUCCESS,
        payload: deleteMenuTemplateMock.payload.status
      };

      const store = mockStore({});

      await store
        .dispatch(menuTemplatesAction.deleteMenuTemplate(1))
        .then(() => {
          expect(store.getActions()[0]).toEqual(expectedAction);
        });

      done();
    });

    it('fails to delete a menu template', async (done) => {
      moxios.stubRequest('/menu_template/0', {
        status: 404,
        response: {
          msg: "MenuTemplate with id 0 not found"
        }
      });

      const expectedAction = {
        type: DELETE_MENU_TEMPLATE_FAILURE,
        payload: 'An error occured while deleting the menu template, please try again'
      };

      const store = mockStore({});

      await store
        .dispatch(menuTemplatesAction.deleteMenuTemplate(0))
        .then(() => {
          expect(store.getActions()[0]).toEqual(expectedAction);
        });

      done();
    });
  });
});
