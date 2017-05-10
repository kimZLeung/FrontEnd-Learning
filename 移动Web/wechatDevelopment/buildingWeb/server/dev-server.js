var webpack = require('webpack')
var devServer = require('webpack-dev-server')
var config = require('../webpack.config.js')
var sign = require('./mockSign')


var server = new devServer(webpack(config), {
  port: 80,
  hot: true,
  inline: true,
  publicPath: config.output.publicPath
})

server.use('/back', function(req, res) {
	var param = req.query
	if(param.echostr) {
		res.write(param.echostr)
		res.end()
	}
})

server.use('/sign', function(req, res) {
  sign(req, res)
})

server.listen(80, function() {
  console.log('server listening on 80')
})
