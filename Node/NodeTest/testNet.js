var net = require('net');

var socket = net.createServer(function(conn) {


	conn.on('data', function(data) {
		// if(data) {
			conn.write([
				data,
				'鸡年大吉',
				'Hello World'
			].join('\n'))
		// }
	})
	conn.on('end', function() {					// 监听断开连接的事件 ， 关闭TCP服务器
		console.log('socket中断');
		socket.close();
	})
}).listen(6060, function() {
	console.log('server is listening port 6060');
});
