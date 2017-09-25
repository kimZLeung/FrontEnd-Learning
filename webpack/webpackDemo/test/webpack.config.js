var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: './index.js',
  // entry: ['webpack-dev-server/client?http://127.0.0.1:8080', 'webpack/hot/only-dev-server', './index.js'],
  output: {
    filename: 'dist.js',
    path: __dirname
  },
  // devtool: 'inline-source-map',
  devServer: {
    port: 8888
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
  ]
}