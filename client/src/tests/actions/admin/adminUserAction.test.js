/* eslint-disable no-undef */
import moxios from 'moxios';

import {
  GET_ADMIN_USER,
  ADD_ADMIN_USER_SUCCESS,
  ADD_ADMIN_USER_FAILURE,
  GET_ALL_ADMIN_USERS
} from '../../../actions/actionTypes';

import {
  userID,
  getAdminUser,
  createAdminUser,
  getAllAdminUsers
} from '../../../actions/admin/adminUserAction';
import { adminUsers } from '../../__mocks__/mockAdminUsers';

describe('Get User Role Action', () => {
  describe('Fetch User Role', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('shoould successfully fetch user role', async (done) => {
      moxios.stubRequest(`/roles/user/${userID}`, {
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

    it('should fail to create create an admin user', async (done) => {
      moxios.stubRequest(`/roles/user`, {
        status: 400,
        response: {
          payload: {
            users: []
          }
        }
      });

      const expectedActions = [

        {
          type: ADD_ADMIN_USER_FAILURE,
          payload: []
        },

      ];
      const store = mockStore({});
      await store.dispatch(createAdminUser({ emailAddress: 'admin.user@andela.com', roleId: 1 }))
        .then(() => {
          expect(store.getActions()[0].type).toEqual(ADD_ADMIN_USER_FAILURE);
        });
      done();
    });
  });

  describe('Fetch admins', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should successfully fetch all admins', async (done) => {
      moxios.stubRequest(`/users/admin`, {
        status: 200,
        response: {
          payload: adminUsers.payload
        }
      });

      const expectedAction = [
        {
          type: GET_ALL_ADMIN_USERS,
          payload: adminUsers.payload.AdminUsers
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(getAllAdminUsers())
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });

    it('should successfully create an admin user', async (done) => {
      moxios.stubRequest(`/roles/user`, {
        status: 201,
        response: {
          msg: adminUsers.msg
        }
      });

      const expectedActions = [

        {
          type: ADD_ADMIN_USER_SUCCESS,
          message: adminUsers.msg
        },

      ];
      const store = mockStore({});
      await store.dispatch(createAdminUser({ emailAddress: 'admin.user@andela.com', roleId: 1 }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });
});
