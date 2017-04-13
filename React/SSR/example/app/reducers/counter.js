import * as types from '../constant/actionType.js'

/*const initialState = {
	num: 0
}*/

const initialState = 0

const counter = (state = initialState, action) => {
	switch(action.type) {
		case types.PLUS:
			/*return Object.assign(state, {
				num: state + action.num
			})*/
			return state + action.num
		case types.REDUCE:
			/*return Object.assign(state, {
				num: state - action.num
			})*/
			return state - action.num
		default:
			return state
	}
}

export default counter