var webpack = require('webpack')
var path = require('path')

var outputPath = path.resolve(__dirname, 'dist/')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'dist.js',
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
    new webpack.optimize.UglifyJsPlugin()
  ]
}
