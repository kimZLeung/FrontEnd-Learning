function bb() {
	return new Promise((s, r) => {
		setTimeout(() => {
			s('haha')
		}, 2000)
	})
}

await bb()
// bb().then((res) => {
// 	console.log(res)
// })
console.log(1)