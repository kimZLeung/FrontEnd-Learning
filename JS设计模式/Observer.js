/**
 * [Observer 实现一个观察者，可以用这个观察者来注册事件，并用这个观察者触发注册好的事件]
 * @type
 */
var Observer = (function() {
  var _message = {}
  return {
    regist: function(eventName, fn) {
      if(typeof _message[eventName] === 'undefined') {
        _message[eventName] = [fn]
      } else {
        _message[eventName].push(fn)
      }
    },
    fire: function(eventName, params) {
      if(!_message[eventName]) {
        return
      }
      var events = {
        type: eventName,
        params: params || {}
      }
      len = _message[eventName].length
      for(var i = 0; i < len; i++) {
        _message[eventName][i].call(this, events)
      }
    },
    remove: function(eventName, fn) {
      if(_message[eventName] instanceof Array) {
        var i = _message[eventName].length - 1
        for(; i >= 0; i--) {
          _message[eventName][i] === fn && _message[eventName].splice(i, 1)
        }
      }
    }
  }
})()


Observer.regist('haha', function(e) {
  console.log(e.params)
})

Observer.fire('haha', {
  'otk': 'wowow',
  'er': 're'
})
