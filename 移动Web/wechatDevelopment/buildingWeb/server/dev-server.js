var webpack = require('webpack')
var devServer = require('webpack-dev-server')
var config = require('../webpack.config.js')
var sign = require('./mockSign/index')
var bodyParser = require('body-parser')

var server = new devServer(webpack(config), {
  port: 80,
  hot: true,
  inline: true,
  publicPath: config.output.publicPath
})

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.use('/back', function(req, res) {
	var param = req.query
	if(param.echostr) {
		res.write(param.echostr)
		res.end()
	}
})

server.use('/sign', sign)

server.listen(80, function() {
  console.log('server listening on 80')
})
