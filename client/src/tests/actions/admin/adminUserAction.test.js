/* eslint-disable no-undef */
import moxios from 'moxios';

import {
  GET_ADMIN_USER,
  ADD_ADMIN_USER_SUCCESS,
  ADD_ADMIN_USER_FAILURE,
  GET_ALL_ADMIN_USERS,
  IS_FETCHING_ADMIN_USERS,
  FETCH_USERS_ROLES,
  ADD_USER_ROLE_SUCCESS,
  IS_FETCHING_ROLES,
  FETCH_ALL_PERMISIONS,
  IS_FETCHING_ROLE_PERMISION,
  FETCH_USER_PERMISION_SUCCESS,
  DELETE_USER_ROLE_SUCCESS,
  DELETE_USER_PERMISION_SUCCESS,
  ADD_USER_PERMISION_SUCCESS,
  GET_TAPPED_USERS_SUCCESS,
  GET_TAPPED_USERS_FAILURE
} from '../../../actions/actionTypes';

import {
  userID,
  getAdminUser,
  createAdminUser,
  getAllAdminUsers,
  getAllUserRoles,
  createUserRole,
  getAllPermisions,
  getRolePermisions,
  deleteUserPermision,
  deleteUserRole,
  createUserPermision,
  getTappedUsers
} from '../../../actions/admin/adminUserAction';
import {
  adminUsers, roles, permisions, roleId, RolePermisions, permisionData, tappedUsers
} from '../../__mocks__/mockAdminUsers';

describe('Get User Role Action', () => {
  describe('Fetch User Role', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should successfully fetch user role', async (done) => {
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
        { payload: true, type: IS_FETCHING_ADMIN_USERS },
        {
          type: GET_ALL_ADMIN_USERS,
          payload: adminUsers.payload.adminUsers
        },
        { payload: false, type: IS_FETCHING_ADMIN_USERS },
      ];

      const store = mockStore({});
      await store
        .dispatch(getAllAdminUsers())
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });

    it('should fail to fetch all admins', async (done) => {
      moxios.stubRequest(`/users/admin`, {
        status: 400,
        response: {}
      });

      const expectedAction = [
        { payload: true, type: IS_FETCHING_ADMIN_USERS },
        { payload: false, type: IS_FETCHING_ADMIN_USERS },
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

  describe('Manages User Roles', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    it('it should fetch all user roles', async (done) => {
      moxios.stubRequest(`/roles/`, {
        status: 200,
        response: {
          payload: roles.payload
        }
      });
      const expectedAction = [
        { payload: true, type: IS_FETCHING_ROLES },
        {
          type: FETCH_USERS_ROLES,
          payload: roles.payload.roles
        },
        { payload: false, type: IS_FETCHING_ROLES },
      ];
      const store = mockStore({});
      await store.dispatch(getAllUserRoles())
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });

    it('it should create a user roles', async (done) => {
      moxios.stubRequest(`/roles/`, {
        status: 201,
        response: {
          payload: roles.msg
        }
      });
      const expectedAction = [
        {
          type: ADD_USER_ROLE_SUCCESS,
          payload: roles.payload.msg
        }
      ];
      const store = mockStore({});
      await store.dispatch(createUserRole({ name: "string" }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });

    it('deletes a user role successfully', async (done) => {
      moxios.stubRequest(`/roles/${roles.payload.roles[0].id}`, {
        status: 200,
        response: {}
      });
      const expectedActions = [
        {
          type: DELETE_USER_ROLE_SUCCESS,
          payload: roles.payload.roles[0].id,
        }
      ];
      const store = mockStore({});
      await store
        .dispatch(deleteUserRole(roles.payload.roles[0].id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });

  describe('Manages Roles Permisions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    it('should fetch all admin permisions', async (done) => {
      moxios.stubRequest(`roles/${roleId}/permissions`, {
        status: 200,
        response: {
          payload: RolePermisions.payload
        }
      });
      const expectedAction = [
        { payload: true, type: IS_FETCHING_ROLE_PERMISION },
        {
          type: FETCH_ALL_PERMISIONS,
          payload: RolePermisions.payload.role_permissions
        },
        { payload: false, type: IS_FETCHING_ROLE_PERMISION },
      ];
      const store = mockStore({});
      await store
        .dispatch(getAllPermisions(roleId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });

    it('should fetch permisions for a specific role', async (done) => {
      moxios.stubRequest(`roles/${roleId}/permissions`, {
        status: 200,
        response: {
          payload: RolePermisions.payload
        }
      });
      const expectedAction = [
        { payload: true, type: IS_FETCHING_ROLE_PERMISION },
        {
          type: FETCH_USER_PERMISION_SUCCESS,
          payload: RolePermisions.payload.role_permissions
        },
        { payload: false, type: IS_FETCHING_ROLE_PERMISION },
      ];
      const store = mockStore({});
      await store
        .dispatch(getRolePermisions(roleId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });

    it('deletes a permision successfully', async (done) => {
      moxios.stubRequest(`roles/permissions/${permisions.payload.permissions[0].id}`, {
        status: 200,
        response: {}
      });
      const expectedActions = [
        {
          type: DELETE_USER_PERMISION_SUCCESS,
          payload: permisions.payload.permissions[0].id,
        }
      ];
      const store = mockStore({});
      await store
        .dispatch(deleteUserPermision(permisions.payload.permissions[0].id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });

    it('creates a user permision successfully', async (done) => {
      moxios.stubRequest(`roles/permissions`, {
        status: 201,
        response: permisionData.response.data.msg
      });
      const expectedActions = [
      ];
      const store = mockStore({});
      await store
        .dispatch(createUserPermision(permisionData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });

  describe('Tapped Users', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Gets tapped users sucessfully', async (done) => {
      moxios.stubRequest('reports/taps/daily', {
        status: 200,
        response: tappedUsers.data
      });

      const expectedActions = [
        {
          type: GET_TAPPED_USERS_SUCCESS,
          payload: tappedUsers.data.payload
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(getTappedUsers())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });

    it('Gets tapped users failure', async (done) => {
      moxios.stubRequest('reports/taps/daily', {
        status: 404,
      });

      const expectedActions = [
        {
          type: GET_TAPPED_USERS_FAILURE,
          payload: undefined
        }
      ];
      const store = mockStore({});

      await store
        .dispatch(getTappedUsers())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });
});
