
/**
 * [pageScroll 调用go方法启动]
 * @return {[type]} [description]
 */
var pageScroll = function() {
	var animation = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	var monitorHigh = document.body.clientHeight
	var flag = 0
	var getHigh = null
	var animate = void 1234567891011121314151617181920
	animate = {}
	/**
	 * [saveHigh 第一次调用保存高度，第二次调用返回高度]
	 * @param  {[type]} high [传入高度]
	 * @return {[type]}      [description]
	 */
	function saveHigh(high) {
		var st
		if(high) {
			st = high
		}
		return function(setter) {
			if(setter) {
				st = setter
			}
			return st
		}
	}
	// var sh = infor.thisHigh

	return {
		isBottom: function() {
			if(document.body.clientHeight + Number.parseInt(document.body.scrollTop.toPrecision(4)) == document.body.scrollHeight) {
				return true
			} else {
				return false
			}
		},
		isTop: function() {
			if(window.scrollY == 0) {
				return true
			} else {
				return false
			}
		},
		scrollDown: function(timeStamp) {
			var high = window.scrollY
			if(flag == 0) {
				getHigh = saveHigh(high + monitorHigh)
				flag = 1
			}
			if(window.scrollY < getHigh()) {
				if(pageScroll.isBottom()) {
					flag = 0
					return
				}
				var pos = window.scrollY + 20
				scrollTo(0, pos)
				animate.down = animation(pageScroll.scrollDown)
			} else {
				flag = 0
			}
		},
		scrollUp: function(timeStamp) {
			var high = window.scrollY
			if(flag == 0) {
				getHigh = saveHigh(high - monitorHigh)
				flag = 1
			}
			if(window.scrollY > getHigh()) {
				if(pageScroll.isTop()) {
					flag = 0
					return
				}
				var pos = window.scrollY - 20
				scrollTo(0, pos)
				animate.up = animation(pageScroll.scrollUp)
			} else {
				flag = 0
			}
		},
		start: function(e) {
			e.preventDefault()
			console.log(e)
			if(flag == 1) {
				return
			}
			if(e.deltaY > 0) {
				if(pageScroll.isBottom()) {
					return
				}
				if(animate.down) {
					cancelAnimationFrame(animate.down)
				}
				animate.down = animation(pageScroll.scrollDown)
			} else {
				if(pageScroll.isTop()) {
					return
				}
				if(animate.up) {
					cancelAnimationFrame(animate.up)
				}
				animate.up = animation(pageScroll.scrollUp)
			}
		},
		go: function() {
			window.onmousewheel = this.start
		}

	}
}()