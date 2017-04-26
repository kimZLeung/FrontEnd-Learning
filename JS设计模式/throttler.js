/**
 * [throttle 函数节流器]
 * @return {[type]} []
 */
function throttle() {
  var isClear = arguments[0], fn
  if(typeof isClear === 'Boolean') {
    fn = arguments[1]
    fn.throttleID && clearTimeout(fn.throttleID)
  } else {
    fn = isClear
    param = arguments[1]
    delay = arguments[2] || 300
    throttle(true, fn)
    fn.throttleID = setTimeout(function() {
      fn.apply(null, param)
    }, delay)
  }
}
