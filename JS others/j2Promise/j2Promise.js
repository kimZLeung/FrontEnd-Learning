var j2Promise = function (fn) {
	var self = this
	self.status = 'pending'
	self.value = null
	self.reason = null
	self.reslover = []
	self.rejecter = []

	function reslove (value) {
		final.apply(self, ['fullfill', value])
	}

	function reject (err) {
		final.apply(self, ['reject', err])
	}

	if (fn && typeof fn === 'function') {
		fn(reslove, reject)
	}
}

j2Promise.prototype.then = function (succ, fail) {
	var promise = this

	return new Promise(function (reslove, reject) {
		function handle (value) {
			var ret = typeof succ === 'function' && succ(value) || value

			if (ret && typeof ret['then'] == 'function') {
				ret.then(function (value) {
					reslove(value)
				}, function (reason) {
					reject(reason)
				})
			} else {
				reslove(ret)
			}
		}

		function err (reason) {
			reason = typeof fail === 'function' && fail(reason) || reason
		}

		if (promise.status === 'pending') {
			promise.reslover.push(handle)
			promise.rejecter.push(err)
		} else if (promise.status === 'fullfill') {
			handle(promise.value)
		} else if (promise.status === 'reject') {
			err(promise.reason)
		}

	})
}

function final (status, val) {
	var promise = this
	var fn
	var nowStatus
	if (promise.status !== 'pending') return

	setTimeout(function() {
		promise.status = status
		nowStatus = promise.status === 'fullfill'
		queue = promise[nowStatus ? 'reslover' : 'rejecter']
		while (fn = queue.shift()) {
			val = fn.call(promise, val) || val
		}

		promise[nowStatus ? 'value' : 'reason'] = val
		promise['reslover'] = void 666
		promise['rejecter'] = void 666

	}, 0)
}
