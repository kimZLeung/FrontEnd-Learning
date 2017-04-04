var jPromise = require('./justPromise').jPromise

// new jPromise(function(resolve, reject) {
// 	setTimeout(function() {
// 		resolve('123')
// 	}, 2000)
// }).then(function(data) {
// 	console.log(data)
// 	return data
// }).then(function(data) {
// 	console.log(123)
// })


// new jPromise(function(resolve) {
// 	resolve('123')
// }).then(function(data) {
// 	return data + 1
// }).then(function(res) {
// 	console.log(res)
// })

// new jPromise(function(resolve) {
// 	resolve('123')
// }).then(function(data) {
// 	console.log(data)
// 	return new jPromise(function (resolve) {
// 		resolve('100')
// 	})
// }).then(function(res) {
// 	console.log(res)
// })


new jPromise(function(resolve) {
	resolve('123')
}).then(function(data) {
	console.log(data)
	return new jPromise(function (resolve) {
		setTimeout(function() {
			resolve('100')
		}, 1000)
	})
}).then(function(res) {
	console.log(res)
})