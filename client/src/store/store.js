import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers/rootReducer';

import { tokenValidator } from '../helpers/tokenValidation';

const initialState = {};
const middlewares = process.env.NODE_ENV === 'production'
  ? [tokenValidator, thunk]
  : [tokenValidator, thunk, reduxImmutableStateInvariant()];

/**
 * @export
 * @param {any} {}
 * @returns {object} object
 */
const configureStore = () => {
  const middleware = process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares);

  return createStore(
    rootReducer,
    initialState,
    middleware
  );
};
export default configureStore;
