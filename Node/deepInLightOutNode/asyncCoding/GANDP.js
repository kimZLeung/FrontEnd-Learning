
function run(gen) {
	var args = [].slice.call(arguments, 1), it
	it = gen.apply(this, args)

	return Promise.resolve()
		.then(function handleNext(res) {
			var next = it.next(res)

			return (function handleRes(next) {
				if(next.done) {
					return next.value
				} else {
					return Promise.resolve(next.value)
						.then(handleNext, function handleError(err) {
							return Promise.resolve(it.throw(err))
								.then(handleRes)
						})
				}
			})(next)

		})
}

module.exports = run