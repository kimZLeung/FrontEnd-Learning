var http = require('http')
var routerHandler = require('./router.js').routerHandler
var url = require('url')

routerHandler.use('/haha', function(req, res) {
	res.write('haha')
})

routerHandler.deepUse('/haha', 'haha', function(req, res) {
	res.write('haha')
})

http.createServer(function (req, res) {

	var pathName = url.parse(req.url).pathname

	if(req.method === 'POST') {
		var buffers = []
		req.on('data', function (data) {
			buffers.push(data)
		}).on('end', function () {
			var buffer = Buffer.concat(buffers)
			var dataBody = buffer.toString('utf-8')
			res.writeHead(200)
			routerHandler.scanRoute(pathName, req, res, dataBody)
			res.end('HW')
		})
	} else {
		res.writeHead(200)
		routerHandler.scanRoute(pathName, req, res)
		res.end('HW')
	}
	
}).listen(8080, function () {
	console.log('server is listening on port 8080')
})