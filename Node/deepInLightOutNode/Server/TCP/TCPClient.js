var net = require('net')

var client = net.connect({port: 8088}, function () {
	console.log('on')
	client.write('hahah')
})

client.on('data', function (res) {
	console.log(res.toString())
})
