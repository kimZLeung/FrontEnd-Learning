var express = require('express')
var http = require('http')
var sign = require('./mockSign')
var webpack = require('webpack')
var base = require('../webpack.config.js')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')

var app = express()
var server = http.createServer(app)

if(process.env.NODE_ENV == 'dev') {
	// var compiler = webpack(base)
	//
	// app.use(webpackDevMiddleware(compiler, {
	// 	publicPath: base.output.publicPath,
	// 	noInfo: true
	// }))
	// app.use(webpackHotMiddleware(compiler))
} else {
	app.use('/webApp', express.static('webApp'))
}



app.use('/back', function(req, res) {
	var param = req.query
	// var subObj = {
	// 	token: 'weixin',
	// 	timestamp: param.timestamp,
	// 	nonce: param.nonce
	// }
	// var string = raw(subObj)
	// console.log(string)
	// var secString = new jsSHA(string, 'TEXT')
	if(param.echostr) {
		res.write(param.echostr)
		res.end()
	}
})

app.use('/sign', sign)


server.listen(80, function() {
	console.log('Server listening at port 80')
})
