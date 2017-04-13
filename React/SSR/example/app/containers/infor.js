import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/actionCreator.js'


const Infor = ({ counter, dispatch }) => {
	const action = bindActionCreators(actions, dispatch)
	return (
		<div>
			<h2>{ counter }</h2>
			<button onClick={ (e) => {
				action.add(2)
			} }>+</button>
			<button onClick={ (e) => {
				action.reduce(2)
			} }>-</button>
		</div>
	)
}

const mapStateToProps = (state) => (state)

const mapDispatchToProps = (state) => (actions)

export default connect(mapStateToProps)(Infor)
