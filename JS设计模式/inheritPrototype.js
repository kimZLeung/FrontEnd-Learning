/**
 * [inheritObject 返回一个继承父对象的纯净实例]
 * @param  {[type]} o [父对象]
 * @return {[type]}   [纯净的实例对象]
 */
function inheritObject(o) {
  function F() {}
  F.prototype = o
  return new F()
}

/**
 * [inheritPrototype 利用上面方法返回的纯净的对象（即只包含父对象原型上的属性的对象），作原型继承]
 * @param  {[type]} subClass   [子类]
 * @param  {[type]} superClass [父类]
 * @return {[type]}            [undefined]
 */
function inheritPrototype(subClass, superClass) {
  var p = inheritObject(superClass.prototype)
  p.constructor = subClass
  subClass.prototype = p
}

module.exports =  {
  inherit: inheritObject
}
