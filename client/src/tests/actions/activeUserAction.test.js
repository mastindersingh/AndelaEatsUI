import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import loadActiveUser from '../../actions/activeUserAction';
import { LOAD_ACTIVE_USER_SUCCESS } from '../../actions/actionTypes';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

/* 
global jest 
expect 
*/
describe('Load active user', () => {
  it('should set active user', async (done) => {
    const expectedActions = [
      {
        type: LOAD_ACTIVE_USER_SUCCESS,
        activeUser: 'unauthorised'
      }
    ];
    const store = mockStore({});
    store.dispatch(loadActiveUser());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});
