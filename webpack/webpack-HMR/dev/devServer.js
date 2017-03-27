var express = require('express');
var http = require('http');
var config = require('./config.js');


var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackBase = require('../build/index.js');

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
var HotMiddleware = webpackHotMiddleware(compiler);

compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 发布事件
        HotMiddleware.publish({ action: 'changeHtml' })
        cb()
    })
})

/**
 * [用webpackDevMiddleware处理本地静态资源的返回]
 * @type {[type]}
 */
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.dev.publicPath,
  noInfo: true,
  stats: {
    colors: true
  }
}));

app.use(HotMiddleware);

server.listen(config.dev.port, function() {
  console.log('Server start on ' + config.dev.port)
});

module.exports = server
