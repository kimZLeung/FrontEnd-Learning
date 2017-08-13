# RxJS

---

## ������RxJS

> `Rx` = `Observables` + `LINQ` + `Schedulers` ���ҷ���������

### ��ʵ�����첽��������

---
## ��Ϊ�첽������

- ҳ���ϵ�һЩ����¼��������û����ʱ�첽����
- һЩ�첽������������ڷ�������Ӧʱ�첽����������Ϊ

��`Rx`��Ϊ�����ṩ��һϵ�еĹ�����������Щ�첽����

---

## marbleͼ

```
	--a--b---c-d--|-->
```

���ǿ��԰����ĸ��㿴���ĸ���ͬʱ�䴥���ĵ���¼���
Ȼ�����ǿ��԰�����첽����·����һ����ά���顣
����һ�����͵�`Observable`�����ݽṹ

---

## Observables

`Observable`��Ϊһ���첽�����飬���Ͱ�����һЩ����ķ�����Ҳ������������������Щ�첽�������ķ���`operator`

> `Observables`����һ���ܰ���������ʵ����ʽ���� ---> ����ÿ�ε���`operator`���᷵��һ��������һ��`operator`���µ�`Observables`

���ǿ��Զ���`subscribe`һ���趨�õ���`Observables`���������¼����Ǳ��ʲô����ִ��������Ҫʵ�ֵ���Ϊ

---

## Subscribe

`subscribe`��һ���������ķ���������������Դ��������������ֱ�����������`onNext`��`onError`��`onCompleted`

- `onNext`����`Observable`����`onNext()`����ʱ����ã�һ�����¼�����ʱ�ͻ���ã��������Ǵ����¼�ʱ`subscribe`ֻ������һ���ص���ʵ��`onNext`��������������Լ�`create`��`Observer`���Ե���`Observable`��`onNext`����ȥ����`onNext`�ص�
- `onError`����...�͸�`Promise`�Ǹ���࣬�׳�����ʱ����
- `onCompleted`������������Լ�`create`��`Observable`�Ļ�������`Observer`��`onCompleted`�����������`Observable`����������ص�����

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

> `subscribe`��������һ��`observer`���󣬵��øö����ϵ�`dispose`��������ȡ������

---

## ��Observables����Observables

> ����˼�壬��`Observables`�������¼�һ���`Observable`���������Ŷ��Ķ���ʼ�����������ݣ�����ÿʱÿ�̶��ڸ������ݡ�
Ȼ����`Observables`��ֻ��������`subscribe`֮��ŻῪʼ���ݸ��º����ͣ��������Լ���`interval`����������`Observable`��interval���������Ļ��ڶ��ĺ�ÿ**��Ĭ�ϴ�1��ʼ����������

����Ҳ������`publish`������`Cold Observables`ת��Ϊ`Hot Observables`

``` javascript
var source = Rx.Observable.interval(1000);
var hot = source.publish()	// ʹ��publish����ת��ΪHot Observables
hot.connect()				// Ȼ��ʹ��connect�����������ݸ���
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

## �������¼�������

> ��`RxJS`�У����ǿ���ʹ��`Rx.Observable.fromEvent(DOMElement, EventName)`��ȡ���¼���`source`��Ȼ����ø��ַ�������������¼��������ͨ��������ִ��������Ҫ��ɵĲ�����

``` javascript
// ���ǿ��Լ򵥵�����ʹ��
var res = document.getElementById('result');

var subscription = Rx.Observable.fromEvent(document, 'mousemove')
.map(function(e) {
	return {x: e.clientX, y: e.clientY}
})
.subscribe(function (data) {
	res.innerHTML = data.x + ', ' + data.y;
});
// ����������¼�ʱ�����`subscribe`��`onNext`����������`innerHTML`�ı�DOM����
```

����������ķ�װ

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

// �Ѹ����¼���װ��Rx.dom����������ϣ�ʹ��ֱ�ӵ���Rx.dom[EventName]�����Ӧ��DOMԪ�ؼ����Դ�����Ӧ��Rx���¼���
events.split(' ').forEach(function (e) {
  Rx.dom[e] = function (element, selector) {
    return Rx.Observable.fromEvent(element, e, selector);
  };
});
```

> �����¼����ǻ�����ʹ��`Rx.Observable.fromEventPattern(addHandler, [removeHandler], [selector])`��û̫����������֮�����õ�һ��`addHandler`�������䣬`addHandler`��`removeHandler`��ͬһ�������������һ��`selector`����

---

## Rx.Observable.fromCallback()��Rx.Observable.fromPromise()

> �������������Էֱ��`Callback`������`Promise`����ת��Ϊ`Rx`����������ת��֮�����ֱ��`subscribe`������`onNext`�ȷ�����������`return`������ֵ����`resolve`������ֵ��
``` javascript
// ��㴴��һ��Promise����
var pro = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve(100)
  }, 3000)
})

// ת��
rx.Observable.fromPromise(pro)
.subscribe(function(res) {
  console.log(res)
}) 
```

---

## ��������һЩAPI

> ����`Rx`������API�кܶ࣬`concat`��`merge`��`filter`... `Rx`��`Observable`Ŀ����ʵ��`Array`���ܻ������������ְ�...

### merge��concat

``` javascript
var source1 = Rx.Observable.range(1, 3);
var source2 = Rx.Observable.range(1, 3);

// ��ӡ 1 2 3 1 2 3 because concat�Ļ����ǵڶ������ȴ���һ������ȫ�����֮��Ż����������ͬ����
source1.concat(source2)
   .subscribe(function (x) { console.log(x); });

// ��ӡ 1 1 2 2 3 3 because merge�Ļ�����������һ�������������������������ˣ��첽��
source1.merge(source2)
  .subscribe(function (x) { console.log(x); });
```

### buffer

> buffer��һ��ʮ����Ҫ��API��������������˻�����״̬�����ݵĻ��ᣬ������Ҫ���������ֶ�����һƬ�ռ䴢���û��Ĳ���������Ϊ�����ṩ����ֵ�ж�

``` javascript
// ����һ��ÿ1�����1����������
Rx.Observable.interval(1000)

// �������ƣ���һ�������5��ֵ֮��Ż��������һ����
.bufferWithCount(5)

// ͨ��reduce������һ������5��ֵ������5�������
.map(function (arr) { return arr.reduce(function (acc, x) { return acc + x; }, 0); })

// Ȼ�������ӵ��ܺ�
.subscribe(function (sum) { console.log(sum); })
```
ͼ��
```
--1--2--3--4--5--6--7--8--9--10--...-->  // interval

-------------[1]-------------[2]--...-->  // bufferWithCount

-------------10---------------35--...-->  // map
```

> `bufferCount(count, [skip])`��һ���������ƻ������������ڶ���������ѡ��������ǵ�һ����ڶ��λ�����Ծ�ĸ��������绺��5�����ݣ���skip��Ϊ3 ����һ�λ��� 0 1 2 3 4 �ڶ��λ��� 3 4 5 6 7��������`bufferCount`���ƻ�����������������ʹ��`bufferTimeOrCount`������ʱ�䡣`bufferTimeOrCount(timeSpan, count, [scheduler])`��һ����������ʱ�䣬�ڶ����ǵ����֣�����һ�������������ƶ���������������һ������ͬʱ��ʼ��һ�λ���
> `buffer()`���Դ���һ�����������������ʼ����ʱ�����������ʼִ�в�����ԭ�����������ݴ����µ���������������ɹ����죬�ͻ᷵�س�����ͬʱ��ʼ��һ�����µ��ò����´��졣

``` javascript
// ÿһ�뷵��
Rx.Observable.interval(1000)
  .buffer(function() {
	// 2��󷵻ص�һ��ֵ������������buffer�У���һ��ֵ���ǻ���õ����飩
    return Rx.Observable.timer(2000)
  })
  .take(4)
  // �õ����ǻ������������
  .subscribe(function(data) {
    console.log(data)
  })
  
  // ���..---[0, 1]--[2, 3]--[4, 5]--[6, 7]---|-->
```
> `buffer(bufferOpenings, bufferClosingSelector )`�����Խ���������������һ��������һ��`Observable`���ᴫ��ڶ���������Ϊ�ڶ��������Ĳ�������һ������Ϊһ��ʱ���ǣ�����һ��`Observable`���ֵ��ʱ��ᴥ���ڶ���������ʼ�����µ�`Observable`��Ȼ��͵�һ�����һ�����������һ��ֵʱ��������������ע�⴫��opening֮�󣬿�����������Ψһ���ֻ��opening��

``` javascript
// �趨һ��0.5�����һ�ε���
var opening = Rx.Observable.interval(500)

Rx.Observable.interval(1000)
	// �����ÿ1�����һ�Σ�buffer�����opening���̿�ʼ��0.5��������Ͽ�ʼ����0.5���ʼ������...
  .buffer(opening, function(x) {
	// ��x+2000��Ҳ���������һ���֮�󣬵�һ�������������������0.5�������ڶ���������������0.5������������...
    return Rx.Observable.timer(x + 2000)
  })
  .take(4)
  .subscribe(function(data) {
    console.log(data)
  })
  
  // ���..---[0, 1]--[0, 1, 2]--[1, 2]--[1, 2, 3]---|-->
```

### ��ʵ�ܽ�����˵��`buffer`��һ���`API`��Ȼ�࣬���Ҵ��Ĳ���Ҳ�ܶࡣ�����÷������ϴ�ͬС��

- ���ǿ��Կ���`bufferCount`���Զഫһ��`skip`����������һ��`buffer`����һ��`buffer`�Ŀ�ȣ��������Ŀ�ȣ�
- ��`bufferWithTime`Ҳ���Դ�һ��`timeShift`��Ҳ�Ǿ���������`buffer`֮���ʱ���ȣ�ʱ��Ŀ�ȣ�
- `buffer`���Զഫһ��`bufferOpening`����ʵ��Ҳ�Ǿ������ε�`buffer`֮��Ŀ�ȶ��ѣ�ʱ��Ŀ�ȣ�

---

## ����ת�ӿ� -> Subject

> �ٷ��ĵ���˵��`Subject`����`Observer`Ҳ��`Observable`�������Ա����`Observer`���ģ�Ҳ���Զ��Ķ��`Observable`�����Ի�����`Subject`�����þ��� -> ת�����������԰�һ����·`Observable`ת��Ϊ��·��ͬ�����ݣ��ַ�����ͬ�Ķ�����
### such as
``` javascript
var Sub = new Rx.Subject()
var source = Rx.Observable.interval(1000)

// ��Subject��Ϊ�۲��߶�������Դ��Ȼ����ͨ��Subject�����ԡ�����
source.subscribe(Sub)

// Subject���Ը���ͬ�Ĺ۲��߶��ģ��ﵽ����·��������ת���ɶ�·��������
Sub.subscribe(function () {
  console.log('haha')
})

Sub.subscribe(function () {
  console.log('hehe')
})
```

---

## Different Type of Subject

- `BehaviorSubject`�����Ǳ�����������������߷��͵�ֵ����һ��`Observer`���ĺ����ἴ�̴�`BehaviorSubject`�յ������µ�ֵ��(subscribe֮������̴���һ�ε�ǰ�����ߵ�next)

``` javascript
var subject = new Rx.BehaviorSubject(0 /* ��ʼֵ */);

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
- `ReplaySubject`ͨ��`ReplaySubject`�������µĶ��������;���ֵ������һ��¼���`ReplaySubject`���Լ�¼`Observable`��һ����״̬

``` javascript
var subject = new Rx.ReplaySubject(3 /* �ط����� */);

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

- `AsyncSubject`��`Subject`������һ�������࣬`Observable`������ִ����ɺ�����ִ�л����е����һ��ֵ��