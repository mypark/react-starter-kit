import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';

export default (apollo) => {
  return combineReducers({
    user,
    runtime,
    apollo,
  });
};
