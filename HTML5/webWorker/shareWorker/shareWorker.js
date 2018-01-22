var from = ''

self.onconnect = function (e) {
	var port = e.ports[0]

	port.onmessage = function (e) {
		var list = e.data
		from += list[2]
		var res = Number(list[0]) + Number(list[1])
		port.postMessage(res + '   ' + from)
	}
}