import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducers } from './reducers/index'
import { fetchMembers } from './actions/memberActions'

export const Store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware)
)

Store.dispatch(fetchMembers())