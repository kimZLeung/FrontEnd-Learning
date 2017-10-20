var express = require('express')
var upload = require('./fileupload')
var path = require('path')

var app = express()

app.use(express.static('static'))

/**
 * single传入的参数是表单传过来的对应的键
 *
 * 除了single
 * 
 * 还可以使用array('photos', 10)实现多文件上传
 *
 * 可以用field([{name: 'photos', maxCount: 10}, {name: 'haha', maxCount: 12}])
 * 实现多键多文件上传
 */
app.use('/upload', upload.single('cc'), function (req, res, next) {
    if (req.file) {
        console.log(req.file)
        console.log(req.body)
        res.redirect(301, '../shower.html#' + req.file.filename)
    }
})

app.listen(8000, function () {
	console.log('listening on 8000')
})
