const koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const compose = require('koa-compose')

const app = new koa()
const router = new Router({ prefix: '/haha' })

/**
 * [这一个路由捕获处理了/haha的请求]
 * 这是一种...Multiple middeware的方法
 */
router.get(
  '/',
  async (ctx, next) => {
    console.log('dsadasd')
    ctx.body = 'halo haha'
    await next()
  },
  async (ctx, next) => {
    console.log('router Multiple')
    // 这里加入一个await next ，会进入下一个中间件的处理，而下一个中间件，就是app那里use的中间件
    // await next()
  }
)

router.get(
  '/gaga',
  async (ctx, next) => {
    ctx.body = 'halo hahaye'
    await next()
  },
  async (ctx, next) => {
    console.log('router Multiple')
    // await next()
  }
)

app.use(bodyParser())

app.use(async (ctx, next) => {
  ctx.body = ctx.request.body
  await next()
})

app
  .use(router.routes())
  .use(router.allowedMethods())

const haloW = async (ctx, next) => {
  ctx.body = 'halo world'
  await next()
}
const logger = async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
}

app.use(compose([haloW, logger]))

app.listen(8080, function (err) {
  console.log('server is listening on port 8080')
})
