var Rx = require('rx')


var Sub = new Rx.Subject()
var source = Rx.Observable.interval(1000)

source.subscribe(Sub)

// Subject可以给不同的观察者订阅，达到将单路数据推送转换成多路数据推送
Sub.subscribe(function () {
  console.log('haha')
})

Sub.subscribe(function () {
  console.log('hehe')
})