﻿# Node Stream

标签（空格分隔）： Node

---

## Node-Stream

> `Node`里面有四种`stream` .是`Readable`，`Writable`，`Duplex`，`Transform`。所有的流都继承了EventEmitter，所以都可以使用简单的事件机制。

- Readable：可读流，可以通过监听`data`事件来启动流动模式，也可以用`pipe`来启动流动模式，可以用`stream.resume()`来启动流动模式（这个可以只监听end事件）。什么都不做的时候是暂停模式（默认），暂停模式下可以用`read`方法来读取数据...就是用三种方式来驱动可读流。
- Writeable：可写流，用于接受一个可读流的写入。可以用`readStream.pipe(WriteStream)`用`pipe`来接通两个流的信息，也可以通过调用`WriteStream.write(data, encoding, callback)`来写数据
- Transform：转换流。相当于一个中转站`readStream.pipe(transformStream).pipe(writeStream)`
- Duplex：同时可读可写，可以使可读流，也可以是可写流。`Duplex.pipe(transformStream).pipe(Duplex)`
> 以上的`Stream`监听`data`事件来启动，或者用`pipe`接起来自动启动，都会调用内部的`_read`或者`_write`方法，内部的方法会emit`data`事件，触发监听`data`事件时传进去的函数。
需要注意的是通过监听`data`事件启动流动模式的方式并不是不好，只是无法控制读取速度。`pipe`与监听`data`事件的不同之处就是，如果使用`pipe`连接一个可读流和可写流的时候，只有在文件`stream`链末端的消费者需要数据时才会进行读取

## 一个简单的继承`Transform`流的流

    var Transform = require('stream').Transform;
    util.inherits(TestStream, Transform);
    
    function TestStream(options) {
      Transform.call(this, options);
    }
    
    TestStream.prototype._transform = function(chunk, encoding, cb) {
      this.push(chunk+'|');
      cb();     // 相当于emit data事件
    };
    
    TestStream.prototype._flush = function(cb) {
      cb('end');    // // 相当于emit end事件
    };

---
## 通过readable读取数据的过程

> 这个过程十分复杂
在拼接好`readable`管道之后，当消耗方开始读取数据时，会调用`read()`方法，关键就在于`read`方法走的过程：
首先`read`方法会去看`doRead`状态量，来确定缓存中的数据是否足够多，如果足够多就不会调用`_read`来向数据源请求，直接从缓存中读取数据或以`data`事件输出。如果调用了`_read`方法，就会从底层拿到数据，然后通过`push`方法放进流（然后判断缓存区是否为空来判断是否以`data`事件立即输出或储存在缓存中）...

> **`readable`事件**是在调用完`_read`后，如果`push`是以异步方式调用的话，就会有一个`readable`事件，标识什么时候`push`进来缓冲区的，然后通过监听这个事件可以立即使用`push`进来的数据。首次监听readable事件时，还会触发一次read(0)的调用，从而引起_read和push方法的调用，从而启动循环

> **流动模式中**：`flow`中每次`read()`都可能触发`push()`的调用，而`push()`中又可能触发`flow()`或`read()`的调用，这样就形成了数据生生不息的流动。

## pipe的背压机制
**pipe**的背压机制是指消耗源的`drain()`事件触发后才再重新启动数据源的`resume()`，也就是所谓的消耗源需要时再从数据源请求。

### 参考：
[node-stream流-gulp实战][1]
[node-stream介绍][2]
[stream进阶篇][3]


  [1]: http://purplebamboo.github.io/2014/11/30/gulp-analyze/
  [2]: https://segmentfault.com/a/1190000000357044
  [3]: http://fe.meituan.com/stream-internals.html