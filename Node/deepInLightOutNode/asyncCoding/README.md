# 深入浅出NodeJS - 异步编程

---
## 函数式编程
### 高阶函数
> 即把函数当成参数传入或者把函数`return`的函数

### 偏函数
> 我觉得和柯理化差不多...柯理化的概念是：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。偏函数也是通过预先设置参数来产生一些定制函数。

``` javascript
function curry(reSet) {
	return function(set) {
		console.log(set + reSet)
	}
}

var haha = curry('haha')
var hehe = curry('hehe')

haha('ok')  // 'okhaha'
hehe('ok')  // 'okhehe'
```

### 函数式编程其实是一个庞然大物，这里粗略谈一下。不过其优质的纯净性，不影响外部状态的特质，也让其移植性和高抽象性体现得淋漓尽致。

---
## Node中的异步编程
### 主要难点
- 异常的处理
- 函数嵌套过深
- 阻塞代码的方法缺少
- 没有多线程
- 异步编程的执行顺序违背人脑正常思维，导致代码难以看懂

### 异步编程的解决
- 事件发布的和订阅模式
> 典型的观察者模式
可以参考Node的核心模块`EventEmitter`，就是实现一个观察者来保存挂载在观察者身上的函数，并且在调用观察者的`emit`方法时触发观察者上面保存好的函数


- Promise/Deferred模式
> `Promise`三个状态`pending`、`reject`、`resolve`。状态一旦切换就不会再有任何变化。它以优秀的链式调用的形式解决了回调函数嵌套过深的问题。以`then`方法连接前后的异步执行。解决了异步代码难以看懂的问题。`Promise`执行的基点在于状态的切换

``` javascript
var asyncTask = new Promise(function(resolve, reject) {
	setTimeout(function() {
		resolve('haha')
	}, 2000)
})

asyncTask.then(function(data) {
	console.log(data)
}, function(err) {
	console.error(err)
})

// print 'haha' after 2 seconds
```
在`Promise`中传入的回调函数中有两个参数，调用`resolve`可以把`Promise`设成`resolve`状态，随后调用`then`里面的第一个函数，调用`reject`可以设成`reject`状态，调用`then`的第二个函数

``` javascript
// 这才是我的目的 T.T，以下是几个核心方法（也就只写了这几个...）

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

	if(!fn) {
		this.resolve()
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
			if(this.newRes) {
				this.cache.resolve = handler(this.newRes.resolve)
			} else if(this.context) {
				this.cache.resolve = handler(this.context.cache.resolve)
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
			if(this.newRes) {
				this.cache.reject = handler(this.newRes.reject)
			} else if(this.context) {
				this.cache.reject = handler(this.context.cache.reject)
			}
		}
	}
}

jPromise.prototype.then = function(resolve, reject) {
	if(typeof resolve === 'function') {
		this.resQueue.push(resolve)
		console.log('haha')
	}
	if(typeof reject === 'function') {
		this.rejQueue.push(reject)
	}
	if(this.state === RESOLVE) {
		this.resolve()
	} else if(this.state === REJECT) {
		this.reject()
	}
	var next = new jPromise()
	next.context = this
	return next
}
```
> 一直对`Promise`优雅的链式回调很感兴趣，自己试着实现一下。可是上面的代码有很严重的问题，就是连不起来！

``` javascript
// 以下代码可以实现
new jPromise(function(resolve, reject) {
	setTimeout(function() {
		resolve('123')
	}, 2000)
}).then(function(data) {
	console.log(data)
	return data
})

// 以下代码链子会断掉
new jPromise(function(resolve, reject) {
	setTimeout(function() {
		resolve('123')
	}, 2000)
}).then(function(data) {
	console.log(data)
	return data
}).then(function(data) {
	console.log(123)
})
```

> 为什么呢，其实就是因为下面这里

``` javascript
// jPromise的构造函数里面有这样一句（蠢QAQ

	if(!fn) {
		this.resolve()
	}
	
```
> 导致了，我调用then方法之后返回的Promise直接就会调用自己的resolve，所以第二个then会马上执行，而不是等到前面的状态改变再执行，既然找到原因，我们换一种方式~...执行顺序应该是利用前一个函数得到结果的契机`resolve`后一个`Promise`

``` javascript
// 我把resolve的触发放到了前一个Promise的resolve里面

// 修改then方法
jPromise.prototype.then = function(resolve, reject) {
	if(typeof resolve === 'function') {
		this.resQueue.push(resolve)
	}
	if(typeof reject === 'function') {
		this.rejQueue.push(reject)
	}
	if(this.state === RESOLVE) {
		this.resolve()
	} else if(this.state === REJECT) {
		this.reject()
	}
	var next = new jPromise()
	next.context = this
	this.next = next	// 给这个Promise的next值附上下一个Promise
	return next
}

// 修改resolve方法
jPromise.prototype.resolve = function(data) {
	this.state = RESOLVE
	var handler = null
	if(data) {
		this.newRes.resolve = data
	}
	if(this.resQueue.length) {
		handler = this.resQueue.shit()
		if(typeof handler === 'function') {
			if(this.newRes) {
				this.cache.resolve = handler(this.newRes.resolve)
			} else if(this.context) {
				this.cache.resolve = handler(this.context.cache.resolve)
			}
			// 如果有next属性，即已经调用了then方法，因为这里已经成功resolve了上一个Promise，所以手动resolve下一个Promise
			if(this.next && this.next.state === PENDING) {
				this.next.resolve()
			}
		}
	}
}
```
> 作出了以上修改之后，链子就不会断掉了，但是当第一个`Promise`里面不是异步执行`resolve`的时候，在第二处`resolve`的时候还没调用第二个`then`方法，所以也无法读取`this.next`还是会断掉...（第一个`Promise`里面的函数是同步执行的，而`then`方法里面的函数是异步执行的，所以我给`then`函数里面的方法进行了一层封装

``` javascript
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

jPromise.prototype.then = function(resolve, reject) {
	// ...some
	
	if(this.state === RESOLVE) {
		reAsync(that, RESOLVE)
	} else if(this.state === REJECT) {
		reAsync(that, REJECT)
	}
	// some...
}
```

> 这样就不会断了，然后加一个返回`Promise`的判断

``` javascript
// 在resolve函数里
// 作Promise兼容
jPromise.prototype.resolve = function(data) {
	if(isThenable(this.cache.resolve)) {
	  this.cache.resolve = this.cache.resolve.newRes.resolve
	}
}
```

> 检测到返回`Promise`就解构其结果，可是这样简单的兼容并不能满足`Promise`里面放异步操作的结果（而且`Promise`最大的特征就是异步操作的链式调用），所以我们应该对`Promise`里面是否进行了异步操作作出判断，并且当我们的`Promise`里面包含异步操作的时候作出适当的处理

``` javascript
jPromise.prototype.resolve = function(data) {
	this.state = RESOLVE
	var handler = null
	if(data) {
		this.newRes.resolve = data
	}
	// 新增部分 用于解决`Promise`里面包含异步操作的情况
	if(this.parent && this.parent.state === PENDING) {
		this.parent.state = RESOLVE
		this.parent.cache = this.newRes
		if(this.next && this.next.state === PENDING) {
			this.next.resolve()
		}
	}
	// 新增部分 end
	if(this.resQueue.length) {
		handler = this.resQueue.shit()
		if(typeof handler === 'function') {
			if(!isEmptyObject(this.newRes)) {
				this.cache.resolve = handler(this.newRes.resolve)
				// 作Promise兼容
				if(isThenable(this.cache.resolve)) {
					if(this.cache.resolve.newRes.resolve) {
						this.cache.resolve = this.cache.resolve.newRes.resolve
					} else {
						// 如果Promise里面包含有异步操作的情况
						this.state = PENDING
						this.cache.resolve.next = this.next
						this.cache.resolve.parent = this
						this.next = null
					}
					// this.state = PENDING
		        	// this.cache.resolve = this.cache.resolve.newRes.resolve
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
```

---
### 这里是分分分分分割线
---

> 还可以使用`Promise.all([Promise1, Promise2])`这个方法来解决异步依赖的问题，在前面的数组传入`Promise`数组，返回一个`Promise`对象，`then`方法的第一个函数的参数就是前面一堆`Promise`执行结果的数组

- 各种流程控制的类库
  - async
  - step
  - eventproxy
  - wind

---
## 异步并发的控制
- bagpipe
- async 