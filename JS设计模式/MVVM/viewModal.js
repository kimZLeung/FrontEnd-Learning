function vm(option) {
  this._option = option
  var data = option.data
  var dom = option.dom
  new Observer(data)
  new Compiler(dom, data)
}

vm.prototype.setData = function(path, newData) {
  var data = this._option.data
  var arr = path.split('.')

  arr.forEach(function(item, i) {
    if(i == arr.length - 1) {
      data[item] = newData
    }
    data = data[item]
  })
}

vm.prototype.getData = function(path) {
  var data = this._option.data
  var arr = path.split('.')

  arr.forEach(function(item, i) {
    data = data[item]
  })

  return data
}
