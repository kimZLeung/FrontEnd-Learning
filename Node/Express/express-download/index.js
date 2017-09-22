var express = require('express')
var path = require('path')

var app = express()

var option = {
	root: __dirname + 'express.txt',
	dotfiles: 'deny'
}

app.use('/web', express.static(path.join(__dirname, 'static')))

app.get('/download', function (req, res) {
	res.download('./express.txt', 'yep.txt', function(err) {
		if(err) {
			console.log('error')
		} else {
			console.log('ok')
		}
	})
})

app.get('/sendFile', function (req, res) {
	// res.sendFile('express.txt', option, function (err) {
	// 	if(err) {
	// 		console.log('error')
	// 	} else {
	// 		console.log('ok')
	// 	}
	// })
	res.sendFile(path.join(__dirname, 'express.txt'))
})

app.listen(8011, function (err) {
	if(!err) {
		console.log('server listening at port 8011')
	}
})
