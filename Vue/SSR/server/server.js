var express = require('express')
var path = require('path')
var fs = require('fs')
global.Vue = require('vue')


var template = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')
var renderer = require('vue-server-renderer').createRenderer()

var server = express()

server.use('/src', express.static(path.resolve(__dirname, '../src')))

server.get('/', function(req, res) {
  renderer.renderToString(
    require('../src/index')(),
    function(err, app) {
      if(err) {
        res.status(500).send('Server Error')
      } else {
        res.send(template.replace('<div id="app"></div>', app))
        // res.send('123')
      }
    }
  )
})

server.listen(8080, function() {
  console.log('server listening on port8080')
})
