function curry(fn, length) {
	var len = length || fn.length
	return function() {
		var innerLen = arguments.length
		if(arguments.length < len) {
			var combined = [fn].concat(toArray(arguments))
			return curry(subCurry.apply(this, combined), len - innerLen)
		} else {
			return fn.apply(this, arguments)
		}
	}
}

function subCurry(fn) {
	var args = Array.prototype.slice.call(arguments, 1)
	return function() {
		return fn.apply(this, args.concat(toArray(arguments)))
	}
}

function toArray(arr) {
	return Array.prototype.slice.call(arr)
}


// test
function add(a, b, c) {
	console.log('result', a + b + c)
}

var cAdd = curry(add)

cAdd(1)(2)(3)
cAdd(1, 2)(3)
cAdd(1)(2, 3)
cAdd(1, 2, 3)