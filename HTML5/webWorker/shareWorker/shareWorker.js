self.onconnect = function (e) {
	var port = e.ports[0]

	port.onmessage = function (e) {
		var res = Number(e.data[0]) + Number(e.data[1])
		port.postMessage(res)
	}
}