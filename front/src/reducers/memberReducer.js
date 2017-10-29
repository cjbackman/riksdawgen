import {
  REQUEST_MEMBERS,
  RECEIVE_MEMBERS,
  REQUEST_MEMBER,
  RECEIVE_MEMBER
} from '../actions/actionTypes.js'

export const memberReducer = (state = {
  member: null,
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
    case REQUEST_MEMBER:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_MEMBER:
      return Object.assign({}, state, {
        isFetching: false,
        member: action.member
      })
    default:
      return state
  }
}
