var net = require('net')

var server = net.createServer(function (socket) {
	socket.on('data', function (data) {
		socket.write('hi')
		console.log(data.toString())
	})

	socket.on('end', function () {
		console.log('bye')
	})

	socket.write('welcome:\n')
	// socket.pipe(socket)
})

server.listen(8088, function () {
	console.log('server bound')
})