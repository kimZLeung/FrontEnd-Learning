function vm(option) {
  this._option = option
  var data = option.data
  var dom = option.dom
  new Observer(data)
  // 可能会进行重新渲染来重新push dep队列的事件
  this._compiler = new Compiler(dom, data)
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
