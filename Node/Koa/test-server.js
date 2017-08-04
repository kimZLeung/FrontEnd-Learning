const koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const compose = require('koa-compose')

const app = new koa()
let api = new Router()

api.get('/haha', async (ctx, next) => {
	ctx.cookies.set(
		'cid',
		'halo word',
		{
			domain: 'localhost',
			path: '/',
			maxAge: 1 * 60 * 1000,
			expires: new Date(),
			httpOnly: false,
			overwrite: false
		}
	)
	ctx.body = 'haha'
	// await next()
})

api.get('/hehe', async (ctx) => {
	if(ctx.cookies.get('cid')) {
		ctx.body = ctx.cookies.get('cid')
	} else {
		ctx.body = 'hehe'
	}
})

app.use(bodyParser())

let router = new Router()

router.use('/api', api.routes(), api.allowedMethods())

// app.use(router.routes(), router.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

app.use(async (ctx) => {
	console.log(ctx.request.url)
	ctx.body = 'halo'
})

app.listen(3000)