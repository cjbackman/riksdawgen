import fetch from 'isomorphic-fetch'
import { REQUEST_MEMBERS, RECEIVE_MEMBERS } from './actionTypes'
import { Config } from '../config'

const requestMembers = () => {
  return {
    type: REQUEST_MEMBERS
  }
}

const receiveMembers = members => {
  return {
    type: RECEIVE_MEMBERS,
    members
  }
}

export const fetchMembers = () => {
  console.log('GET MEMBERS')
  return dispatch => {
    dispatch(requestMembers())

    return fetch(Config.API_URL + '/api/members/')
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json => dispatch(receiveMembers(json.members)))
  }
}
