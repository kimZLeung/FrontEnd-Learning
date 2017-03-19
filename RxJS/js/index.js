var rx = require('rx')

var c = document.querySelector('#app')

console.log()
// console.log(rx)

const ctx = c.getContext('2d')

ctx.beginPath()

const down$ = Rx.Observable.fromEvent(c, 'mousedown')
  .map(() => 'down')
const up$ = Rx.Observable.fromEvent(c, 'mouseup')
  .map(() => 'up')

const upAndDown$ = up$.merge(down$)

const move$ = Rx.Observable.fromEvent(c, 'mousemove')
  .map(e => {
  	return { x: e.offsetX, y: e.offsetY }
  })
  .bufferCount(2, 1)

upAndDown$
  .switchMap(action =>
    action === 'down' ? move$ : Rx.Observable.empty()
  )
  .subscribe(draw)
  
function draw ([first, sec]) {
  ctx.moveTo(first.x, first.y)
  ctx.lineTo(sec.x, sec.y)
  ctx.stroke()
}

window.addEventListener("resize", resizeCanvas, false);

function resizeCanvas() {
    c.width = window.innerWidth/2;	
    c.height = window.innerHeight/2;
}