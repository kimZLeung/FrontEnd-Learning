/**
 * [addMethod 用于给类的原型添加方法的，可以直接通过构造函数调用访问方法，在对应的类的原型上加入传入的函数]
 * @param {[type]}   name [description]
 * @param {Function} fn   [description]
 */
Function.prototype.addMethod = function(name, fn) {
	this.prototype[name] = fn
	return this
}
