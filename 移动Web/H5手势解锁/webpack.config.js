var webpack = require('webpack')
var path = require('path')

var outputPath = path.resolve(__dirname, 'dist')

module.exports = {
	entry: './index.js',
	output: {
		path: outputPath,
		publicPath: '/dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loaders: ['babel-loader'],
			exclude: /node_modules/
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		hot: true,
		inline: true,
		port: 8080,
		publicPath: '/dist'
	}
}