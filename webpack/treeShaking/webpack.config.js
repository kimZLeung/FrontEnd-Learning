var webpack = require('webpack')
var path = require('path')
var BabiliPlugin = require('babili-webpack-plugin')

var outputPath = path.resolve(__dirname, 'dist/')

module.exports = {
  entry: './dist/dist.js',
  output: {
    filename: 'final.js',
    path: outputPath
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
    // new BabiliPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
