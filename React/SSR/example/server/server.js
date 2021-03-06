import express from 'express'
import http from 'http'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from '../app/store/configureStore.js'
import { routes } from '../app/route.js'
import renderFullPage from '../app/helper/renderFullPage.js'

const app = express()

/* 托管bundle.js让返回的模板可以直接访问到bundle */
app.use(express.static('dist'))

app.get('*', (req, res) => {
	match({ routes: routes(), location: req.url }, (err, redirectLocation, props) => {
		if(err) {
			res.status(500).send(err.message)
		} else if(redirectLocation) {
			res.redirect(302, redirectLocation.pathname, redirectLocation.search)
		} else if(props) {
			const setStore = configureStore()

			const makeup = renderToString(
				<Provider store={ setStore }>
					<RouterContext { ...props } />
				</Provider>
			)
	
			res.status(200)
			res.end(renderFullPage(makeup, setStore.getState()))
		} else {
			res.status(404).end('404 Not Found')
		}
	})
})

const server = http.createServer(app)

server.listen(3030, () => {
	console.log('Server is listening on port 3030')
})