var webpack = require('webpack')
var path = require('path')
var BabiliPlugin = require('babili-webpack-plugin')

var outputPath = path.resolve(__dirname, 'dist/')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'dist.js',
    path: outputPath
  },
  plugins: [
    new BabiliPlugin(),
  ]
}
