var webpack = require('webpack')
var path = require('path')
var BabiliPlugin = require('babili-webpack-plugin')

var outputPath = path.resolve(__dirname, 'dist/')

module.exports = {
  entry: './dist/dist.js',
  // entry: [
  //   'webpack-dev-server/client?http://127.0.0.1:8080',
  //   'webpack/hot/only-dev-server',
  //   './index.js'
  // ],
  // entry: './index.js',
  output: {
    filename: 'final.js',
    path: outputPath
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  // devServer: {
  //   port: 9090,
  //   publicPath: '/dist/'
  // },
  plugins: [
    // new BabiliPlugin(),
    new webpack.optimize.UglifyJsPlugin()
    // new webpack.HotModuleReplacementPlugin()
  ]
}
