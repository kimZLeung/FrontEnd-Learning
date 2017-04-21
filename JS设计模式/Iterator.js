/**
 * [Iterator 通过迭代器可以轻松通过传页面上的元素获得一堆元素的数组，并对这堆元素进行操作]
 * @param {[string]} items     [dom节点的名字]
 * @param {[string]} container [dom容器的id]
 */
var Iterator = function(items, container) {
  var container = container && document.getElementById(container) || document
  items = container.getElementsByTagName(items)
  length = items.length
  index = 0
  var splice = [].splice

  return {
    first: function() {
      index = 0
      return items[index]
    },
    second: function() {
      index = length - 1
      return items[index]
    },
    pre: function() {
      if(--index > 0) {
        return items[index]
      } else {
        index = 0
        return null
      }
    },
    next: function() {
      if(++index < length) {
        return items[index]
      } else {
        index = length - 1
        return null
      }
    },
    dealEach: function(fn) {
      var args = splice.call(arguments, 1)
      for(var i; i < length; i++) {
        fn.apply(items[i], args)
      }
    },
    get: function(num) {
      index = num >= 0 ? num % length : num % length + length
      return items[index]
    },
    dealItem: function(num, fn) {
      fn.apply(this.get(num), splice.call(arguments, 2))
    },
    exclusive: function(num, allFn, numFn) {
      this.dealEach(allFn)
      if(Object.prototype.toString.call(num) === '[object Array]') {
        for(var i = 0, len = num.length; i < len; i++) {
          this.dealItem(num[i], numFn)
        }
      } else {
        this.dealItem(num, numFn)
      }
    }

  }
}
