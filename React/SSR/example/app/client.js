import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import configureStore from './store/configureStore.js'
import { routes } from './route.js'
// import createBrowserHistory from 'history/lib/createBrowserHistory'

import { browserHistory } from 'react-router'

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)


ReactDOM.render(
	<Provider store={ store }>
		<Router history = { browserHistory }>
			{ routes() }
		</Router>
	</Provider>,
	document.getElementById('app')
)

// if(module.hot) {
// 	module.hot.accept()
// }