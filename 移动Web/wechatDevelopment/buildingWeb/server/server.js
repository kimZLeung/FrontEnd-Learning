var express = require('express')
var http = require('http')

var app = express()
var server = http.createServer(app)

app.use(express.static('webApp'))

server.listen(3030, function() {
	console.log('Server listening at port 3030')
})