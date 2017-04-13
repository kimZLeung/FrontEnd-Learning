import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/actionCreator.js'


const About = ({ counter, add, reduce, dispatch }) => {
	const action = bindActionCreators(actions, dispatch)

	return (
		<div>
			<h1>about</h1>
		</div>
	)
}

const mapStateToProps = (state) => (state)

const mapDispatchToProps = (state) => {
	return actions
}

export default connect(mapStateToProps, mapDispatchToProps)(About)