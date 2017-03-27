var server = require('./devServer.js');
var io = require('socket.io');

var ioServer = io.listen(server);

/**
 *    给Socket设定事件监听。
 */
ioServer.on('connection', function(sk) {
  console.log('a user come in!')
  sk.on('login', function(data) {
    console.log(data.name + 'has connected')
  })
  sk.on('disconnect', function(data) {
    console.log(data.name + 'has disconnect')
  })
})
