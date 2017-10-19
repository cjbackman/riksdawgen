import { REQUEST_MEMBERS, RECEIVE_MEMBERS, REQUEST_MEMBER, RECEIVE_MEMBER } from './actionTypes';
import { Config } from '../config';

const requestMembers = () => {
  return {
    type: REQUEST_MEMBERS,
  }
}

const receiveMembers = (members) => {
  return {
    type: RECEIVE_MEMBERS,
    members
  }
}

export const fetchMembers = () => {
  return dispatch => {
    dispatch(requestMembers());

    return fetch(Config.API_URL + '/api/personlista')
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json => dispatch(receiveMembers(json.persons)));
  }
}

const requestMember = () => {
  return {
    type: REQUEST_MEMBER,
  }
}

const receiveMember = (member) => {
  return {
    type: RECEIVE_MEMBER,
    member
  }
}

export const fetchMember = (id) => {
  return dispatch => {
    dispatch(requestMember());

    return fetch(Config.API_URL + '/api/person/' + id)
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json => dispatch(receiveMember(json)));
  }
}