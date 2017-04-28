function Compiler(dom, vm) {
  this.dom = document.querySelector(dom) || null
  this.vm = vm

  // this.scan(this.dom)
  // return

  var data = this.toFragment()
  if(data.res) {
    this.scan(data.node)
    this.dom.appendChild(data.node)
  } else {
    // 同步渲染不会覆盖掉原来DOM节点的内容
    setTimeout(function() {
      document.write(data.node)
    }, 0)
  }
}

Compiler.prototype.toFragment = function() {
  if(this.dom) {
    var fragment = document.createDocumentFragment()
    var child
    while(child = this.dom.firstChild) {
      fragment.appendChild(child)
    }
    return {
      node: fragment,
      res: true
    }
  } else {
    var fragment = '<h1>还未传入合适的DOM节点进行数据绑定解析</h1>'
    return {
      node: fragment,
      res: false
    }
  }
}

Compiler.prototype.isElement = function(node) {
  return node.nodeType == 1
}

Compiler.prototype.isTextNode = function(node) {
  return node.nodeType == 3
}

Compiler.prototype.isV = function(attrName) {
  return attrName.indexOf('v-') == 0
}

Compiler.prototype.isEventMethod = function(method) {
  return method.indexOf('on') == 0
}

Compiler.prototype.scan = function(baseDOM) {
  var root = baseDOM || this.dom
  var childNodes = root.childNodes
  var self = this
  Array.prototype.slice.call(childNodes).forEach(function(node) {
    var text = node.textContent
    var reg = /\{\{(.*)\}\}/

    if(self.isElement(node)) {
      self.compile(node)
    } else if(self.isTextNode(node) && reg.test(text)) {
      self.compileText(node, RegExp.$1)
    }

    if(node.childNodes && node.childNodes.length) {
      self.scan(node)
    }
  })
}

Compiler.prototype.compile = function(node) {
  var attr = node.attributes, self = this
  Array.prototype.slice.call(attr).forEach(function(a) {
    var attrName = a.name
    if(self.isV(attrName)) {
      var val = a.value
      var method = attrName.substring(2)
      if(self.isEventMethod(method)) {
        self.method.eventHandler(node, this.vm, val, method)
      } else {
        self.method[method] && self.method[method](node, self.vm, val)
      }
    }
  })
}

Compiler.prototype.compileText = function(node, text) {
  // 进行删除空格的处理
  text = text.replace(/\s*/g, '')
  this.method.text(node, this.vm, text)
}

Compiler.prototype.method = {
  eventHandler: function(node, vm, val, method) {
    // TODO
  },
  text: function(node, vm, val) {
    this.bind(node, vm, val, 'text')
  },
  html: function(node, vm, val) {
    this.bind(node, vm, val, 'html')
  },
  model: function(node, vm, val) {
    this.bind(node, vm, val, 'model')

    var self = this
    var oldVal = self.getVal(vm, val).value
    node.addEventListener('input', function(e) {
      var newVal = e.target.value
      if(oldVal == newVal) {
        return
      }
      self.setVal(vm, val, newVal)
      oldVal = newVal
    }, false)
  },
  class: function(node, vm, val) {
    this.bind(node, vm, val, 'class')
  },
  bind: function(node, vm, val, method) {
    var value = this.getVal(vm, val)
    refresher[method] && refresher[method](node, value.value)

    // new updater 进行节点数据绑定，把对应的更新方法加到数据劫持的回调函数之中
    new Updater(val, value.value, function(newVal, oldVal) {
      refresher[method](node, newVal, oldVal)
    }, vm).addDep(value.dep)
  },
  getVal: function(vm, val) {
    var dataList = val.split('.')
    var value = vm
    var dep = null
    dataList.forEach(function(data, i) {
      if(i == dataList.length - 1) {
        dep = value['__' + data]
      }
      value = value[data]
    })
    return {
      value: value,
      dep: dep
    }
  },
  setVal: function(vm, val, newVal) {
    var dataList = val.split('.')
    var value = vm
    dataList.forEach(function(data, i) {
      if(i < dataList.length - 1) {
        value = value[data]
      } else {
        value[data] = newVal
      }
    })
  }
}

var refresher = {
  text: function(node, val) {
    node.textContent = typeof val == 'undefined' ? '' : val
  },
  html: function(node, val) {
    node.innerHTML = typeof val == 'undefined' ? '' : val
  },
  model: function(node, val, oldVal) {
    node.value = typeof val == 'undefined' ? '' : val
  },
  class: function(node, val, oldVal) {
    var className = node.className
    className = className.replace(oldVal, '').replace(/\s$/, '')
    var space = className && String(value) ? ' ' : ''
    node.className = className + space + value
  },
}
