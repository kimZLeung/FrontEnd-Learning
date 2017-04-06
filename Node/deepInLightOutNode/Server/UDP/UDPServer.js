var dgram = require('dgram')

var server = dgram.createSocket('udp4')

server.on('message', function (msg, info) {
	console.log(msg.toString(), info.port, info.address)
})

server.on('listening', function () {
	var address = server.address()
	console.log(address.address, address.port)
})

server.bind(8088)