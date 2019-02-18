/* eslint-disable no-undef */
import moxios from 'moxios';

import { 
  FETCH_VENDOR_ENGAGEMENT_LOADING, 
  FETCH_VENDOR_ENGAGEMENT_SUCCESS, 
  FETCH_VENDOR_ENGAGEMENT_FAILURE,
  CREATE_VENDOR_ENGAGEMENT_LOADING,
  CREATE_VENDOR_ENGAGEMENT_SUCCESS,
  CREATE_VENDOR_ENGAGEMENT_FAILURE,
  DELETE_VENDOR_ENGAGEMENT_LOADING,
  DELETE_VENDOR_ENGAGEMENT_SUCCESS,
  DELETE_VENDOR_ENGAGEMENT_FAILURE,
  EDIT_VENDOR_ENGAGEMENT_LOADING,
  EDIT_VENDOR_ENGAGEMENT_SUCCESS,
  EDIT_VENDOR_ENGAGEMENT_FAILURE
} from '../../../actions/actionTypes';

import { 
  baseUrl, 
  fetchEngagements,
  createEngagement,
  deleteEngagement,
  editEngagement 
} from '../../../actions/admin/engagementsAction';

import engagements from '../../__mocks__/mockEngagements';
import { newEngagement } from '../../__mocks__/mockEngagements';

describe('Engagements Action', () => {
  describe('Fetch Engagements', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    
    it('fetch engagement success', async (done) => {
      moxios.stubRequest(`${baseUrl}/engagements/`, {
        status: 200,
        response: {
          payload: {
            engagements
          }
        }
      });

      const expectedAction = [
        {
          type: FETCH_VENDOR_ENGAGEMENT_LOADING,
          payload: true
        },
        {
          type: FETCH_VENDOR_ENGAGEMENT_SUCCESS,
          payload: engagements
        },
        {
          type: FETCH_VENDOR_ENGAGEMENT_LOADING,
          payload: false
        }
      ];

      const store = mockStore({});
      await store 
        .dispatch(fetchEngagements())
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      done();
    });

    it('fetch engagement failure', async (done) => {
      moxios.stubRequest(`${baseUrl}/engagements/`, {
        status: 401
      });

      const expectedActions = [
        {
          type: FETCH_VENDOR_ENGAGEMENT_LOADING,
          payload: true
        },
        {
          type: FETCH_VENDOR_ENGAGEMENT_FAILURE,
          payload: new Error('Request failed with status code 401')
        },
        {
          type: FETCH_VENDOR_ENGAGEMENT_LOADING,
          payload: false
        }
      ];

      const store = mockStore({});
      await store
        .dispatch(fetchEngagements())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    });
  });
});


describe('Create Engagement', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('create engagement success', async (done) => {
    moxios.stubRequest(`${baseUrl}/engagements/`, {
      status: 201,
      response: {
        payload: {
          engagement: newEngagement
        }
      }
    });
    

    const expectedActions = [
      {
        type: CREATE_VENDOR_ENGAGEMENT_LOADING,
        payload: true,
      },
      {
        type: CREATE_VENDOR_ENGAGEMENT_SUCCESS,
        payload: newEngagement,
      },
      {
        type: CREATE_VENDOR_ENGAGEMENT_LOADING,
        payload: false,
      }
    ];

    const store = mockStore({});
    await store
      .dispatch(createEngagement(newEngagement))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('create engagement failure', async (done) => {
    moxios.stubRequest(`${baseUrl}/engagements/`, {
      status: 401,
      response: {}
    });

    const expectedActions = [
      {
        type: CREATE_VENDOR_ENGAGEMENT_LOADING,
        payload: true,
      },
      {
        type: CREATE_VENDOR_ENGAGEMENT_FAILURE,
        payload: new Error('Request failed with status code 401'),
      },
      {
        type: CREATE_VENDOR_ENGAGEMENT_LOADING,
        payload: false,
      }
    ];

    const store = mockStore({});
    await store
      .dispatch(createEngagement(newEngagement))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});

describe('Delete Engagement', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('delete engagement success', async (done) => {
    moxios.stubRequest(`${baseUrl}/engagements/${engagements[0].id}`, {
      status: 200,
      response: {}
    });

    const expectedActions = [
      {
        type: DELETE_VENDOR_ENGAGEMENT_LOADING,
        payload: true,
      },
      {
        type: DELETE_VENDOR_ENGAGEMENT_SUCCESS,
        payload: engagements[0].id
      },
      {
        type: DELETE_VENDOR_ENGAGEMENT_LOADING,
        payload: false,
      }
    ];
    const store = mockStore({});
    await store
      .dispatch(deleteEngagement(engagements[0].id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('return engagement failure', async (done) => {
    moxios.stubRequest(`${baseUrl}/engagements/${engagements[0].id}`, {
      status: 401,
      response: {}
    });

    const expectedActions = [
      {
        type: DELETE_VENDOR_ENGAGEMENT_LOADING,
        payload: true,
      },
      {
        type: DELETE_VENDOR_ENGAGEMENT_FAILURE,
        payload: new Error('Request failed with status code 401'),
      },
      {
        type: DELETE_VENDOR_ENGAGEMENT_LOADING,
        payload: false,
      }
    ];
    const store = mockStore({});
    await store
      .dispatch(deleteEngagement(engagements[0].id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});

describe('Update Engagement', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('update engagement success', async (done) => {
    moxios.stubRequest(`${baseUrl}/engagements/${engagements[0].id}`, {
      status: 200,
      response: {
        payload: {
          engagement: newEngagement
        }
      }
    });
    

    const expectedActions = [
      {
        type: EDIT_VENDOR_ENGAGEMENT_LOADING,
        payload: true,
      },
      {
        type: EDIT_VENDOR_ENGAGEMENT_SUCCESS,
        payload: newEngagement,
      },
      {
        type: EDIT_VENDOR_ENGAGEMENT_LOADING,
        payload: false,
      }
    ];

    const store = mockStore({});
    await store
      .dispatch(editEngagement(engagements[0].id, engagements[0]))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('update engagement failure', async (done) => {
    moxios.stubRequest(`${baseUrl}/engagements/${engagements[0].id}`, {
      status: 401,
      response: {}
    });

    const expectedActions = [
      {
        type: EDIT_VENDOR_ENGAGEMENT_LOADING,
        payload: true,
      },
      {
        type: EDIT_VENDOR_ENGAGEMENT_FAILURE,
        payload: new Error('Request failed with status code 401'),
      },
      {
        type: EDIT_VENDOR_ENGAGEMENT_LOADING,
        payload: false,
      }
    ];

    const store = mockStore({});
    await store
      .dispatch(editEngagement(engagements[0].id, engagements[0]))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});