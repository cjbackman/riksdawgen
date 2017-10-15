import { combineReducers } from 'redux';
import { menuReducer } from './menuReducer';
import { memberReducer } from './memberReducer';

export const reducers = combineReducers({
  menu: menuReducer,
  member: memberReducer
});