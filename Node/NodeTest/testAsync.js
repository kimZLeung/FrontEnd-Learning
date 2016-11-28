var http = require('http');
var domain = require('domain');

function asyncA(request, callback) {
	// 666
	request(xxx, function(data) {
		callback(data)
	})
}



function async(request, callback) {
	// 666
	asyncA(request, function(data) {
		// 666
		asyncB(request, function(data) {
			// 666
			callback(data);
		});
	});
}

/**
 * 因为node的最大特点是异步的处理
 * 但是异步跟同步有很大的差别。
 * 
 * 1、异步的数组遍历不能像同步编程那样一次for循环轻松愉快
 * 它要做到在成功的回调里进去下一个下标的元素
 * 
 * 2、异步的异常处理更加麻烦，因为每进一次回调函数就会使try...catch
 * 失去对这部分回调的异常捕捉。于是node采用了一种error first的参数
 * 形式。但是每次都对第一个参数进行if()判断的话会使代码显得冗长难读
 * 所以可以通过process对象进行全局的错误捕捉。也可以require进一个domain模块
 * 然后创建子域，对子域的所有错误进行捕捉。这样能比较好地定位异常
 */

http.createServer(function(request, response) {
	var d = domain.create();

	d.on('error', function() {		// 在这个子域里面全局catch异步错误
		response.writeHead(500);
		response.end('Server is error');
	})

	d.run(function() {				// 调用run方法启动这个域运行的代码的入口点
		async(request, funtion(data) {
			response.writeHead(200);
			response.end(data);		// 这样可以比较方便地不用每次用err first来判断错误，避免了冗长的代码块
		})
	})
})


/*
	全局捕获异常
 */
process.on('uncaughtException', function (err) {
    console.log('Error: %s', err.message);
});