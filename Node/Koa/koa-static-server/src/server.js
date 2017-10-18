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

	/**
	 * 这里要注意判断，有两个逻辑判断运算符。JS逻辑运算符的短路规则是
	 * && 前面返回false的话，直接返回前面的东西，不执行后面的代码
	 * || 前面返回true的话，直接返回前面的东西，不执行后面的代码
	 * 一开始利用短路的方式去判断并使用_mime的indexOf方法是可行的
	 * 但是由于多了一个视频的判断，我们在_mime为空的时候，依然会执行到后面的indexOf
	 * 即后面部分不会被短路，所以我们需要在逻辑或（||）后面多判断一次_mime
	 */
	if ( _mime && _mime.indexOf('image/') >= 0 || _mime && _mime.indexOf('video/') >= 0 ) {
		// 如果是图片，视频，则用node原生res，输出二进制数据
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
