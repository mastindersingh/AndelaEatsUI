/* eslint-disable no-undef */
import moxios from 'moxios';
import {
  FETCH_MEAL_ITEMS_LOADING,
  FETCH_MEAL_ITEMS_FAILURE,
  FETCH_MEAL_ITEMS_SUCCESS,
  SET_ADD_MEAL_LOADING,
  ADD_MEAL_ITEM_SUCCESS,
  SHOW_MEAL_MODAL,
  DELETE_MEAL_ITEM_LOADING,
  DELETE_MEAL_ITEM_SUCCESS,
  DELETE_MEAL_ITEM_FAILURE,
  EDIT_MEAL_ITEM_LOADING,
  EDIT_MEAL_ITEM_SUCCESS,
  EDIT_MEAL_ITEM_FAILURE,
} from '../../../actions/actionTypes';

import {
  fetchMealItems,
  apiBaseUrl,
  deleteMealItem,
  addMealItem,
  editMealItem
} from '../../../actions/admin/mealItemsAction';
import { mealItems, pagination } from '../../__mocks__/mockMealItems';

describe('Admin::Meal Items Action', () => {
  const formData = {
    name: 'Ugeli',
    type: 'side',
    image: new File([''], 'filename', { type: 'image/png' })
  };

  describe('Fetch meal Items', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('fetch meal items success', async (done) => {
      moxios.stubRequest(`${apiBaseUrl}/meal-items/?page=1`, {
        status: 200,
        response: {
          payload: {
            mealItems,
            meta: pagination
          }
        }
      });

      const expectedActions = [
        {
          type: FETCH_MEAL_ITEMS_LOADING,
          payload: true,
        },
        {
          type: FETCH_MEAL_ITEMS_SUCCESS,
          payload: { mealItems, pagination }
        },
        {
          type: FETCH_MEAL_ITEMS_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});

      await store
        .dispatch(fetchMealItems())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });

    it('fetch meal items failure', async (done) => {
      moxios.stubRequest(`${apiBaseUrl}/meal-items/?page=1`, {
        status: 401,
      });
  
      const expectedActions = [
        {
          type: FETCH_MEAL_ITEMS_LOADING,
          payload: true,
        },
        {
          type: FETCH_MEAL_ITEMS_FAILURE,
          payload: new Error('Request failed with status code 401'),
        },
        {
          type: FETCH_MEAL_ITEMS_LOADING,
          payload: false,
        }
      ];
  
      const store = mockStore({});
  
      await store
        .dispatch(fetchMealItems())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });

  describe('Add meal Item Action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    const store = mockStore({});

    const expectedActions = [
      {
        type: SET_ADD_MEAL_LOADING,
        payload: true
      },
      {
        type: SET_ADD_MEAL_LOADING,
        payload: false
      },
    ];

    it('should add a meal without error', async (done) => {
      moxios.stubRequest(`${apiBaseUrl}/meal-items/`, {
        status: 201,
        response: {
          payload: {
            mealItem: {
              ...mealItems[0]
            }
          }
        }
      });

      const newExpectedActions = [
        expectedActions[0],
        {
          type: ADD_MEAL_ITEM_SUCCESS,
          payload: { ...mealItems[0] }
        },
        {
          type: SHOW_MEAL_MODAL,
          payload: {
            edit: false,
            show: false
          }
        },
        expectedActions[1],
      ];

      await store
        .dispatch(addMealItem(formData))
        .then(() => {
          expect(store.getActions()).toEqual(newExpectedActions);
        });
      done();
    });
  });

  describe('Delete meal Items', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('delete meal items success', async (done) => {
      moxios.stubRequest(`${apiBaseUrl}/meal-items/${mealItems[0].id}`, {
        status: 200,
        response: {}
      });

      const expectedActions = [
        {
          type: DELETE_MEAL_ITEM_LOADING,
          payload: true,
        },
        {
          type: DELETE_MEAL_ITEM_SUCCESS,
          payload: mealItems[0].id
        },
        {
          type: DELETE_MEAL_ITEM_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});

      await store
        .dispatch(deleteMealItem(mealItems[0].id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  
    it('delete meal item failure', async (done) => {
      moxios.stubRequest(`${apiBaseUrl}/meal-items/${mealItems[0].id}`, {
        status: 401,
      });
  
      const expectedActions = [
        {
          type: DELETE_MEAL_ITEM_LOADING,
          payload: true,
        },
        {
          type: DELETE_MEAL_ITEM_FAILURE,
          payload: new Error('Request failed with status code 401'),
        },
        {
          type: DELETE_MEAL_ITEM_LOADING,
          payload: false,
        }
      ];
  
      const store = mockStore({});
  
      await store
        .dispatch(deleteMealItem(mealItems[0].id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });

  describe('Edit Meal Item', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('updates meal item successfully', async (done) => {
      const expectedActions = [
        {
          type: EDIT_MEAL_ITEM_LOADING,
          payload: true,
        },
        {
          type: EDIT_MEAL_ITEM_SUCCESS,
          payload: {
            mealItemId: 1,
            mealItem: { ...mealItems[0] }
          }
        },
        {
          type: SHOW_MEAL_MODAL,
          payload: {
            show: false,
            edit: false,
          }
        },
        {
          type: EDIT_MEAL_ITEM_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({
        mealItems: {
          meals: mealItems
        }
      });

      moxios.stubRequest(`${apiBaseUrl}/meal-items/${mealItems[0].id}`, {
        status: 200,
        response: {
          payload: {
            mealItem: mealItems[0]
          }
        }
      });

      await store.dispatch(editMealItem(mealItems[0].id, formData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });

    it('throws error on update failure', async (done) => {
      const expectedActions = [
        {
          type: EDIT_MEAL_ITEM_LOADING,
          payload: true,
        },
        {
          type: EDIT_MEAL_ITEM_FAILURE,
          payload: new Error('Request failed with status code 500')
        },
        {
          type: EDIT_MEAL_ITEM_LOADING,
          payload: false,
        }
      ];

      const store = mockStore({});

      moxios.stubRequest(`${apiBaseUrl}/meal-items/${mealItems[0].id}`, {
        status: 500
      });
      
      await store.dispatch(editMealItem(mealItems[0].id, formData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });
});
