function Compiler(dom) {
  this.dom = document.querySelector(dom)

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

Compiler.prototype.isEventDirective = function(method) {
  return method.indexOf('on') == 0
}

Compiler.prototype.scan = function(baseDOM) {
  var root = baseDOM || this.dom
  var childNodes = root.childNodes
  var self = this
  [].slice.call(childNodes).forEach(function(node) {
    var text = node.textContent
    var reg = /\{\{(.*)\}\}/

    if(self.isElement(node)) {
      self.compile(node)
    } else if(self.isTextNode(node) && reg.text(text)) {
      self.compileText(node, RegExp.$1)
    }

    if(node.childNodes && node.childNodes.length) {
      self.scan(node)
    }
  })
}

Compiler.prototype.compile = function(node) {
  var attr = node.attributes, self = this
  [].slice.call(attr).forEach(function(a) {
    var attrName = a.name
    if(self.isV(attrName)) {
      var val = a.value
      var method = attrName.substring(2)
      if(self.isEventMethod(method)) {
        Compiler.method.eventHandler(node, self, val, method)
      } else {
        Compiler.method[method] && Compiler.method[method](node, self, val)
      }
    }
  })
}


Compiler.prototype.method = {
  eventHandler: function() {

  },
  text: function(node, vm, val) {

  },
  html: function(node, vm, val) {

  },
  model: function(node, vm, val) {

  },
  class: function(node, vm, val) {

  },
  eventHandler: function(node, vm, val, method) {

  },
  bind: function(node, vm, val, method) {

  }
}
