var Container = function(x) {
	this._value = x
}

Container.of = function(x) {
	return new Container(x)
}

Container.prototype.map = function(fn) {
	return Container.of(fn(this._value))
}

var c = Container.of(2)

console.log(
	c.map(function(data) {
		return data + 1
	}).map(function(data) {
		return data - 3
	})
)

console.log(c)
