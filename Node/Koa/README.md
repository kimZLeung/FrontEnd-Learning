# Koa的一小部分源码

---
> 去看了下`Koa`的一小部分源码，了解了一下`Koa`的中间件是怎么搞起来的。

``` javascript
// Koa/application.js

/**
 * 这是listen方法，可以看到处理请求的部分传入了一个callback函数的返回值
 */
listen(...args) {
  debug('listen');
  const server = http.createServer(this.callback());
  return server.listen(...args);
}

/**
 * 一堆处理然后返回handleRequest用于处理请求，其中对中间件的处理是使用了compose
 */
 callback() {
   const fn = compose(this.middleware);

   if (!this.listeners('error').length) this.on('error', this.onerror);

   const handleRequest = (req, res) => {
     res.statusCode = 404;
     const ctx = this.createContext(req, res);
     const onerror = err => ctx.onerror(err);
     const handleResponse = () => respond(ctx);
     onFinished(res, onerror);
     return fn(ctx).then(handleResponse).catch(onerror);
   };

   return handleRequest;
 }

/**
 * use方法把中间件push进去this.middleware
 */
 use(fn) {
   if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
   if (isGeneratorFunction(fn)) {
     // ...
   }
   this.middleware.push(fn);
   return this;
 }
```

然后去看一下`Koa-compose`

``` javascript
/**
 * compose的代码十分简单
 */
function compose() {
  // ...验证处理

  // 返回一个函数，当做一个中间件嵌入Koa
  return function (context, next) {
    let index = -1
    // 这个函数本身返回一个函数的返回值，这个最终的返回值是一个Promise对象，方便异步流程的控制，这也是Koa的最大特点
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      // 通过闭包保存index，然后把index置为i，方便下一次的验证
      index = i
      // 取到第i个中间件
      let fn = middleware[i]
      // 验证一些东西
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        /**
         * 返回Promise对象，fn是这个dispatch的中间件，向这个中间件里面传入下一次要触发的中间件
         * 的index标记，所以其实只需要调用next()方法就可以访问调用通过闭包保存好的dispatch方法
         * 和下一个中间件的index标记，从而达成调用下一个中间件的操作流程。每一次dispatch返回的都是
         * Promise对象，而Koa2.x是使用async/await来实现异步中间件调用的。所以只需要把next()的返回值，
         * 即dispatch的返回值前面加一个await，就可以实现中间件的按流程异步执行的效果。
         * 就是我们自己写中间件常写到的 `await next()`。然后我们可以回归到最上面的application.js看到，
         * compose的返回值通过包装.then(handleResponse)来处理中间件处理完后的返回结果
         */
        return Promise.resolve(fn(context, function next () {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

关于对于`Koa`的一个小中间件的demo我模拟了一下

``` javascript
// 可以直接复制到Chrome的console测试
var a = () => (
	new Promise(function(resolve, reject) {
      // 返回一个Promise对象并进行异步处理
        setTimeout(function() {
            resolve('123')
        }, 2000)
    })
)

// 模拟中间件
Promise.resolve(async function() {
  // 模拟await next()
	return await a()
}()).then(function(res) {
	console.log(res)
  // 进行后续的handleResponse处理
})
```

---

## Koa-Router

`Koa-Router`加载路由到服务器上基本上有两种方式。

``` JavaScript
// 第一种方式，建立一个 Router/ => api.js
let api = new Router()` 

api.get('/haha', async (ctx, next) => {
  ctx.body = 'haha'
  // await next()
})

api.get('/hehe', async (ctx) => {
  ctx.body = 'hehe'
})

// 然后聚合在一个 Router/ => index.js 文件里
import api from './api'

let allRouter = new Router()

allRouter.use('/api', api.routes(), api.allowedMethods())
// ...其他的一些路径处理


// server.js
app.use(router.routes(), router.allowedMethods())

```

这种方式，把所有的路径聚合到一个index.js文件里面，可以更清楚地看到路由。更适合比较多路由时候的路由处理


``` JavaScript
// 第二种方式，建立路由的时候加上prefix
let api = new Router({ prefix: '/api' })

// server.js里面
app.use(api.routes(), api.allowedMethods())
```

这种方式比较好的是在建立路由的时候加上路径，不需要再新建一个Router对象来聚合管理路由，比较适用于比较小的路由处理

---

## body-parser

> `POST`请求不需要监听`data`事件，经过`body-parser`处理后直接放在ctx.request.body里面

---

## 处理cookies

可以直接在`ctx.cookies`那里访问到经过封装好的`cookies`处理对象。

> 通过`ctx.cookies.get(name, [options])` 读取上下文请求中的cookie

> 通过`ctx.cookies.set(name, value, [options])` 在上下文中写入cookie

session暂时还不会处理。

---

## 连接MySQL

`npm install --save mysql`

可以通过使用`async`和`await`封装MySQL使用的接口，export出去方便使用

> 直接使用了数据库连接池，因为一般情况下对数据库的操作相对比较复杂，如果直接用会话操作的话，每次连接都需要配置参数，比较麻烦。

``` JavaScript
const mysql = require('mysql')

// 创建数据库连接池
const pool = mysql.createPool({
  host     :  'XXX',
  user     :  'XXX',
  password :  'XXX',
  database :  'XXX'
})

// 封装数据库查询接口
let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          // 释放该连接
          connection.release()
        })
      }
    })
  })
}

// 暴露数据库查询接口
module.exports = { query }


/**
 * 使用方法
 */
const res = await query(sql_lang, key)

```

`pool`还有一些事件可以使用，权当`pool`的钩子使用

---

## 文件上传

使用busboy

``` JavaScript
npm install --save busboy
```

> `busboy` 模块是用来解析POST请求，node原生req中的文件流。

使用`busboy.on('file', function(fieldname, file, filename, encoding, mimetype) { ... })`来监听文件接收解析的过程。从而控制文件的解析

通过`busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) { ... })`来监听请求发送的字段

使用`busboy.on('finish', function() { ... })`来监听文件上传结束的事件

完善好这些事件的处理之后，我们可以直接`req.pipe(busboy)`。即把请求的数据流`pipe`到`busboy`就可以直接处理文件的上传请求