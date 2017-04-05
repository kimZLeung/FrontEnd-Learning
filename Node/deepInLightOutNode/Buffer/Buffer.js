// console.log(Buffer)
var fs = require('fs')

var show = function() {
	var mem = process.memoryUsage()
	var format = function(data) {
		return (data / 1024 / 1024).toFixed(2) + 'MB'
	}
	console.log('Process: heapTotal ' + format(mem.heapTotal) + ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss))
	console.log('-----------------------------------------------------')
}

var useMem = function() {
	var size = 20 * 1024 * 1024
	var arr = new Buffer/* Array */(size)
	for(var i = 0; i < size; i++) {
		arr[i] = 0
	}
	return arr
}

// var total = []

// for(var j = 0; j < 15; j++) {
// 	show()
// 	total.push(useMem())
// }
// show()


// var content = fs.createReadStream('haha.md', {highWaterMark: 6})
// var str = ''
// content.on('data', function(res){
// 	str += res
// 	console.log(res)
// })

// content.on('end', function() {
// 	console.log(str)
// })


// var content = fs.createReadStream('haha.md', {highWaterMark: 5})
// var str = []
// var size = 0
// content.on('data', function(res){
// 	str.push(res)
// 	size += res.length
// })

// content.on('end', function() {
// 	var buf = Buffer.concat(str, size)
// 	var result = buf.toString('utf-8')
// 	console.log(buf)
// })