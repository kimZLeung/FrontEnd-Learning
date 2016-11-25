var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

// module.exports = {
// 	entry: './main.js',
// 	output: {
// 		filename: 'bundle.js'
// 	},
// 	plugins: [
// 		{
// 			test: /\.css$/,
// 	        loader: 'style-loader!css-loader?modules'
// 	    },
// 	    new OpenBrowserPlugin({
// 	      url: 'http://localhost:8080'
// 	    })
// 	]
// };

module.exports = {
	entry: [
		// 热加载
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:8080',
		'./main.js'
	],
	output: {
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style-loader!css-loader?modules'
		}]
	},
	plugins: [
		new OpenBrowserPlugin({
			url: 'http://localhost:8080'
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
		// 热加载的插件
		new webpack.HotModuleReplacementPlugin()
	],
	externals: {
		'data': 'data'
	}
}