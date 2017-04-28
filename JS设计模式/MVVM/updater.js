function Updater(path, val, fn, vm) {
  this.vm = vm
  this.path = path
  this.val = val
  this.fn = fn

  this.value = this.getVal()

}

Updater.prototype.update = function() {
  var self = this
  return function() {
    var newVal = self.getVal()
    var oldVal = self.value

    if(oldVal !== newVal) {
      self.value = newVal
      self.fn.call(self.vm, newVal, oldVal)
    }
  }
}

Updater.prototype.addDep = function(dep) {
  dep.add(this.update())
}

Updater.prototype.getVal = function() {
  var value = this.vm
  var list = this.path.split('.')

  list.forEach(function(data) {
    value = value[data]
  })

  return value
}
