const Koa = require('koa')
const path = require('path')
const content = require('./content.js')
const mimes = require('./mimes.js')

const app = new Koa()

const staticPath = '../static'
const PORT = 3333

function parseMime( url ) {
  let extName = path.extname( url )
  extName = extName ?  extName.slice(1) : 'unknown'
  return mimes[ extName ]
}

app.use(async (ctx) => {
	let fullStaticPath = path.join(__dirname, staticPath)

	let _content = await content(ctx, fullStaticPath)

	let _mime = parseMime(ctx.url)

	// 如果有对应的文件类型，就配置上下文的类型
	if ( _mime ) {
		ctx.type = _mime
	}

	if ( _mime && _mime.indexOf('image/') >= 0 ) {
		// 如果是图片，则用node原生res，输出二进制数据
		ctx.res.writeHead(200)
		ctx.res.write(_content, 'binary')
		ctx.res.end()
	} else {
		// 其他则输出文本
		ctx.body = _content
	}
})

app.listen(PORT)
console.log(`static-server is starting at port ${PORT}`)
