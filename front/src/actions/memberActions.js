import { REQUEST_MEMBERS, RECEIVE_MEMBERS } from './actionTypes';
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
    .then(json => {
      console.log(json);
      let members = [
        { parti: 'S', tilltalsnamn: 'Janne' },
        { parti: 'M', tilltalsnamn: 'Josef' }
      ];
      dispatch(receiveMembers(members))
    });
  }
}