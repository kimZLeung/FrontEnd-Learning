import chat from './chatReducers.js'
import log from './loginReducer.js'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  log,
  chat
})

export default reducer
