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
let api = new Router()

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