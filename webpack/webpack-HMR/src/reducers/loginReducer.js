import { LOGIN } from '../constants/actionType.js'

const initialState = {}

export default function log(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign(state, {
        rank: 'online',
        name: action.name
      })
      break;
    default:
      return state
  }
}
