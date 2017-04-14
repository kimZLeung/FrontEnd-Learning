var webpack = require('webpack')
var path = require('path')

var outputPath = path.join(__dirname, '/dist')

module.exports = {
	entry: './app/client.js',
	output: {
		path: outputPath,
		publicPath: '/dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loaders: ['react-hot-loader', 'babel-loader'],
			exclude: /node_module/
		}]
	},
	devServer: {
		hot: true,
		inline: true,
		historyApiFallback: true,
		publicPath: '/dist'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// 开启全局的模块热替换(HMR)

		new webpack.NamedModulesPlugin(),
		// 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
	],
}