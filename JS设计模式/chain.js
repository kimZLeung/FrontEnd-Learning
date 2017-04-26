/**
 * chain
 */
var A = function(selector) {
  return new A.fn.init(selector)
}

A.fn = A.prototype = {
  constructor: A,
  init: function(selector) {
    this[0] = document.getElementById(selector)
    this.length = 1
    return this
  },
  length: 2,
  size: function() {
    return this.length
  }
}

A.fn.init.prototype = A.fn

A.extend = A.fn.extend = function() {
  var i = 1,
      len = arguments.length,
      target = arguments[0],
      j;

  if(i == len) {
    target = this
    i--
  }
  for(; i < len; i++) {
    for(j in arguments[i]) {
      target[j] = arguments[i][j]
    }
  }
  return target
}

var demo = A('app')
demo.extend({
  haha: 'qwertyuwero'
})
console.log(demo.haha)
