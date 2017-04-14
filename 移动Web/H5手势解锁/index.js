import rx from 'rx'
const canvas = document.getElementsByTagName('canvas')[0]
const width = 888
canvas.width = canvas.height = width

const ctx = canvas.getContext('2d')

const drawCircle = (x, y, r) => {
	r = r ? r : ctx.canvas.width / (2 + 4 * 3)
	ctx.strokeStyle = '#ccc'
	ctx.lineWidth = 10
	ctx.beginPath()
	ctx.arc(x, y, r, 0, Math.PI * 2, true)
	ctx.closePath()
	ctx.stroke()
}

const drawLine = (p1, p2) => {
	ctx.beginPath()
	ctx.lineWidth = 3
	ctx.moveTo(p1.x, p1.y)
	ctx.lineTo(p2.x, p2.y)
	ctx.stroke()
	ctx.closePath()
}

const createCircles = (num) => {
	console.log('dist')
	const n = num ? num : 3
	const r = ctx.canvas.width / (2 + 4 * n)
	const circles = []
	for(var i = 0; i < n; i++) {
		for(var j = 0; j < n; j++) {
			const p = {
				x: j * 4 * r + 3 * r,
				y: i * 4 * r + 3 * r,
				id: i * 3 + j
			}
			circles.push(p)
		}
	}
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
	circles.forEach((c) => {
		drawCircle(c.x, c.y, n)
	})
}

const bindEvent = (dom, startFunc, moveFunc, endFunc) => {
	dom.addEventListener("touchstart", startFunc, false)
	dom.addEventListener("touchmove", moveFunc, false)
	dom.addEventListener("touchend", endFunc, false)
}

createCircles()