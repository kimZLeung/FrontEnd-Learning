
/**
 * [arg 参数]
 * @type {[泛型用于函数的输入输出保持一样类型的限制]}
 */
function identity<T>(arg: T): T {
	return arg
}