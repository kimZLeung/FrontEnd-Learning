# RxJS

---

## 如何理解RxJS

> `Rx` = `Observables` + `LINQ` + `Schedulers` （我反正看不懂

### 其实就是异步的数据流

---
## 何为异步数据流

- 页面上的一些点击事件，会在用户点击时异步触发
- 一些异步的网络请求会在服务器响应时异步触发后续行为

而`Rx`就为我们提供了一系列的工具来处理这些异步流。

---

## marble图

```
	--a--b---c-d--|-->
```

我们可以把这四个点看作四个不同时间触发的点击事件。
然后我们可以把这个异步数据路看成一个四维数组。
这是一个典型的`Observable`的数据结构

---

## Observables

`Observable`作为一个异步的数组，它就包含有一些数组的方法，也就是我们用来处理这些异步数据流的方法`operator`

> `Observables`还有一个很棒的特性是实现链式调用 ---> 流，每次调用`operator`都会返回一个基于上一个`operator`的新的`Observables`

我们可以订阅`subscribe`一个设定好的流`Observables`（无论是事件或是别的什么）来执行我们想要实现的行为

---

## Subscribe

`subscribe`是一个订阅流的方法，这个方法可以传入三个参数，分别是三个函数`onNext`、`onError`、`onCompleted`

- `onNext`是在`Observable`调用`onNext()`方法时会调用，一般在事件触发时就会调用（所以我们处理事件时`subscribe`只传的那一个回调其实是`onNext`函数）。如果是自己`create`的`Observer`可以调用`Observable`的`onNext`方法去启动`onNext`回调
- `onError`方法...就跟`Promise`那个差不多，抛出错误时调用
- `onCompleted`方法，如果是自己`create`的`Observable`的话可以用`Observer`的`onCompleted`方法结束这个`Observable`并调用这个回调函数

``` javascript
rx.Observable.create(function(observer) {
	observer.onNext(42)		// emit onNext
	observer.onCompleted()	// emit onCompleted

	return function() {
		console.log('disposed')
	}
})
.subscribe(function(x) {
	console.log('onNext: ', x)	// "onNext: 42"
}, function(e) {
	console.log('onError: ', e)
}, function() {
	console.log('onCompleted')	// "onCompleted"
})
```

> `subscribe`方法返回一个`observer`对象，调用该对象上的`dispose`方法可以取消订阅

---

## 热Observables和冷Observables

> 顾名思义，热`Observables`是类似事件一类的`Observable`，不会随着订阅而开始启动更新数据，而是每时每刻都在更新数据。
然而冷`Observables`则只会在我们`subscribe`之后才会开始数据更新和推送，如我们自己用`interval`创建出来的`Observable`（interval创建出来的会在订阅后每**秒默认从1开始推送整数）

我们也可以用`publish`方法把`Cold Observables`转换为`Hot Observables`

``` javascript
var source = Rx.Observable.interval(1000);
var hot = source.publish()	// 使用publish把流转换为Hot Observables
hot.connect()				// 然后使用connect方法启动数据更新
var subscription1
var subscription2

setTimeout(function() {
  subscription1 = hot.subscribe(
    function (x) { console.log('Observer 1: onNext: ' + x); },
    function (e) { console.log('Observer 1: onError: ' + e.message); },
    function () { console.log('Observer 1: onCompleted'); });

  subscription2 = hot.subscribe(
    function (x) { console.log('Observer 2: onNext: ' + x); },
    function (e) { console.log('Observer 2: onError: ' + e.message); },
    function () { console.log('Observer 2: onCompleted'); });
}, 5000)


setTimeout(function () {
  subscription1.dispose();
  subscription2.dispose();
}, 10000);
```

---

## 构建起事件的桥梁

> 在`RxJS`中，我们可以使用`Rx.Observable.fromEvent(DOMElement, EventName)`来取得事件的`source`，然后调用各种方法来处理这个事件流，最后通过订阅来执行我们想要完成的操作。

``` javascript
// 我们可以简单地这样使用
var res = document.getElementById('result');

var subscription = Rx.Observable.fromEvent(document, 'mousemove')
.map(function(e) {
	return {x: e.clientX, y: e.clientY}
})
.subscribe(function (data) {
	res.innerHTML = data.x + ', ' + data.y;
});
// 当触发点击事件时会调用`subscribe`的`onNext`函数，会用`innerHTML`改变DOM内容
```

会出现这样的封装

``` javascript
Rx.dom = {};

var events = "blur focus focusin focusout load resize scroll unload click dblclick " +
  "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
  "change select submit keydown keypress keyup error contextmenu";

if (root.PointerEvent) {
  events += " pointerdown pointerup pointermove pointerover pointerout pointerenter pointerleave";
}

if (root.TouchEvent) {
  events += " touchstart touchend touchmove touchcancel";
}

// 把各种事件封装到Rx.dom对象的属性上，使得直接调用Rx.dom[EventName]传入对应的DOM元素即可以创建对应的Rx的事件流
events.split(' ').forEach(function (e) {
  Rx.dom[e] = function (element, selector) {
    return Rx.Observable.fromEvent(element, e, selector);
  };
});
```

> 关于事件我们还可以使用`Rx.Observable.fromEventPattern(addHandler, [removeHandler], [selector])`，没太懂，设置了之后会调用第一个`addHandler`里面的语句，`addHandler`和`removeHandler`有同一个参数，是最后一个`selector`函数

---

## Rx.Observable.fromCallback()和Rx.Observable.fromPromise()

> 这两个方法可以分别把`Callback`函数和`Promise`对象转化为`Rx`的流，并且转化之后可以直接`subscribe`它，用`onNext`等方法处理他们`return`出来的值（或`resolve`出来的值）
``` javascript
// 随便创建一个Promise对象
var pro = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve(100)
  }, 3000)
})

// 转化
rx.Observable.fromPromise(pro)
.subscribe(function(res) {
  console.log(res)
}) 
```

---

## 处理流的一些API

> 处理`Rx`的流的API有很多，`concat`，`merge`，`filter`... `Rx`的`Observable`目测其实是`Array`里衍化出来的奇行种吧...

### merge和concat

``` javascript
var source1 = Rx.Observable.range(1, 3);
var source2 = Rx.Observable.range(1, 3);

// 打印 1 2 3 1 2 3 because concat的机制是第二个流等待第一个流完全输出完之后才会启动输出（同步）
source1.concat(source2)
   .subscribe(function (x) { console.log(x); });

// 打印 1 1 2 2 3 3 because merge的机制是两个流一起输出，两个都输出完就输出完了（异步）
source1.merge(source2)
  .subscribe(function (x) { console.log(x); });
```

### buffer

> buffer是一个十分重要的API，它给我们提高了缓存起状态和数据的机会，而不需要我们另外手动开拓一片空间储存用户的操作，并且为我们提供了阈值判断

``` javascript
// 创造一个每1秒输出1个整数的流
Rx.Observable.interval(1000)

// 缓存限制，上一个流输出5个值之后才会输出到下一个流
.bufferWithCount(5)

// 通过reduce处理上一个流的5个值，将这5个数相加
.map(function (arr) { return arr.reduce(function (acc, x) { return acc + x; }, 0); })

// 然后输出相加的总和
.subscribe(function (sum) { console.log(sum); })
```
图例
```
--1--2--3--4--5--6--7--8--9--10--...-->  // interval

-------------[1]-------------[2]--...-->  // bufferWithCount

-------------10---------------35--...-->  // map
```

> `bufferCount(count, [skip])`第一参数是限制缓存数据量，第二个参数可选，定义的是第一次与第二次缓存跳跃的个数（比如缓存5个数据，把skip设为3 ：第一次缓存 0 1 2 3 4 第二次缓存 3 4 5 6 7）。除了`bufferCount`限制缓存数据量，还可以使用`bufferTimeOrCount`来限制时间。`bufferTimeOrCount(timeSpan, count, [scheduler])`第一个参数就是时间，第二个是的数字，任意一个参数到达限制都会解除限制流入下一个流，同时开始下一次缓存
> `buffer()`可以传入一个函数，当这个流开始工作时，这个函数开始执行并根据原来的流的数据创造新的流，当这个流被成功创造，就会返回出来。同时开始下一次重新调用并重新创造。

``` javascript
// 每一秒返回
Rx.Observable.interval(1000)
  .buffer(function() {
	// 2秒后返回第一个值的流（由于在buffer中，第一个值便是缓存好的数组）
    return Rx.Observable.timer(2000)
  })
  .take(4)
  // 得到的是缓存出来的数组
  .subscribe(function(data) {
    console.log(data)
  })
  
  // 输出..---[0, 1]--[2, 3]--[4, 5]--[6, 7]---|-->
```
> `buffer(bufferOpenings, bufferClosingSelector )`还可以接受两个参数，第一个参数是一个`Observable`，会传入第二个函数作为第二个函数的参数。第一个参数为一个时间标记，当第一个`Observable`输出值的时候会触发第二个函数开始创建新的`Observable`，然后和第一种情况一样，当输出第一个值时会输出缓存的流（注意传入opening之后，开启缓存流的唯一入口只有opening）

``` javascript
// 设定一个0.5秒输出一次的流
var opening = Rx.Observable.interval(500)

Rx.Observable.interval(1000)
	// 这个流每1秒输出一次，buffer传入的opening立刻开始，0.5秒后再马上开始，再0.5秒后开始第三个...
  .buffer(opening, function(x) {
	// 当x+2000，也就是两秒多一点点之后，第一个缓存流输出，接下来0.5秒后输出第二个流，接下来再0.5秒后输出第三个...
    return Rx.Observable.timer(x + 2000)
  })
  .take(4)
  .subscribe(function(data) {
    console.log(data)
  })
  
  // 输出..---[0, 1]--[0, 1, 2]--[1, 2]--[1, 2, 3]---|-->
```

### 其实总结起来说，`buffer`这一类的`API`虽然多，而且传的参数也很多。但是用法基本上大同小异

- 我们可以看到`bufferCount`可以多传一个`skip`，来决定这一次`buffer`和下一次`buffer`的跨度（数据量的跨度）
- 而`bufferWithTime`也可以传一个`timeShift`，也是决定了两次`buffer`之间的时间跨度（时间的跨度）
- `buffer`可以多传一个`bufferOpening`，事实上也是决定两次的`buffer`之间的跨度而已（时间的跨度）

---

## 万能转接口 -> Subject

> 官方文档上说：`Subject`既是`Observer`也是`Observable`，它可以被多个`Observer`订阅，也可以订阅多个`Observable`。所以基础的`Subject`的作用就是 -> 转接器！它可以把一个单路`Observable`转换为多路相同的数据，分发给不同的订阅者
### such as
``` javascript
var Sub = new Rx.Subject()
var source = Rx.Observable.interval(1000)

// 用Subject作为观察者订阅数据源，然后再通过Subject的特性↓↓↓
source.subscribe(Sub)

// Subject可以给不同的观察者订阅，达到将单路数据推送转换成多路数据推送
Sub.subscribe(function () {
  console.log('haha')
})

Sub.subscribe(function () {
  console.log('hehe')
})
```

---

## Different Type of Subject

- `BehaviorSubject`它总是保存最近向数据消费者发送的值，当一个`Observer`订阅后，它会即刻从`BehaviorSubject`收到“最新的值”(subscribe之后会立刻触发一次当前订阅者的next)

``` javascript
var subject = new Rx.BehaviorSubject(0 /* 初始值 */);

subject.subscribe(function(v) {
	console.log('observerA: ' + v)
});

subject.onNext(1);
subject.onNext(2);

subject.subscribe(function(v) {
	console.log('observerB: ' + v)
});

subject.onNext(3);

// console
observerA: 0
observerA: 1
observerA: 2
observerB: 2
observerA: 3
observerB: 3
```
- `ReplaySubject`通过`ReplaySubject`可以向新的订阅者推送旧数值，就像一个录像机`ReplaySubject`可以记录`Observable`的一部分状态

``` javascript
var subject = new Rx.ReplaySubject(3 /* 回放数量 */);

subject.subscribe(function(v) {
	console.log('observerA: ' + v)
});

subject.onNext(1);
subject.onNext(2);
subject.onNext(3);
subject.onNext(4);

subject.subscribe(function(v) {
	console.log('observerB: ' + v)
});

subject.onNext(5);

// console
observerA: 1
observerA: 2
observerA: 3
observerA: 4
observerB: 2
observerB: 3
observerB: 4
observerA: 5
observerB: 5
```

- `AsyncSubject`是`Subject`的另外一个衍生类，`Observable`仅会在执行完成后，推送执行环境中的最后一个值。