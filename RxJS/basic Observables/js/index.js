var rx = require('rx')

rx.Observable.create(function(observer) {
	observer.onNext(42)
	observer.onCompleted()

	return function() {
		console.log('disposed')
	}
})
.subscribe(function(x) {
	console.log('onNext: ', x)
}, function(e) {
	console.log('onError: ', e)
}, function() {
	console.log('onCompleted')
})

rx.Observable.range(1, 10)
.take(8)
.map(function(val) {
	return (val + 1)
})
.subscribe(function(x) {
	console.log('onNext: ', x)
}, null, function() {
	console.log('over')
})

var source = Rx.Observable.interval(1000);

var subscription1 = source.subscribe(
  function (x) { console.log('Observer 1: onNext: ' + x); },
  function (e) { console.log('Observer 1: onError: ' + e.message); },
  function () { console.log('Observer 1: onCompleted'); });

var subscription2 = source.subscribe(
  function (x) { console.log('Observer 2: onNext: ' + x); },
  function (e) { console.log('Observer 2: onError: ' + e.message); },
  function () { console.log('Observer 2: onCompleted'); });

setTimeout(function () {
  subscription1.dispose();
  subscription2.dispose();
}, 5000);




// console.log('Current time: ' + Date.now());

// var source = Rx.Observable.interval(1000);

// var hot = source.publish();

// var subscription1 = hot.subscribe(
//   function (x) { console.log('Observer 1: onNext: %s', x); },
//   function (e) { console.log('Observer 1: onError: %s', e); },
//   function () { console.log('Observer 1: onCompleted'); });

// console.log('Current Time after 1st subscription: ' + Date.now());

// setTimeout(function () {

//   hot.connect();

//   console.log('Current Time after connect: ' + Date.now());

//   setTimeout(function () {

//     console.log('Current Time after 2nd subscription: ' + Date.now());

//     var subscription2 = hot.subscribe(
//       function (x) { console.log('Observer 2: onNext: %s', x); },
//       function (e) { console.log('Observer 2: onError: %s', e); },
//       function () { console.log('Observer 2: onCompleted'); });

//   }, 3000);
// }, 3000);


var source = Rx.Observable.interval(1000);
var hot = source.publish()
hot.connect()
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