import { actions as formActions } from 'react-redux-form';

export const actions = {
  SET_USER_LIST: 'SET_USER_LIST',
  FILTER_USER_LIST_BY: 'FILTER_USER_LIST_BY',
  SET_VISIBLE_LIST: 'SET_VISIBLE_LIST',
  UNFILTER_USER_LIST: 'UNFILTER_USER_LIST',
  UPDATE_USER: 'UPDATE_USER',
  FECTH_USERS: 'FECTH_USERS',
};

// ACTIONS
export const setUserList = (users) => ({
  type: actions.SET_USER_LIST,
  list: users,
});

export const updateUser = user => ({
  type: actions.UPDATE_USER,
  user,
});

export const filterUserListBy = (search, property, wrapper) => ({
  type: actions.FILTER_USER_LIST_BY,
  search,
  property,
  wrapper,
});

export const setVisibleList = (users) => ({
  type: actions.SET_VISIBLE_LIST,
  users,
});

export const unfilterUserList = () => ({
  type: actions.UNFILTER_USER_LIST,
});

export const fetchUsers = () => (dispatch, _, client) => client.users.list()
  .then(users => {
    dispatch(setUserList(users));
    return users;
  });

export const fetchUser = id => (dispatch, _, client) => client.users.get(id)
  .then(user => {
    dispatch(formActions.load('user', user));
    return user;
  });

export const saveUser = user => (dispatch, _, client) => client.users.upsert(user)
  .then(updatedUser => {
    dispatch(formActions.load('user', updatedUser));
    return updatedUser;
  });

export const searchUser = ({ username, nickname, name, q }) => (dispatch, _, client) =>
  client.users.search({ username, nickname, name, q })
    .then(users => {
      dispatch(setVisibleList(users));
      return users;
    });

