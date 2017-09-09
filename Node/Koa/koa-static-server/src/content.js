const fs = require('fs')
const path = require('path')

const file = require('./file.js')
const dir = require('./dir.js')

async function content (ctx, fullPath) {
	let reqUrl = path.join(fullPath, ctx.url)

	let exist = fs.existsSync(reqUrl)

	let content = ''

	if (!exist) {
		content = 'halo? 404 Not Found!'
	} else {
		let stat = fs.statSync(reqUrl)

		if (stat.isDirectory()) {
			content = dir(ctx.url, reqUrl)
		} else {
			content = file(reqUrl)
		}
	}

	return content
}

module.exports = content
