import * as types from '../constant/actionType.js'

export const add = (num) => ({
	type: types.PLUS,
	num
})

export const reduce = (num) => ({
	type: types.REDUCE,
	num
})