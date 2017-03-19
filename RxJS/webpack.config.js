var webpack = require("webpack")

module.exports = {
	entry: [
		"webpack/hot/dev-server",
		"webpack-dev-server/client?http://localhost:8080",
		"./js/index.js"
	],
	output: {
		path: './dist',
		filename: 'dist.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react'] // 可以把ES6和JSX语法转换过来
			}
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};