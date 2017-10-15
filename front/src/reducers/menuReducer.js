import { TOGGLE_SIDEBAR } from '../actions/actionTypes';

export const menuReducer = (state = { showSidebar: false }, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        showSidebar: !state.showSidebar
      });
    default:
      return state;
  }
}