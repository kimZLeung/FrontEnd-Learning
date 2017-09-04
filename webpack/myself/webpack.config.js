var path = require('path')
var kimzPlugin = require('./plugins/kimz-plugins.js')
var outputPath = path.resolve(__dirname, 'dist')

module.exports = {
	entry: './src/test-1.js',
	output: {
		path: outputPath,
		filename: 'dist.js'
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', 'json', '.jsx', '.css']
	},
	module: {
		rules: [{
			test: /\.js/,
			exclude: [
				/node_modules/,
				path.resolve(__dirname, 'lib')
			],
			use: [{
				loader: './loaders/kimz-loader.js',
				options: {
					haha: 'this is kimz s loader'
				}
			}]
		}]
	},
	plugins: [
		new kimzPlugin({
			haha: ' - kimz !'
		})
	]
}