var fs = require('fs')

process.nextTick = process.nextTick || function(cb) {
	if(process._exiting) {
		return
	}
	if(tickDepth >= process.maxTickDepth) {
		maxTickWarn()
	}
	var tock = { callback:cb }
	if(process.domain) {
		tock.domain = process.domain
	}
	nextTickQueue.push(tock)
	if(nextTickQueue.length) {
		process._needTickCallback()
	}
}

// process.nextTick(function() {
// 	console.log('haha')
// })
// 

process.nextTick(function() {
	console.log('nextTick 1')
})

process.nextTick(function() {
	console.log('nextTick 2')
})

setImmediate(function() {
	console.log('setImmediate 1')
	process.nextTick(function() {
		console.log('强势插入')
	})
})

setImmediate(function() {
	console.log('setImmediate 2')
})

console.log('同步的')