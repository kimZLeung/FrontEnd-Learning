function addLoadEvent (func) {
  var oldload = window.onload;
  if(typeof window.onload != 'function') {
  	window.onload = func;
  } else {
  	window.onload = function() {
  	  oldload();
  	  func();
  	}
  }
}
/*封装起来把函数添加到window.onload上的方法*/

function getE(ele_haha) {
	if(!ele_haha) return false;
	if(ele_haha.indexOf('#') != -1) {
		var ele_id = ele_haha.split('#')[1];
		console.log(document.getElementById(ele_id)); 
	}
	else if(ele_haha.indexOf('~') != -1) {
		var ele_tag = ele_haha.split('~')[1];
		console.log(document.getElementsByTagName(ele_tag)); 
	}
	else if(ele_haha.indexOf('.') != -1) {
		var ele_class = ele_haha.split('.')[1];
		console.log(document.getElementsByClassName(ele_class)); 
	}
}