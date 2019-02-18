/* eslint-disable no-undef */
import moxios from 'moxios';

import {
  GET_ADMIN_USER
} from '../../../actions/actionTypes';

import {
  baseUrl,
  userID,
  getAdminUser
} from '../../../actions/admin/adminUserAction';


describe('Get User Role Action', () => {
  describe('Fetch User Role', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetch user role success', async (done) => {
      moxios.stubRequest(`${baseUrl}/roles/user/${userID}`, {
        status: 200,
        response: {
          payload: {
            user_role: [{
              roleId: 1
            }]
          }
        }
      });

      const expectedAction = [
        {
          type: GET_ADMIN_USER,
          payload: 1
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(getAdminUser())
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });
  });
});