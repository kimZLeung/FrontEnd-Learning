var webpack = require("webpack")


var config = {
	entry: [
		"webpack/hot/dev-server",
		"webpack-dev-server/client?http://localhost:8080",
		"./js/index.js"
	],
	output: {
		path: './dist',
		filename: 'dist.js',
		publicPath: 'dist/'	// 不设publicPath 热替换生成的新的JS文件无法替换上去
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
	// devServer: {
 //        historyApiFallback: true,
 //        hot: false,
 //        inline: true,
 //        grogress: true
 //    },
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}

// if()

module.exports = config