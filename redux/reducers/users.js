import cloneDeep from 'lodash.clonedeep';
import { actions } from '../actions/users';

const initialState = {
  list: [],
  visibleList: [],
};

const filterByProperty = (list, search, property, wrapper = value => value) => {
  const reg = new RegExp(search, 'gi');
  return list.map((record) => {
    const match = record[property] && record[property].match(reg);
    if (!match) {
      return null;
    }
    return {
      ...record,
      [property]: record[property].split(reg).map((text, i) => (
        i > 0 ? [wrapper(match[0]), text] : text
      )),
    };
  }).filter(record => !!record);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_USER_LIST:
      return {
        ...state,
        list: action.list,
        visibleList: cloneDeep(action.list),
      };

    case actions.FILTER_USER_LIST_BY:
      // Do the search and update action.list
      return {
        ...state,
        visibleList: filterByProperty(state.list, action.search, action.property, action.wrapper),
      };

    case actions.UNFILTER_USER_LIST:
      return {
        ...state,
        visibleList: cloneDeep(state.list),
      };

    case actions.SET_VISIBLE_LIST:
      return {
        ...state,
        visibleList: action.users,
      };

    case actions.UPDATE_USER:
      // const list = state.list;
      return state;
    default: return state;
  }
};

export default reducer;
