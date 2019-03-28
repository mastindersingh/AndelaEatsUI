import { initialUser } from "../../../reducers/initialState";
import adminUserReducer from "../../../reducers/admin/adminUserReducer";

import {
  ADD_ADMIN_USER_FAILURE,
  ADD_ADMIN_USER_SUCCESS,
  GET_ADMIN_USER,
  GET_ALL_ADMIN_USERS
} from "../../../actions/actionTypes";

describe('Admin User Reducer',()=>{
  it('should update role',()=>{
    const action = {
      type: GET_ADMIN_USER,
      payload: 1
    };
    const newState = adminUserReducer(initialUser, action);
    expect(newState.role).toEqual(action.payload);
  });

  it('should update admin users',()=>{
    const action = {
      type: GET_ALL_ADMIN_USERS,
      payload: ['1','2']
    };
    const newState = adminUserReducer(initialUser, action);
    expect(newState.adminUsers).toEqual(action.payload);
  });

  it('should update message',()=>{
    const action = {
      type: ADD_ADMIN_USER_SUCCESS,
      message: "successfully done"
    };
    const newState = adminUserReducer(initialUser, action);
    expect(newState.message).toEqual(action.message);
  });

  it('should update error',()=>{
    const action = {
      type: ADD_ADMIN_USER_FAILURE,
      message: "successfully done"
    };
    const newState = adminUserReducer(initialUser, action);
    expect(newState.error).toEqual(action.message);
  });

});
