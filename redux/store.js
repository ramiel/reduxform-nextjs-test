import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createForms } from 'react-redux-form';
import ApiClient from '../libs/apiClient';

import users from './reducers/users';

const reducers = {
  users,

  // Redux store which handle forms
  ...createForms({
    user: {},
  }),
};

const initStore = initialState => createStore(
  combineReducers(reducers),
  initialState,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware.withExtraArgument(new ApiClient()),
    ),
  ),
);

export default initStore;
