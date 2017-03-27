# 深入浅出NodeJS - 异步编程

---
## 函数式编程
### 高阶函数
> 即把函数当成参数传入或者把函数`return`的函数

### 偏函数
> 我觉得和柯理化差不多...柯理化的概念是：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。偏函数也是通过预先设置值来产生一些定制函数。

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