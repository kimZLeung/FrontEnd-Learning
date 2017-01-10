var express = require('express');
var http = require('http');
var config = require('./config.js');


var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackBase = require('../config/index.js');

var app = express();
var server = http.createServer(app);

/**
 *    利用express的静态托管很方便地进行本地文件地返回
 */
// app.use('/', express.static('src'));

/**
 * [使用webpackDevMiddleware和webpackHotMiddleware中间件去搭建一个热加载的dev-server代替webpack-dev-server]
 * @type {[type]}
 */
var compiler = webpack(webpackBase);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.dev.publicPath,
  noInfo: true,
  stats: {
    colors: true
  }
}));

app.use(webpackHotMiddleware(compiler));

server.listen(config.dev.port, function() {
  console.log('Server start on ' + config.dev.port)
});

module.exports = server
