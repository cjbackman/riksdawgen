import {
  REQUEST_MEMBERS,
  RECEIVE_MEMBERS
} from '../actions/actionTypes.js'

export const memberReducer = (state = {
  members: [],
  isFetching: false
},
action) => {
  switch (action.type) {
    case REQUEST_MEMBERS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_MEMBERS:
      return Object.assign({}, state, {
        isFetching: false,
        members: action.members
      })
    default:
      return state
  }
}
