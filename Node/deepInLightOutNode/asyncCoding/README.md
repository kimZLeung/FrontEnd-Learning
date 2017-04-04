# ����ǳ��NodeJS - �첽���

---
## ����ʽ���
### �߽׺���
> ���Ѻ������ɲ���������߰Ѻ���`return`�ĺ���

### ƫ����
> �Ҿ��úͿ������...�����ĸ����ǣ�ֻ���ݸ�����һ���ֲ���������������������һ������ȥ����ʣ�µĲ�����ƫ����Ҳ��ͨ��Ԥ�����ò���������һЩ���ƺ�����

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

### ����ʽ�����ʵ��һ����Ȼ����������̸һ�¡����������ʵĴ����ԣ���Ӱ���ⲿ״̬�����ʣ�Ҳ������ֲ�Ժ͸߳��������ֵ����쾡�¡�

---
## Node�е��첽���
### ��Ҫ�ѵ�
- �쳣�Ĵ���
- ����Ƕ�׹���
- ��������ķ���ȱ��
- û�ж��߳�
- �첽��̵�ִ��˳��Υ����������˼ά�����´������Կ���

### �첽��̵Ľ��
- �¼������ĺͶ���ģʽ
> ���͵Ĺ۲���ģʽ
���Բο�Node�ĺ���ģ��`EventEmitter`������ʵ��һ���۲�������������ڹ۲������ϵĺ����������ڵ��ù۲��ߵ�`emit`����ʱ�����۲������汣��õĺ���


- Promise/Deferredģʽ
> `Promise`����״̬`pending`��`reject`��`resolve`��״̬һ���л��Ͳ��������κα仯�������������ʽ���õ���ʽ����˻ص�����Ƕ�׹�������⡣��`then`��������ǰ����첽ִ�С�������첽�������Կ��������⡣`Promise`ִ�еĻ�������״̬���л�

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
��`Promise`�д���Ļص�����������������������`resolve`���԰�`Promise`���`resolve`״̬��������`then`����ĵ�һ������������`reject`�������`reject`״̬������`then`�ĵڶ�������

``` javascript
// ������ҵ�Ŀ�� T.T�������Ǽ������ķ�����Ҳ��ֻд���⼸��...��

// !important alias
Array.prototype.shit = Array.prototype.shift

var jPromise = function(fn) {
	this.resQueue = []
	this.rejQueue = []
	this.state = PENDING
	this.newRes = {}
	// ��������ִ�к�Ľ��
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
> һֱ��`Promise`���ŵ���ʽ�ص��ܸ���Ȥ���Լ�����ʵ��һ�¡���������Ĵ����к����ص����⣬��������������

``` javascript
// ���´������ʵ��
new jPromise(function(resolve, reject) {
	setTimeout(function() {
		resolve('123')
	}, 2000)
}).then(function(data) {
	console.log(data)
	return data
})

// ���´������ӻ�ϵ�
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

> Ϊʲô�أ���ʵ������Ϊ��������

``` javascript
// jPromise�Ĺ��캯������������һ�䣨��QAQ

	if(!fn) {
		this.resolve()
	}
	
```
> �����ˣ��ҵ���then����֮�󷵻ص�Promiseֱ�Ӿͻ�����Լ���resolve�����Եڶ���then������ִ�У������ǵȵ�ǰ���״̬�ı���ִ�У���Ȼ�ҵ�ԭ�����ǻ�һ�ַ�ʽ~...ִ��˳��Ӧ��������ǰһ�������õ����������`resolve`��һ��`Promise`

``` javascript
// �Ұ�resolve�Ĵ����ŵ���ǰһ��Promise��resolve����

// �޸�then����
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
	this.next = next	// �����Promise��nextֵ������һ��Promise
	return next
}

// �޸�resolve����
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
			// �����next���ԣ����Ѿ�������then��������Ϊ�����Ѿ��ɹ�resolve����һ��Promise�������ֶ�resolve��һ��Promise
			if(this.next && this.next.state === PENDING) {
				this.next.resolve()
			}
		}
	}
}
```
> �����������޸�֮�����ӾͲ���ϵ��ˣ����ǵ���һ��`Promise`���治���첽ִ��`resolve`��ʱ���ڵڶ���`resolve`��ʱ��û���õڶ���`then`����������Ҳ�޷���ȡ`this.next`���ǻ�ϵ�...����һ��`Promise`����ĺ�����ͬ��ִ�еģ���`then`��������ĺ������첽ִ�еģ������Ҹ�`then`��������ķ���������һ���װ

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

> �����Ͳ�����ˣ�Ȼ���һ������`Promise`���ж�

``` javascript
// ��resolve������
// ��Promise����
jPromise.prototype.resolve = function(data) {
	if(isThenable(this.cache.resolve)) {
	  this.cache.resolve = this.cache.resolve.newRes.resolve
	}
}
```

> ��⵽����`Promise`�ͽ⹹���������������򵥵ļ��ݲ���������`Promise`������첽�����Ľ��������`Promise`�������������첽��������ʽ���ã�����������Ӧ�ö�`Promise`�����Ƿ�������첽���������жϣ����ҵ����ǵ�`Promise`��������첽������ʱ�������ʵ��Ĵ���

``` javascript
jPromise.prototype.resolve = function(data) {
	this.state = RESOLVE
	var handler = null
	if(data) {
		this.newRes.resolve = data
	}
	// �������� ���ڽ��`Promise`��������첽���������
	if(this.parent && this.parent.state === PENDING) {
		this.parent.state = RESOLVE
		this.parent.cache = this.newRes
		if(this.next && this.next.state === PENDING) {
			this.next.resolve()
		}
	}
	// �������� end
	if(this.resQueue.length) {
		handler = this.resQueue.shit()
		if(typeof handler === 'function') {
			if(!isEmptyObject(this.newRes)) {
				this.cache.resolve = handler(this.newRes.resolve)
				// ��Promise����
				if(isThenable(this.cache.resolve)) {
					if(this.cache.resolve.newRes.resolve) {
						this.cache.resolve = this.cache.resolve.newRes.resolve
					} else {
						// ���Promise����������첽���������
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
				// ��Promise����
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
### �����Ƿַַַַָ���
---

> ������ʹ��`Promise.all([Promise1, Promise2])`�������������첽���������⣬��ǰ������鴫��`Promise`���飬����һ��`Promise`����`then`�����ĵ�һ�������Ĳ�������ǰ��һ��`Promise`ִ�н��������

- �������̿��Ƶ����
  - async
  - step
  - eventproxy
  - wind

---
## �첽�����Ŀ���
- bagpipe
- async 