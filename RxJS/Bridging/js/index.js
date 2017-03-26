var btn = document.getElementById('ha')

var Rx = require('rx'),
  EventEmitter = require('events').EventEmitter;

var eventEmitter = new EventEmitter();

var source = Rx.Observable.fromEvent(eventEmitter, 'data')

var subscription = source.subscribe(function (data) {
  console.log('data: ' + data);
});

eventEmitter.emit('data', 'foo');
eventEmitter.emit('data', 'hahahah');

// Rx.Observable.fromEventPattern(function add(h) {
//   btn.onclick = function(e) {
//     console.log('add')
//   }
// }, function remove(h) {
//   console.log('remove')
// })
// .subscribe(function(e) {
//   console.log('haha')
// })

var EventEmitter = require('events').EventEmitter,
    Rx = require('rx');

var e = new EventEmitter();

// Wrap EventEmitter
var source = Rx.Observable.fromEventPattern(
  function add (h) {
    e.addListener('data', h);
    // console.log(h)
  },
  function remove (h) {
    e.removeListener('data', h);
  },
  function (foo, bar) {
    return 'haha';
  }
);

var subscription = source.subscribe(
  function (result) {
    console.log('Next: %s', result);
  },
  function (err) {
    console.log('Error: ' + err);
  },
  function () {
    console.log('Completed');
  });

e.emit('data', 'foo', 'bar');

var pro = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve(100)
  }, 3000)
})

Rx.Observable.fromPromise(pro)
.subscribe(function(res) {
  console.log(res)
}) 

var source1 = Rx.Observable.range(1, 3);
var source2 = Rx.Observable.range(1, 3);

// 打印 1 2 3 1 2 3
source1.concat(source2)
   .subscribe(function (x) { console.log(x); });

// 打印 1 1 2 2 3 3
source1.merge(source2)
  .subscribe(function (x) { console.log(x); });

// 创造一个每1秒输出1个整数的流
Rx.Observable.interval(1000)
// 缓存限制，上一个流输出5个值之后才会输出到下一个流
.bufferWithCount(5)
// 通过reduce处理上一个流的5个值，将这5个数相加
.map(function (arr) { console.log(arr);return arr.reduce(function (acc, x) { return acc + x; }, 0); })
// 然后输出相加的总和
.subscribe(function (sum) { console.log(sum); })



var option = Rx.Observable.interval(500)

Rx.Observable.interval(1000)
  .buffer(option, function(x) {
    // console.log(x)
    return Rx.Observable.timer(x + 2000)
  })
  .take(4)
  .subscribe(function(data) {
    console.log(data)
  })