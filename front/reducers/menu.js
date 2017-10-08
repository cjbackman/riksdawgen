import { TOGGLE_SIDEBAR } from '../actions/actionTypes';

export const menu = (state = { showSidebar: true }, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      console.log(action.type);
      return Object.assign({}, state, {
        showSidebar: !state.showSidebar
      });
    default:
      return state;
  }
}