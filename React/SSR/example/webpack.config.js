var webpack = require('webpack')
var path = require('path')

var outputPath = path.join(__dirname, '/dist')
var hehe = path.resolve(__dirname, 'dist')

module.exports = {
	entry: './app/client.js',
	output: {
		path: outputPath,
		publicPath: '/dist',
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: ['es2015', 'react', 'stage-0']
				}
			}],
			exclude: /node_modules/
		}]
	},
	devServer: {
		hot: true,
		publicPath: '/dist'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// 开启全局的模块热替换(HMR)

		new webpack.NamedModulesPlugin(),
		// 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
	],
}