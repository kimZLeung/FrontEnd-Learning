import { ADD_CHAT, DEL_CHAT } from '../constants/actionType.js'

const initialState = [];

export default function chat(state = initialState, action) {
  switch (action.type) {
    case ADD_CHAT:
      return [
        {
          id: state.reduce((prevMax, cur) => Math.max(prevMax, cur.id), -1) + 1,
          text: action.text
        },
        ...state
      ]
      break;
    case DEL_CHAT:
      return state.filter(chat => chat.id !== action.id)
      break;
    default:
      return state
  }
}
