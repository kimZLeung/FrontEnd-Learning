import * as type from '../constants/actionType.js'

export function addChat(text) {
  return {
    type: type.ADD_CHAT,
    text
  }
}

export function delChat(id) {
  return {
    type: type.DEL_CHAT,
    id
  }
}

export function log(username) {
  return {
      type: type.LOGIN,
      username
  }
}
