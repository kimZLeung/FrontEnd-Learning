function Observer(data) {
  this.data = data
  this.init()
}

Observer.prototype.init = function() {
  var self = this
  var data = this.data
  Object.keys(data).forEach(function(key) {
    self.define(data, key, data[key])
  })
}

Observer.prototype.define = function(data, key, val) {
  var upList = new Dep()
  var child = observe(val)
  this.data['__' + key] = upList

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get: function() {
      return val
    },
    set: function(newVal) {
      if(val == newVal) {
        return
      }
      val = newVal
      child = observe(newVal)
      upList.notify()
    }
  })
}

function observe(value) {
  if(!value || typeof value !== 'object') {
    return
  }

  return new Observer(value)
}

function Dep() {
  this.fnArr = []
}

Dep.prototype.add = function(fn) {
  if(Object.prototype.toString.call(fn) == '[object Function]') {
    this.fnArr.push(fn)
  }
}

Dep.prototype.notify = function() {
  this.fnArr.forEach(function(fn) {
    fn()
  })
}
