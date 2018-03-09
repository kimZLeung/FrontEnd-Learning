var fs = require('fs'),
    http = require('http'),
    url = require('url'),
    path = require('path');
    // xxoo = require('./MyModule/xxoo')  自己写的接口方法之类的
    // ...


/**
 * [MyServer]
 * @param  {[type]} request   [前端发过来的请求，带有url，method之类的信息]
 * @param  {[type]} response) {		var       root [返回的信息，可set状态码什么之类的]
 * @return {[type]}           [return出来的是server的实例，可以直接接上listen端口的函数]
 */
http.createServer(function(request, response) {
	// 获取文件当前根路径，默认为当前目录，也可以通过命令行传参
	var root = path.resolve(process.argv[2] || '.');
	var reUrl = url.parse(request.url).pathname;
	// 获取完整的文件路径，这样来读取文件
	var filePath = path.join(root, reUrl);

	fs.stat(filePath, function(err, stat) {
		if(err) {	// 找不到文件
			switch(reUrl) {		// 判断是否为请求接口
				case '/getSomething': 
					response.writeHead(200);
					response.end('~haha');
					break;
				default: 
					console.log('404', request.url);
					response.writeHead(404, {'Content-Type': 'text/html'});
					// response.writeHead(404);
					response.end('<html><head><title>404</title></head><body><h1>404</h1> <h1>Not Found</h1></body></html>');
					break;
			}
		} else {	// 判断是否为目录
			if(stat.isDirectory()) {
				var indexPath = path.join(filePath, '/index.html');
				fs.stat(indexPath, function(err, stat) {	// 判断是否有index.html
					if(err) {
						console.log('404', request.url);
						response.writeHead(404, {'Content-Type': 'text/html'});
						response.end('<html><head><title>404</title></head><body><h1>404</h1> <h1>Not Found</h1></body></html>');
					} else {
						// 若有index.html则重定向到index.html的地址
						console.log('301', reUrl);
						response.writeHead(301, {
							'Location': reUrl + 'index.html'
						})
						response.end()
					}
				})
			}
			else if(stat.isFile()) {	// 直接返回
				console.log('200', request.url);
				response.writeHead(200, {
					'Set-Cookie': 'userid=kimz'
				});
				fs.createReadStream(filePath).pipe(response);
			}
		}
	});
}).listen(808, function() {		// 监听808端口（不要问为什么是808我也不知道）
	console.log('server is running on http://127.0.0.1:808/');
});		// 成功后调用回调函数命令行打印地址信息