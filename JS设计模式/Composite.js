var inherit = require('./inheritPrototype').inherit

/**
 * [News 创建基类]
 */
function News() {
  this.children = []
  this.element = null
}

News.prototype = {
  constructor: News,
  init: function() {
    console.log('init')
  },
  add: function() {
    console.log('add')
  },
  getElement: function() {
    console.log('getElement')
  }
}

/**
 * [Container 继承基类的容器类]
 * @param {[type]} id     [description]
 * @param {[type]} parent [description]
 */
function Container(id, parent) {
  News.call(this)
  this.id = id
  this.parent = parent
  this.init()
}

inherit(Container, News)

Container.prototype.init = function() {
  this.element = document.createElement('ul')
  this.element.id = this.id
  this.element.className = 'newContainer'
}

Container.prototype.add = function(child) {
  this.children.push(child)
  this.element.appendChild(child.getElement())
  return this
}

Container.prototype.getElement = function() {
  return this.element
}

Container.prototype.show = function() {
  this.parent.appendChild(this.element)
}

/**
 * [IconNews 创建新闻子类]
 * @param {[type]} text [内容]
 * @param {[type]} href [图片链接地址]
 * @param {[type]} type [图标类型]
 */
function IconNews(text, href, type) {
  News.call(this)
  this.text = text || ''
  this.href = href || ''
  this.type = type || ''
  this.init()
}

inheritPrototype(IconNews, News)

IconNews.prototype.init = function() {
  this.element = document.createElement('a')
  this.element.innerHTML = this.text
  this.element.href = this.href
  this.element.className = 'icon' + this.type
}

IconNews.prototype.add = function() {}

IconNews.prototype.getElement = function() {
  return this.element
}

/**
 * 组合模式：
 *
 * 通过继承News基类和自己定义的一些属于自己的属性，
 * 以上两个类可以进行父子类的交互，可以很方便地自由组合出不同的样子
 */
