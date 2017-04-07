
var path = require('path')

var ENTRY = path.resolve(__dirname, 'index.js')

module.exports = {
	entry: ['./index.js'],
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	// devtool: 'source-map',
	module: {
		rules: [{
			test: /\.jsx?$/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: ['es2015', 'react', 'stage-0'] // 可以把ES6和JSX语法转换过来
				}
			}],
			exclude: /node_modules/
		}]
	},
	// devServer:{
	// 	historyApiFallback: true,
	// 	hot: true,
	// 	inline: true,
	// 	port: 8080
	// }
}