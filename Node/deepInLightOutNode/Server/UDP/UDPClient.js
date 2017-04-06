var dgram = require('dgram')

var mes = new Buffer('哈哈哈哈')
var client = dgram.createSocket('udp4')

client.send(mes, 0, mes.length, 8088, 'localhost', function (err, bytes) {
	client.close()
})