var webpack = require('webpack')
var env = require('./env.js').env
var mergeEntry = require('./webApp/util/mergeEntry.js').mergeEntry
var path = require('path')
var outputPath = path.resolve(__dirname, 'webApp/dist')

var now = env()

var config = {
	entry: {

	},
	output: {
		path: outputPath,
		filename: '[name].js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel-loader'],
			exclude: /node_modules/
		}]
	},
	externals: {
		'jq': 'jQuery'
	}
}

/* 可以用 mergeEntry 增加入口文件 */
mergeEntry(config, 'test', './webApp/src/test.js')
mergeEntry(config, 'ask', './webApp/src/ask.js')

if(now === 'dev') {
	config.output.publicPath = '/webApp/dist'
	config.devServer = {
		hot: true,
		inline: true,
		port: 8080,
		publicPath: '/webApp/dist'
	}
	config.plugins = [new webpack.HotModuleReplacementPlugin()]
}

module.exports = config
