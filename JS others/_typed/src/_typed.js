
var _typed = function (op) {
	this.prevNode = null
	this.currentNode = null
	this.tasks = op.tasks || []
	this.parent = document.querySelector(op.el) || document.querySelector('.type') || null
	this.time = op.time || 30
	this.html = op.isHtml || false
	this.cursor = op.cursor || false
	this.parse = false
	this.currentTask = null
	if (!this.html) {
		this.el = this._moveCursor(void 233, this.parent)
	}
	if (op.autoRun) this._next()
}

_typed.prototype._next = function () {
	var createBase = function (task) {
		if (typeof task === 'object') {
			return task
		} else if (typeof task === 'string') {
			return {
				str: task,
				start: void 233,
				end: void 233
			}
		}
	}

	var createStrBase = function (task) {
		return {
			str: task,
			start: void 233,
			end: void 233,
			isString: true
		}
	}

	/**
	 * 如果指定了html格式的话，会根据传入的字符串格式进行转化，
	 * 创建先DOM节点，然后把本来传入的tasks内的HTML字符串转化为没有DOM节点的字符串
	 * 然后下面的操作一样
	 * 
	 * 若不是html格式则不会对原来的tasks队列或者字符串进行处理。
	 * 
	 */
	if (this.html) {
		// 创建节点
		if (this.tasks.length) {
			var info = this._htmlParser(this.tasks)
			/**
			 * 如果转化成功的话，info会有信息，若没有则对prevNode和currentNode进行特殊的处理
			 * 因为对这两个东西的处理才能让光标准确显示...
			 *
			 * 如果转义不出来，则传入的本来就不是html字符，所以需要把光标append回去最大的容器节点下面
			 * 如果能转义出来，则把光标塞进去，为了使光标和字体一样大而已。。。
			 */
			if (info) {
				var cc = document.createElement(info.node)
				this.prevNode = this.currentNode
				this.currentNode = cc
				this.parent.appendChild(this.currentNode)
				// 创建或者移动光标
				this._moveCursor(this.prevNode, this.currentNode)
				// 重置光标引用
				this.el = this.currentNode.querySelector('.cursor')
			} else {
				this.prevNode = this.currentNode
				this.currentNode = 'noTag'
				// 创建或者移动光标
				this._moveCursor(this.prevNode, this.parent)
				// 重置光标引用
				this.el = this.parent.querySelector('.cursor')
			}
		}
	} else {
		// do nothing
	}

	if (typeof this.tasks === 'string') {
		this._run(createStrBase(this.tasks))
	} else if (typeof this.tasks === 'object') {
		if(this.tasks.length) {
			var task = createBase(this.tasks.shift())
			/**
			 * [start 调用开始的回调函数]
			 * @type {[type]}
			 */
			if(typeof task.start === 'function') task.start()
			this._run(task)
		} else {
			return null
		}
	}
}

_typed.prototype._run = function (task) {
	var self = this
	var str = task.str
	if (this.parse) {
		this.currentTask = task
		return null
	}
	if (str.length) {
		setTimeout(function () {
			if (self.currentNode) {
				/**
				 * 对currentNode进行判断，判断这一个是否有创建节点
				 *
				 * 如果没有则把文字直接append到最大的容器节点内
				 */
				if (self.currentNode == 'noTag') {
					var node = document.createTextNode(str.substr(0, 1))
					self.parent.insertBefore(node, self.el)
				} else {
					var node = document.createTextNode(str.substr(0, 1))
					self.currentNode.insertBefore(node, self.el)
				}
			} else {
				var node = document.createTextNode(str.substr(0, 1))
				self.parent.insertBefore(node, self.el)
			}
			var newStr = str.substr(1)
			self._run(Object.assign(task, {
				str: newStr
			}))
		}, this.time)
	} else {
		if (task.isString) {
			return null
		}
		/**
		 * [endFn 调用结束的回调函数]
		 * @type {[type]}
		 */
		if(typeof task.end === 'function') task.end()
		this._next()
	}
}

_typed.prototype._moveCursor = function (prev, current) {
	if (!prev) {
		var cursor = document.createTextNode('|')
		var span = document.createElement('span')
		span.appendChild(cursor)
		span.className = 'cursor'
		current.appendChild(span)
		return span
	}
	if (prev == 'noTag') {
		var cursor = this.parent.querySelector('.cursor')
		current.appendChild(cursor)
		return cursor
	}
	var cursor = prev.querySelector('.cursor')
	current.appendChild(cursor)
	return cursor
}

_typed.prototype._htmlParser = function (op) {
	var catchHtml = function (str) {
		var list = /<(\w+)>(.+)<\/\1>/.exec(str)
		if (list) {
			return {
				node: list[1],
				str: list[2]
			}
		} else {
			return null
		}
	}

	if(typeof op === 'string') {
		var res = catchHtml.call(this, this.tasks)
		if (res) this.tasks = res.str
		return res
	} else {
		var res = catchHtml.call(this, this.tasks[0].str)
		if (res)
			this.tasks[0] = Object.assign(this.tasks[0], {
				str: res.str
			})
		return res
	}
}

_typed.prototype.start = function () {
	if (this.currentTask) {
		this.parse = false
		this._run(this.currentTask)
	} else {
		this.parse = false
		this._next()
	}
}

_typed.prototype.stop = function () {
	this.parse = true
}

_typed.prototype.holdOn = function (time) {
	var self = this
	this.stop()
	setTimeout(function () {
		self.start()
	}, time)
}
