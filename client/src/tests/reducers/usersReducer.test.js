import { initialUsers } from '../../reducers/initialState';
import { 
  FETCH_USERS_FAILURE, 
  FETCH_USERS_LOADING, 
  FETCH_USERS_SUCCESS,
  CREATE_USER_LOADING,
  CREATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS
} from '../../actions/actionTypes';
import usersReducer from '../../reducers/admin/usersReducer';
import { users } from '../actions/admin/adminUserAction.test';
/* 
global jest 
expect 
*/
const initialState = {
  ...initialUsers,
  users: [
    ...initialUsers.users,
    { id: 1, firstName: 'bob', lastName: 'doe' }
  ]
};
describe('Users Reducer', () => {
  it('Fetch all users', () => {
    const action = {
      type: FETCH_USERS_SUCCESS,
      users
    };
    const newState = usersReducer(initialState.users, action);
    expect(newState.users).toEqual(action.users);
  });

  it('Create  user', () => {
    const action = {
      type: CREATE_USER_SUCCESS,
      user: { firstName: 'doe', lastName: 'jane' }
    };
    const newState = usersReducer(initialState, action);
    expect(newState.users[1].lastName).toEqual('jane');
  });

  it('should set loading to true on fetch loading', () => {
    const action = {
      type: FETCH_USERS_LOADING
    };
    const newState = usersReducer(initialState.users, action);
    expect(newState.loading).toBeTruthy();
  });

  it('should set loading to when creating a user', () => {
    const action = {
      type: CREATE_USER_LOADING
    };
    const newState = usersReducer(initialState.users, action);
    expect(newState.loading).toBeTruthy();
  });

  it('should set loading to true when updating a user ', () => {
    const action = {
      type: UPDATE_USER_LOADING
    };
    const newState = usersReducer(initialState.users, action);
    expect(newState.loading).toBeTruthy();
  });

  it('should set loading to false on update user failure ', () => {
    const action = {
      type: UPDATE_USER_FAILURE
    };
    const newState = usersReducer(initialState.users, action);
    expect(newState.loading).toBeFalsy();
  });

  it('should set loading to false on fetch users failure ', () => {
    const action = {
      type: FETCH_USERS_FAILURE
    };
    const newState = usersReducer(initialState.users, action);
    expect(newState.loading).toBeFalsy();
  });
  it('should return default state for unlisted initial state/action type', () => { //eslint-disable-line
    const action = {
      type: 'FETCH_ME',
    };
    const newState = usersReducer(undefined, action);
    expect(newState.users).toEqual([]);
  });

  it('should update user in the store', () => {
    const initialUsersState = {
      ...initialState,
      users: [
        ...initialState.users,
        { id: 3, last: 'fredix', answer: 'yiga' }
      ]
    };
    const action = {
      type: UPDATE_USER_SUCCESS,
      user: {
        id: 1,
        lastName: 'fred',
        firstName: 'yiga'
      }
    };
    const newState = usersReducer(initialUsersState, action);
    expect(newState.users[0].lastName).toEqual('fred');
  });

  it('should delete user in the store', () => {
    const action = {
      type: DELETE_USER_SUCCESS,
      id: users[0].id
    };

    const newState = usersReducer(initialState, action);
    expect(newState.users).toEqual([]);
  });
});
