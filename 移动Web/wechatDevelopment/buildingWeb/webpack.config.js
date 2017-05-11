var webpack = require('webpack')
var mergeEntry = require('./webApp/util/mergeEntry.js').mergeEntry
var path = require('path')
// var HtmlWebpackPlugin = require('html-webpack-plugin')
var outputPath = path.resolve(__dirname, 'webApp/dist')
var configData = require('./config')

var config = {
	entry: {
		vendor: ['vue', 'axios']
	},
	output: {
		path: configData.path,
		filename: '[name].js',
		chunkFilename: '[name].chunk.js'
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			'weFetch': path.resolve(__dirname, 'webApp/util/fetch.js'),
			'wxApi': path.resolve(__dirname, 'webApp/util/wxApi.js')
		}
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel-loader'],
			exclude: /node_modules/
		}, {
			test: /\.vue$/,
			loaders: ['vue-loader'],
			exclude: /node_modules/
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
      'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV || '"dev"')
			}
    }),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
		// 	minChunks: function(data) {
		// 		var res = data.resource
		// 		return res && res.indexOf('node_modules') >= 0 && /\.js$/.test(res)
		// 	}
		}),
		// new HtmlWebpackPlugin({
		// 	filename: 'list.html',
		// 	template: 'dev.ejs',
		// 	inject: true,
		// 	chunks: ['list', 'vendor']
		// }),
		// 可以增加别的html
	]
}


/* 可以用 mergeEntry 增加入口文件 ，开发模式merge对应模块的Entry */
mergeEntry(config, 'list', ['./webApp/src/list/index.js'])

if(process.env.NODE_ENV === 'dev') {
	config.devtool = 'inline-source-map'
	config.output.publicPath = configData.publicPath;
	for(var i in config.entry) {
		config.entry[i].unshift('webpack/hot/dev-server', 'webpack-dev-server/client?' + configData.host + ':' + configData.port)
	}
	// config.devServer = {
	// 	port: 80,
	// 	inline: true,
	// 	hot: true,
	// 	publicPath: config.output.publicPath
	// };
	// config.output.path = '/'
	// config.output.publicPath = '/';
	(config.plugins || []).push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin())
} else {

}

module.exports = config
