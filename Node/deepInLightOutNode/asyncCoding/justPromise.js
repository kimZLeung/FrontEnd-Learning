var PENDING = 'pending'
var RESOLVE = 'resolve'
var REJECT = 'reject'


var jPromise = function(fn) {
	this.queue = []
	this.state = PENDING
	this.cache = null
	fn(this.resolve, this.reject)
}

jPromise.prototype.resolve = function(data) {
	this.state = RESOLVE
	var handler = null
	if(this.queue.length) {
		handler = this.queue.unshift()
		if(handler instanceof Function) {
			this.cache.resolve = handler(data)
		}
	}
}

jPromise.prototype.reject = function(data) {
	this.state = REJECT
	var handler = null
	if(this.queue.length) {
		handler = this.queue.unshift()
		if(handler instanceof Function) {
			this.cache.reject = handler(data)
		}
	}
}