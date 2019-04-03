/* eslint-disable no-undef */
import {
  GET_TAPPED_USERS_SUCCESS,
  GET_TAPPED_USERS_FAILURE,
} from '../../../actions/actionTypes';
import { initialTappedUsers } from '../../../reducers/initialState';
import tappedUserReducer from '../../../reducers/admin/tappedUsersReducer';
import { tappedUsers } from '../../__mocks__/mockAdminUsers';

describe('Tapped Users', () => {
  let newState, action;
  it('should return initial state', () => {
    action = {
      type: "Undifined",
      payload: {},
    };

    expect(tappedUserReducer(initialTappedUsers, action))
      .toEqual(initialTappedUsers);
  });

  it('GET_TAPPED_USERS_SUCCESS', () => {
    action = {
      type: GET_TAPPED_USERS_SUCCESS,
      payload: tappedUsers.data.payload
    };

    newState = tappedUserReducer(initialTappedUsers, action);
    expect(newState.data).toEqual(action.payload);
  });

  it('GET_TAPPED_USERS_FAILURE', () => {
    action = {
      type: GET_TAPPED_USERS_FAILURE,
      payload: 'error',
    };

    newState = tappedUserReducer(initialTappedUsers, action);
    expect(newState.error).toEqual('error');
  });
});
