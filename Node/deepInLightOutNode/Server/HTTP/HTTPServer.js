var http = require('http')

http.createServer(function (req, res) {
	req.on('data', function (data) {
		res.writeHead(200)
		res.end('<h1>haha</h1>')
	})
}).listen(8080, function () {
	console.log('server is listening on port 8080')
})