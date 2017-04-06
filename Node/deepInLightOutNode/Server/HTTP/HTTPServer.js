var http = require('http')

http.createServer(function (req, res) {
	console.log(req.method)

	if(req.method === 'POST') {
		var buffers = []
		req.on('data', function (data) {
			buffers.push(data)
		}).on('end', function () {
			var buffer = Buffer.concat(buffers)
			var dataBody = buffer.toString('utf-8')
			// TODO
			res.writeHead(200)
			res.end('HW')
		})
	}
	
	res.writeHead(200)
	res.end('<h1>haha</h1>')
}).listen(8080, function () {
	console.log('server is listening on port 8080')
})