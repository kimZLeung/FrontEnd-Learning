
module.exports = {
	entry: ['app/client.js'],
	output: {
		path: '/dist',
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
	}	
}