# Buffer
---

## 为什么需要Buffer
> 在前端的环境下，简单地做一些字符串操作便可以满足大部分业务需求，不像后台那样，有文件和网络的IO。前端开发者们可能对后台这些相关操作不太熟悉：处理网络协议，操作数据库，处理图片，接收上传的文件之类的操作，这些网络流和文件的操作在`Node`中是比较常见的。而处理二进制的字符串数据，`Buffer`对象就会发挥它的作用。

---
## Buffer的特性
> `Buffer`不像是其他对象那样由V8来分配内存。而是通过`Node`的`C++`层面实现内存申请的，所以`Buffer`占用的是堆外内存

``` javascript
$ node
> process.memoryUsage()		// 这样就可以打印出rss heapTotal 和 heapUsed
{ rss: 19914752, heapTotal: 9473104, heapUsed: 4807656 } 	// rss是resident set size 就是进程的常驻内存，heapTotal是堆中总共申请的内存量，heapUsed是堆中使用中的内存量

/*
 * 常驻内存比堆的总共申请的内存量大，是因为Node中的内存使用并非都是由V8分配的，另外那些内存可能是通过C++进行分配的，比如Buffer对象占用的内存
 *
 */
```

> `Buffer`可以通过`new Buffer(str)`或者`buf.write(str)`把字符串转为`Buffer`，也可以通过`toString()`方法把`Buffer`转化为字符串（当然在转化过程中支持编码格式的转换）

`Buffer`支持的编码

- ASCII
- UTF-8
- UTF-16LE/UCS-2
- Base64
- Binary
- Hex

我们需要知道的是：`Buffer`是由一堆16进制的两位数组成的，即0到225的数值，我们来看一看`Buffer`对象

``` javascript
<Buffer e5 ba 8a e5 89 8d ...>

var content = fs.createReadStream('xx.txt')
var str = ''
content.on('data', function(res){
	str += res
})

content.on('end', function() {
	console.log(str)
})
```

> 由于`Buffer`其实是一堆16进制的两位数，三个元素代表一个汉字，所以每一次返回的一段`res`中可能会截断某个字。所以不能用这样的方式读取

``` javascript
var content = fs.createReadStream('xx.txt')
var str = []
var size = 0
content.on('data', function(res){
	str.push(res)
	size += res.length
})

content.on('end', function() {
	var buf = Buffer.concat(str, size)
	buf.toString('utf-8')
})
```


---
## 内存问题
> 在`Node`的后台里面，内存的问题和前端也有很大的不同。

我们在进行前端开发的时候，从来没有考虑过内存泄漏的问题，因为在浏览器端，我们不可能像服务器端那样有成千上万个流量，所以也不需要考虑过多内存的限制和释放。

但是当我们处于服务器端，`Node`对于内存泄漏十分敏感，内存泄漏归根结底就是一些对象没有被回收到，导致内存爆炸。

- 作缓存限制
- 使用`Redis`和`Memcached`做缓存（这两个可以帮助`Node`做进程外的缓存，这样的缓存既可以跨进程访问缓存，又不会在不同进程里面出现相同的缓存数据）
- 关注好队列的状态，最好对队列的长度进行限制或制定超时处理，以免队列的消费速度跟不上队列的增长速度导致内存溢出。