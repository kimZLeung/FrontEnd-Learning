var webpack = require('webpack');
var path = require('path');
var config = require('../dev/config.js');
// var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    app: ['./src/index.js', config.dev.hotMiddlewareScript]
  },
  output: {
    path: config.dev.path,
    publicPath: config.dev.publicPath,   // 引用加载文件时，遇到通过相对路径或者绝对路径引用的文件会用这个指定的路径来重新合成
    filename: 'bundle.js'
  },
  externals: {
    io: 'io'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react', 'stage-0']
			}
    }, {
      test: /\.css$/,
			loader: 'style!css?modules'
    }]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
	]
}
