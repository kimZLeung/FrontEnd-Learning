### Node多线程

#### cluster模块 

Node提供了`cluster`模块来帮助我们创建多线程，榨干CPU

---

#### cluster模块用法

```js
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // 创建子线程，当调用cluster.fork()之后，程序会创建一个线程，并重新运行，这时cluster.isMaster就被设置为false了。我们就主要通过这个变量来判断当前线程是不是子线程的
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  // 这里属于子线程，每一个子线程这样建起来一个服务器，可以监听同一个端口，不会产生冲突
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
  }).listen(8000);
}
```

---

#### 线程间的通信

> 当线程被创建之后，他们彼此之间是没有共享内存或者数据的。所有的数据交换可以通过在对应子线程中通过`cluster.worker`获取到当前的子线程对象，通过`worker.send`发送子线程的数据 这个数据可以在主线程中通过 `worker.on('message',handler)` 获取到，并且可以在主线程中调用对应的 `worker.send` 来向对应线程发送数据，对应子线程中可以使用`worker.on('message', handler)` 来获取数据

需要通过主线程去协调转发，因为每个子线程无法获取其他子线程的引用，发送的信息也只能发给主线程。所以只能通过主线程去协调沟通

其实更加一般的解决方案应该是通过外部维护一个数据库来进行信息交流沟通。

---

#### cluster.worker和cluster.workers

> 前者是一份worker对象的引用，只能在子线程里使用。后者是在主线程下对当前可用子线程的一个Object

