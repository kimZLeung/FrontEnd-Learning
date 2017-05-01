var express = require('express')
var path = require('path')
var fs = require('fs')
global.Vue = require('vue')


var template = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')
var parts = template.split('<div id="app"></div>')
var front = parts[0]
var back = parts[1]

var renderer = require('vue-server-renderer').createRenderer()

var server = express()

server.use('/src', express.static(path.resolve(__dirname, '../src')))

server.get('/', function(req, res) {
  var stream = renderer.renderToStream(require('../src/index')())
  var arr = []
  var len = 0

  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.write(front)

  stream.on('data', function(chunk) {
    arr.push(chunk)
    len += chunk.length
  })

  stream.on('end', function() {
    var bufData = Buffer.concat(arr, len)
    res.write(bufData)
    res.end(back)
    // res.send(front + bufData + back)   // 调用express包装好的send方法貌似会把返回的数据类型默认设为text/html
  })

  stream.on('error', function(err) {
    console.error(err)
    return res.status(500).send('Server Error')
  })
})

server.listen(8080, function() {
  console.log('server listening on port8080')
})
