
/**
 * [getArgs 通过正则表达式匹配函数的参数数组]
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
function getArgs (fn) {
	var found = /^[\s\(]*function[^(]*\(\s*([^)]*?)\s*\)/.exec(fn.toString())

	return found && found[1] ? found[1].split(/,\s*/) : []
}

module.exports = getArgs