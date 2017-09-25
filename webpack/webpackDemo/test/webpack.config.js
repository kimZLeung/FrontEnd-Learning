var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // entry: ['webpack-hot-middleware/client', './index.js'],
  // entry: ['webpack-dev-server/client?http://127.0.0.1:8888', 'webpack/hot/only-dev-server', './index.js'],
  entry: './index.js',
  output: {
    filename: 'dist.js',
    publicPath: '/',
    path: __dirname
  },
  // devtool: 'inline-source-map',
  devServer: {
    port: 8888
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   title: 'haha'
    // })
  ]
}