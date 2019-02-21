/* eslint-disable no-undef */
import moxios from 'moxios';
import moment from 'moment';
import { formatCurrentDate } from '../../../helpers';
import mockMenuList from '../../__mocks__/mockMenuList';
import mealItems from '../../__mocks__/mockMealItems';
import { engagements, menu } from '../../__mocks__/mockMenuItems';
import { formatDate } from '../../../helpers/formatMealItems';


import {
  FETCH_MENUS_SUCCESS,
  FETCH_MENUS_FAILURE,
  FETCH_MENUS_LOADING,
  FETCH_VENDOR_ENGAGEMENT_SUCCESS,
  FETCH_VENDOR_ENGAGEMENT_FAILURE,
  DELETE_MENU_ITEM_LOADING,
  DELETE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_FAILURE,
  FETCH_MEALITEMS_SUCCESS,
  FETCH_MEALITEMS_FAILURE,
  CREATE_MENU_SUCCESS,
  CREATE_MENU_LOADING,
  CREATE_MENU_FAILURE,
  EDIT_MENU_SUCCESS,
  EDIT_MENU_FAILURE,
} from '../../../actions/actionTypes';

import {
  fetchMenus,
  fetchVendorEngagements,
  deleteMenuItem,
  mockMenu,
  fetchMealItems,
  createMenu,
  editMenu,
} from '../../../actions/admin/menuItemsAction';


const menusPath = `admin/menus/lunch/${formatDate(moment())}/${formatDate(moment())}`;

const menusFromApi = {
  payload: {
    dateOfMeal: '2018-09-09',
    mealPeriod: 'lunch',
    menuList: []
  }
};

const initExpectedActions = [
  {
    type: FETCH_MENUS_LOADING,
    payload: true,
  }, null,
  {
    type: FETCH_MENUS_LOADING,
    payload: false,
  }
];

describe('Admin::Menu Items Action', () => {
  describe('Fetch menu Items', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetch menu items success', async (done) => {
      moxios.stubRequest(`/${menusPath}`, {
        status: 200,
        response: { ...menusFromApi }
      });
      
      const expectedActions = [...initExpectedActions];

      expectedActions[1] = {
        type: FETCH_MENUS_SUCCESS,
        payload: { ...menusFromApi.payload }
      };
  
      const store = mockStore({});
      
      await store
        .dispatch(fetchMenus(formatDate(moment()), formatDate(moment())))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });

      done();
    });

    it('fetch menu items error', async (done) => {
      moxios.stubRequest(`/${menusPath}`, {
        status: 400,
        response: {}
      });
      
      const expectedActions = [...initExpectedActions];

      expectedActions[1] = {
        type: FETCH_MENUS_FAILURE,
        payload: null
      };
  
      const store = mockStore({});
      
      await store
        .dispatch(fetchMenus(formatDate(moment()), formatDate(moment())))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });

      done();
    });

    it('delete menu item success', async (done) => {
      moxios.stubRequest(`/admin/menus/2`, {
        status: 200,
        response: {}
      });

      const store = mockStore({});

      const expectedActions = [
        {
          type: DELETE_MENU_ITEM_LOADING,
          payload: true,
        },
        {
          type: DELETE_MENU_ITEM_SUCCESS,
          payload: 2,
        },
        {
          type: DELETE_MENU_ITEM_LOADING,
          payload: false,
        }
      ];

      await store.dispatch(deleteMenuItem(2))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });

    it('delete menu item failure', async (done) => {
      moxios.stubRequest(`/admin/menus/2`, {
        status: 400,
        response: {
          msg: 'Access Error - Permission Denied'
        }
      });

      const store = mockStore({});

      const expectedActions = [
        {
          type: DELETE_MENU_ITEM_LOADING,
          payload: true,
        },
        {
          type: DELETE_MENU_ITEM_FAILURE,
          payload: 'Access Error - Permission Denied',
        },
        {
          type: DELETE_MENU_ITEM_LOADING,
          payload: false,
        }
      ];

      await store.dispatch(deleteMenuItem(2))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });

    it('mock menu item ', async (done) => {
      const store = mockStore({});

      const expectedActions = [
        {
          type: 'MOCK_MENU_LIST',
          payload: mockMenuList,
        }
      ];

      await store.dispatch(mockMenu(mockMenuList));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });


  describe('Fetch Vendor Engagements', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetch vendor engagements success', async (done) => {
      moxios.stubRequest(`/engagements/`, {
        status: 200,
        response: { payload: engagements }
      });

      const expectedAction = [{
        type: FETCH_VENDOR_ENGAGEMENT_SUCCESS,
        payload: engagements
      }];

      const store = mockStore({});

      await store
        .dispatch(fetchVendorEngagements())
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });

    it('fetch vendor engagements failure', async (done) => {
      moxios.stubRequest(`/engagements/`, {
        status: 400,
        response: {}
      });

      const expectedAction = [{
        type: FETCH_VENDOR_ENGAGEMENT_FAILURE,
        payload: new Error('Request failed with status code 400')
      }];
  
      const store = mockStore({});
      
      await store
        .dispatch(fetchVendorEngagements())
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });
  });

  describe('Fetch Meal Items', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetch meal item success', async (done) => {
      moxios.stubRequest(`/meal-items/`, {
        status: 200,
        response: { payload: { mealItems } }
      });

      const expectedAction = [{
        type: FETCH_MEALITEMS_SUCCESS,
        payload: { mealItems }
      }];

      const store = mockStore({});

      await store
        .dispatch(fetchMealItems())
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });

    it('fetch meal items failure', async (done) => {
      moxios.stubRequest(`/meal-items/`, {
        status: 400,
        response: {}
      });

      const expectedAction = [{
        type: FETCH_MEALITEMS_FAILURE,
        payload: new Error('Request failed with status code 400')
      }];

      const store = mockStore({});

      await store
        .dispatch(fetchMealItems())
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });
  });

  describe('Create  Menu', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('create menu success', async (done) => {
      moxios.stubRequest(`/admin/menus/`, {
        status: 201,
        response: { payload: { menu: menu[0] } }
      });

      const expectedAction = [
        {
          type: CREATE_MENU_LOADING,
          payload: true
        },
        {
          type: CREATE_MENU_SUCCESS,
          payload: { menu: menu[0] }
        },
        {
          type: CREATE_MENU_LOADING,
          payload: false
        }
      ];

      const store = mockStore({});

      await store
        .dispatch(createMenu())
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });

    it('create menu failure', async (done) => {
      moxios.stubRequest(`/admin/menus/`, {
        status: 400,
        response: {}
      });

      const expectedAction = [
        {
          type: CREATE_MENU_LOADING,
          payload: true
        },
        {
          type: CREATE_MENU_FAILURE,
          payload: new Error('Request failed with status code 400'),
        },
        {
          type: CREATE_MENU_LOADING,
          payload: false
        }
      ];

      const store = mockStore({});

      await store
        .dispatch(createMenu())
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });
  });

  describe('Edit  Menu', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should edit menu on success', async (done) => {
      moxios.stubRequest(`/admin/menus/2`, {
        status: 200,
        response: { payload: { menu: menu[1] } }
      });

      const expectedAction = [
        {
          type: FETCH_MENUS_LOADING,
          payload: true
        },
        {
          type: EDIT_MENU_SUCCESS,
          payload: { menu: menu[1] }
        },
        {
          type: FETCH_MENUS_LOADING,
          payload: false
        }
      ];

      const store = mockStore({});

      await store
        .dispatch(editMenu(menu[1]))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });

    it('edit menu failure', async (done) => {
      moxios.stubRequest(`/admin/menus/1`, {
        status: 400,
        response: {}
      });

      const expectedAction = [
        {
          type: FETCH_MENUS_LOADING,
          payload: true
        },
        {
          type: EDIT_MENU_FAILURE,
          payload: new Error('Request failed with status code 400'),
        },
        {
          type: FETCH_MENUS_LOADING,
          payload: false
        }
      ];

      const store = mockStore({});

      await store
        .dispatch(editMenu(menu[0]))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });
  });
});
