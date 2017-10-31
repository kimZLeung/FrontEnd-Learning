## 好久没用过的Generator的总结

---

## 好的其实根本没用过Generator

> 但是今天想总结一下Generator的用法和我们常用的`...`扩展运算符和`for...of`与底层`iterator`接口的关系。

---

## iterator和扩展运算符等

我们经常会使用`Array.from`、`for...of`或者扩展运算符来遍历或者展开数组，其实这些新增的API使用了底层对数组默认实现的`iterator`接口，而`iterator`接口又和`Generator`有着很相似的关系.

比如`for...of a`跟着的一个a对象，浏览器会自动寻找到a对象上实现的`[Symbol.iterator]`属性，并且调用这个属性上的函数，获取这个a对象的`iterator`，再继续调用`next()`方法来遍历这个数组

`...`扩展运算符同理。

`Array.from`同理。

同理在于：它们都不需要知道对方的遍历器生成器接口是如何实现，它们只需要判断你有没有提供这个接口，然后调用你这个接口，我就不断`next()`，把你的东西拿出来，展示给你看。

---

## 在说说Generator为何与iterator关系密切

我们都知道，一个最简单的`Generator`如下

```
function* foo() {
	for (var i = 0; i < 6; i++) {
		yield i;
	}
}
```

这是一个很简单的`Generator`，我们可以通过执行它获取`iterator`来遍历出来它输出的值，很容易可以发现，`Generator`不就是`iterator`的爸爸吗？所谓`生成器`全名就是`遍历器`的`生成器`。

`Generator`生成的`iterator`自身原型上的`[Symbol.iterator]`也就是`Generator`自己，所以说，我们也可以把`foo()`这一句生成的`iterator`看成一个可遍历的对象，传到`for...of`和`...`后面都可以

当然，我们更加方便的是可以直接用`Generator`函数作为对象的一个`[Symbol.iterator]`属性，这样我们就可以很方便地自行实现`[Symbol.iterator]`接口，不需要自己把`next`函数封装出来。比如：

```
// 直接使用上面的foo
var bb = {}
bb[Symbol.iterator] = foo
[...bb] 	// [0, 1, 2, 3, 4, 5]
```

---

## 我只知道yield，所以yield* 是什么东西

如果在`Generator`函数内部，调用另一个`Generator`函数，默认情况下是没有效果的，such as

```
function* foo() {
  yield 'a'
  yield 'b'
}

function* bar() {
  yield 'x'
  yield foo()
  yield 'y'
}

for (let v of bar()){
  console.log(v)
}

// x, foo {}, y ... 因为我yield foo的返回值只是一个iterator遍历器嘛。。。
```

如果想把这个遍历器展开，把内部的也输出的话，需要用到`yield*`

```
function* foo() {
  yield 'a'
  yield 'b'
}

function* bar() {
  yield 'x'
  yield* foo()
  yield 'y'
}

for (let v of bar()){
  console.log(v)
}

// x, a, b, y
```

我想了想其实觉得这个并没有什么用，无非就是在一个`Generator`里面展开另外一个`Generator`，`Generator`无非就可以用来生成`iterator`，可以展开数组嘛。。。所以无非就是可以展开嵌套数组嘛...

```
function* iterTree(tree) {
  if (Array.isArray(tree)) {
  	// 如果这一项是数组，则遍历每一项并且使用yield* 递归自己进行展开
    for(let i=0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
  	// 如果不是则可以直接输出自己
    yield tree;
  }
}

const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];

for(let x of iterTree(tree)) {
  console.log(x);
}

// a, b, c, d, e
```

就像前面所说到的，我们把`Generator`生成的`iterator`传给`for...of`，然后浏览器寻找这个对象上的`[Symbol.iterator]`属性，调用并且获取`iterator`，然后执行`next`输出每一项。我自己试过执行`var b = iterTree(tree)[Symbol.iterator]()`，我没有传参，但是调用`next`方法依然可以输出`tree`的每一项。可见，我们的`iterTree(tree)[Symbol.iterator]`的实现并不是直接指向本来的函数，而是将本来的`Generator`传入的参数也一并保存了，可能期间通过柯理化和闭包来保存了`Generator`传入的参数（ 可能是Generator.bind(undefined, params) ）

我也尝试过直接把iterTree直接赋值给一个对象的`[Symbol.iterator]`属性，然后用扩展运算符展开，得到的结果是`[undefined]`，嗯，目测内部实现是直接调用`obj[Symbol.iterator]()`的，上面属于特殊情况。

---

## Generator的作用当然不止可以作为遍历器的爸爸

它还可以与Promise配合，实现自动顺序执行多个异步操作

```
var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
}

// 最简单的版本，通过Promise的then里面调用next，并传入返回值，来实现顺序执行异步操作
function run(gen){
  var g = gen()

  function next(data){
    var result = g.next(data)
    if (result.done) return result.value
    result.value.then(function(data){
      next(data)
    });
  }

  next()
}

run(gen)
```

封装一个这样的自动执行器可以方便地将`Generator`传入并且自动执行，免去了使用者高成本的操作。

---

## 但是，我开始学的时候就已经有async和await了

的确这个`Generator`的用法是有点麻烦，又要生个`iterator`，然后还要不断调用`next()`，后来，还要封装一个`co`模块进行自动化执行。

然后async函数就出现了。

看一下用法

```
function bar () {
	return new Promise(function (res, rej) {
		setTimeout(function () {
			res('haha')
		}, 1000)
	})
}

async function foo () {
	const val = await bar()
	console.log(val)
}

// haha
```

看起来写法和`Generator`差不多，但是用法差挺多的，关于`async`详细说明可以点[这里](http://es6.ruanyifeng.com/#docs/async)

总的来说就是并不需要像`Generator`这样生成`iterator`然后调用`next`来遍历，而是直接用await就可以等到`Promise`then出来的值。

我们都知道async会返回`Promise`值，我们平时写，要不就是直接返回一个`Promise`，或者说返回一个`await`等回来的值（这个值一般会通过Promise.resolve包装）。其实async内部自己会执行一个自动执行器。跟刚刚说的差不多

```
// 参考一下阮老师的demo

async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}

function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF()
    function step(nextF) {
      let next 
      try {
        next = nextF()
      } catch(e) {
        return reject(e)
      }
      if(next.done) {
        return resolve(next.value)
      }
      // 解构Promise的value值，传入作为await的返回值，这个是只有在Promise resolve之后才会调用后面的函数，是这样配合实现异步操作的。
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v) })
      }, function(e) {
        step(function() { return gen.throw(e) })
      })
    }
    step(function() { return gen.next(undefined) })
  })
}
```

这个`spawn`函数基本上就是一个`Generator`的自动执行器，通过把`async`函数里面的代码转化成一个`Generator`，然后将`await`替换成`yield`，然后通过`await`来等待后面的异步操作，并且将本来返回的Promise解构出来，操作成功之后获取到异步操作的返回值

