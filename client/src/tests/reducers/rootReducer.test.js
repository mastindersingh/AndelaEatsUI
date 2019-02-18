import { createStore } from 'redux';
import rootReducer from '../../reducers/rootReducer';
import initialState from '../../reducers/initialState';

const store = createStore(rootReducer);

/* 
global jest 
expect 
*/
describe('combinedReducer', () => {
  it('return auth state value', () => {
    expect(store.getState().userReducer).toEqual(initialState.activeUser);
  });
});
