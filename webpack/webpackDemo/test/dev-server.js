var config = require('./webpack.config.js')
var devm = require('webpack-dev-middleware')
var hotm = require('webpack-hot-middleware')
var webpack = require('webpack')
var express = require('express')

var compiler = webpack(config)

var app = express()

var hot = hotm(compiler)

app.use(devm(compiler, {
	publicPath: '/'
}))

app.use(hot)

app.use(express.static('public'))

app.listen(8000, function () {
	console.log('listening at 8000')
})
