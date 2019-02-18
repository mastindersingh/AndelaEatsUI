import initialState from '../../reducers/initialState';
import { LOAD_ACTIVE_USER_SUCCESS } from '../../actions/actionTypes';
import userReducer from '../../reducers/userReducer';

/* 
global jest 
expect 
*/
describe('User Reducer', () => {
  it('LOAD_ACTIVE_USER_SUCCESS: should set active user to state', () => {
    const activeUser = {
      name: 'larrystone yakov',
      profile: ''
    };
    const action = {
      type: LOAD_ACTIVE_USER_SUCCESS,
      activeUser
    };
    const newState = userReducer(initialState.activeUser, action);
    expect(newState.menus).toEqual(action.payload);
  });

  it('should return default state for unlisted initial state/action type', () => { //eslint-disable-line
    const action = {
      type: 'FETCH_ME',
    };
    const newState = userReducer(undefined, action);
    expect(newState).toEqual({});
  });
});