/* eslint-disable no-undef */
import moxios from 'moxios';
import {
  ADD_MENU_TEMPLATE_SUCCESS,
  ADD_MENU_TEMPLATE_FAILURE
} from '../../../actions/actionTypes';
import { addMenuTemplate } from '../../../actions/admin/menuTemplateAction';
import mockStore from '../../helpers/mockStore';
import { menuTemplate } from '../../__mocks__/menuTemplate';

describe('Menu Template Actions', () => {
  describe('Add menu templates', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('adds a menu template sucessfully', async (done) => {
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
        .dispatch(addMenuTemplate())
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
        .dispatch(addMenuTemplate())
        .then(() => {
          expect(store.getActions()[0]).toEqual(expectedAction);
        });

      done();
    });
  });
});
