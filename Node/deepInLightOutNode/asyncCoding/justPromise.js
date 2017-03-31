var PENDING = 'pending'
var RESOLVE = 'resolve'
var REJECT = 'reject'

// !important alias
Array.prototype.shit = Array.prototype.shift

var jPromise = function(fn) {
	this.resQueue = []
	this.rejQueue = []
	this.state = PENDING
	this.newRes = {}
	// 缓存起来执行后的结果
	this.cache = {}
	this.context = null

	if(fn && typeof fn === 'function') {
		try {
			fn(this.resolve.bind(this), this.reject.bind(this))
		} catch (e) {
			console.log(e)
			this.reject()
		}
	}

	return this
}

jPromise.prototype.resolve = function(data) {
	this.state = RESOLVE
	var handler = null
	if(data) {
		this.newRes.resolve = data
	}
	if(this.resQueue.length) {
		handler = this.resQueue.shit()
		if(typeof handler === 'function') {
			if(!isEmptyObject(this.newRes)) {
				this.cache.resolve = handler(this.newRes.resolve)
				// 作Promise兼容
				if(isThenable(this.cache.resolve)) {
		          this.cache.resolve = this.cache.resolve.newRes.resolve
		        }
			} else if(!isEmptyObject(this.context)) {
				this.cache.resolve = handler(this.context.cache.resolve)
				// 作Promise兼容
				if(isThenable(this.cache.resolve)) {
		          this.cache.resolve = this.cache.resolve.newRes.resolve
		        }
			}
			if(this.next && this.next.state === PENDING) {
				this.next.resolve()
			}
		}
	}
}

jPromise.prototype.reject = function(data) {
	this.state = REJECT
	var handler = null
	if(data) {
		this.newRes.reject = data
	}
	if(this.rejQueue.length) {
		handler = this.rejQueue.shit()
		if(typeof handler === 'function') {
			if(!isEmptyObject(this.newRes)) {
				this.cache.reject = handler(this.newRes.reject)
			} else if(!isEmptyObject(this.context)) {
				this.cache.reject = handler(this.context.cache.reject)
			}
			if(this.next && this.next.state === PENDING) {
				this.next.reject()
			}
		}
	}
}

jPromise.prototype.then = function(resolve, reject) {
	var that = this

	if(typeof resolve === 'function') {
		this.resQueue.push(resolve)
	}
	if(typeof reject === 'function') {
		this.rejQueue.push(reject)
	}
	if(this.state === RESOLVE) {
		reAsync(that, RESOLVE)
	} else if(this.state === REJECT) {
		reAsync(that, REJECT)
	}

	if(this.context) {
		if(this.context.state === RESOLVE) {
			reAsync(that, RESOLVE)
		} else if(this.context.state === REJECT) {
			reAsync(that, REJECT)
		}
	}

	var next = new jPromise()
	next.context = this
	this.next = next
	return next
}

function isThenable (obj) {
	if(obj && typeof obj.then === 'function') {
		return true
	}
	return false
}

function isEmptyObject(e) {  
    for (var i in e)  
        return !1;  
    return !0 
}

function reAsync(ctx, type) {
	if(type === RESOLVE) {
		setTimeout(function() {
			ctx.resolve()
		}, 0)
	} else {
		setTimeout(function() {
			ctx.reject()
		}, 0)
	}
}

exports.jPromise = jPromise