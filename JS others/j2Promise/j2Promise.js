var j2Promise = function (fn) {
	var self = this
	self.status = 'pending'
	self.value = null
	self.reason = null
	self.resolver = []
	self.rejecter = []

	function resolve (value) {
		final.apply(self, ['fullfill', value])
	}

	function reject (err) {
		final.apply(self, ['reject', err])
	}

	if (fn && typeof fn === 'function') {
		fn(resolve, reject)
	}
}

j2Promise.prototype.then = function (succ, fail) {
	var promise = this

	return new Promise(function (resolve, reject) {
		function handle (value) {
			var ret = typeof succ === 'function' && succ(value) || value

			if (ret && typeof ret['then'] == 'function') {
				// 进行对Promise对象的处理
				ret.then(function (value) {
					resolve(value)
				}, function (reason) {
					reject(reason)
				})
			} else {
				// 若不是Promise对象则直接resolve传入下一个Promise
				resolve(ret)
			}
		}

		function err (reason) {
			// 因为我们平时使用Promise的时候都很少会用到then的第二个参数，即fail回调函数应该为undefined，所以做一个兼容，把reason直接穿透Promise传下去，只到有catch函数捕获它
			reason = typeof fail === 'function' && fail(reason) || reason
			reject(reason)
		}

		if (promise.status === 'pending') {
			promise.resolver.push(handle)
			promise.rejecter.push(err)
		} else if (promise.status === 'fullfill') {
			handle(promise.value)
		} else if (promise.status === 'reject') {
			err(promise.reason)
		}

	})
}

j2Promise.prototype.catch = function (e) {
	return this.then(void 666, e)
}

j2Promise.resolve = function (p) {
	return new j2Promise(function (res, rej) {
		res(p)
	})
}

j2Promise.all = function (list) {
	if (Object.prototype.toString.call(list) === '[object Array]') {
		var len = list.length
		var count = len
		var result = []

		return new j2Promise(function (res, rej) {

			function resolver (index, value) {
				result[index] = value
				console.log(index, value)
				if (--count === 0) {
					res(result)
				}
			}

			for (var i = 0; i < len; i++) {
				if (typeof list[i]['then'] === 'function') {
					/** 
					 * 分装一层立即执行函数，用于保存holder这个index
					 * 因为then需要异步操作，在for循环内不构成一层作用域的情况下
					 * 下一次循环的holder会覆盖这一次的循环，所以多加一层作用域用于保存这个变量
					 * 类似闭包
					 */
					(function () {
						var holder = i
						list[holder].then(function (val) {
							resolver(holder, val)
						}, function (reason) {
							rej(reason)
						})
					})()
				} else {
					resolver(i, list[i])
				}
			}
		})
	} else {
		return new j2Promise(function (res, rej) {
			rej('请传入数组')
		})
	}
}

j2Promise.race = function (list) {
	if (Object.prototype.toString.call(list) === '[object Array]') {
		var len = list.length
		var count = len
		var result = []

		return new j2Promise(function (res, rej) {

			for (var i = 0; i < len; i++) {
				if (typeof list[i]['then'] === 'function') {
					list[i].then(function (val) {
						res(val)
					}, function (reason) {
						rej(reason)
					})
				} else {
					rej('请传入Promise数组')
				}
			}
		})
	} else {
		return new j2Promise(function (res, rej) {
			rej('请传入数组')
		})
	}
}

function final (status, val) {
	var promise = this
	var fn
	var nowStatus
	if (promise.status !== 'pending') return

	/**
	 * [这个setTimeout是必须的]
	 * 
	 * 执行效果可能很难看出有什么不同
	 * 但是就原生的Promise API而言，传入Promise构造函数的函数是同步执行的
	 * 然而通过then传入的后续的处理函数其实是异步执行的，而我们通过then把处理函数挂载上去Promise这一步其实是同步的
	 * 所以如果这里不用setTimeout把这一段代码设置成异步：
	 * 我们将会在执行new Promise的同时同步resolve这个Promise并且同步执行到then挂载的处理函数
	 * 这样子可以说是不太符合原生Promise API吧
	 *
	 * 但是原生的Promise并不是用setTimeout实现异步的（这里只是一个简单的模拟），因为浏览器内部存在两条异步队列
	 * macrotask和mircotask两条任务队列，而Promise的then的异步队列是属于微任务队列
	 * setTimeout所在的任务队列是宏任务队列。
	 */
	setTimeout(function() {
		promise.status = status
		nowStatus = promise.status === 'fullfill'
		queue = promise[nowStatus ? 'resolver' : 'rejecter']
		while (fn = queue.shift()) {
			val = fn.call(promise, val) || val
		}

		promise[nowStatus ? 'value' : 'reason'] = val
		promise['resolver'] = void 666
		promise['rejecter'] = void 666

	}, 0)
}
