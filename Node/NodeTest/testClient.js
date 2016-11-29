var net = require('net');

var time;

var client = net.connect({port: 6060}, function() {
  // for(var i = 0; i<8; i++) {
  //   client.write(i.toString());
  // }
  goSock(client, 8, 0);
  // client.end();
});

client.on('data', function(data) {
  console.log(data.toString());
  // client.end();
});

client.on('end', function() {
  console.log('\n断开与服务器的连接,鸡年大吉');
});

client.on('connect', function() {
  console.log('鸡年准备就绪!');
})

client.on('error', function(error) {
  console.log('EEEEExpection' + '\n' + error)
  client.end()
  // clearTimeout(time)
})

function goSock(client, max, index) {
  if(client) {
    if(index < max) {
      time = setTimeout(function() {       // 感觉是底层做的优化减少请求数量，不设定时器第二次会1234567一起返回来
        client.write(index.toString())
        return goSock(client, max, ++index)
      }, 1000)
    } else {
      return client.end()        // 满了8次返回end断开socket的连接
    }
  } else {
    console.log('服务器祝你鸡年大吉')
    return client.end()
  }
}
