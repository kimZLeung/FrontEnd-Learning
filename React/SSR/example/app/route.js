import App from './containers/app.js'
import Infor from './containers/infor.js'
import About from './containers/about.js'
import { Route } from 'react-router'
import React from 'react'

const routes = () => {
	return (
		<Route path='/' component={App}>
			<Route path='Infor' component={Infor} />
			<Route path='About' component={About} />
		</Route>
	)
}

export { routes }