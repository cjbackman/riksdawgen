import { combineReducers } from 'redux';
import { memberReducer } from './memberReducer';

export const reducers = combineReducers({
  member: memberReducer
});