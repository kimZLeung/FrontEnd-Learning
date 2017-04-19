function onPic() {									
	if(!document.getElementById||!document.getElementsByTagName) return false;
	if(!document.getElementById('perShow')) return false;
	var per_Show = document.getElementById('perShow');
	var pic = per_Show.getElementsByTagName('img');
	pic[0].onmouseover = function() {							/*对每张图片的鼠标事件添加方法,使鼠标放在图片上会使图片略微放大*/
		pic[0].style.transform = 'scale(1.1)'
	}
	pic[0].onmouseout = function() {
		pic[0].style.transform = 'scale(1)';
	}
	pic[1].onmouseover = function() {
		pic[1].style.transform = 'scale(1.1)'
	}
	pic[1].onmouseout = function() {
		pic[1].style.transform = 'scale(1)';
	}
	pic[2].onmouseover = function() {
		pic[2].style.transform = 'scale(1.1)'
	}
	pic[2].onmouseout = function() {
		pic[2].style.transform = 'scale(1)';
	}
	pic[3].onmouseover = function() {
		pic[3].style.transform = 'scale(1.1)'
	}
	pic[3].onmouseout = function() {
		pic[3].style.transform = 'scale(1)';
	}
	pic[4].onmouseover = function() {
		pic[4].style.transform = 'scale(1.1)'
	}
	pic[4].onmouseout = function() {
		pic[4].style.transform = 'scale(1)';
	}
	pic[5].onmouseover = function() {
		pic[5].style.transform = 'scale(1.1)'
	}
	pic[5].onmouseout = function() {
		pic[5].style.transform = 'scale(1)';
	}
	pic[6].onmouseover = function() {
		pic[6].style.transform = 'scale(1.1)'
	}
	pic[6].onmouseout = function() {
		pic[6].style.transform = 'scale(1)';
	}
	pic[7].onmouseover = function() {
		pic[7].style.transform = 'scale(1.1)'
	}
	pic[7].onmouseout = function() {
		pic[7].style.transform = 'scale(1)';
	}
	pic[8].onmouseover = function() {
		pic[8].style.transform = 'scale(1.1)'
	}
	pic[8].onmouseout = function() {
		pic[8].style.transform = 'scale(1)';
	}
	pic[9].onmouseover = function() {
		pic[9].style.transform = 'scale(1.1)'
	}
	pic[9].onmouseout = function() {
		pic[9].style.transform = 'scale(1)';
	}
	pic[10].onmouseover = function() {
		pic[10].style.transform = 'scale(1.1)'
	}
	pic[10].onmouseout = function() {
		pic[10].style.transform = 'scale(1)';
	}
}

addLoadEvent(onPic);

function inrotatePic(_deg, interval, _src) {			/*设定预览图片区的图片,当更换图片时进行旋转的方法*/
	if(!document.getElementById) return false;			/*传入初始角度,间隔时间和图片来源*/
	if(!document.getElementById('picture')) return false;
	var stage = document.getElementById('picture');
	if(stage.nodeName != 'IMG') return false;				/*检测stage是否为图片*/
	if(stage.movement) {
		clearTimeout(stage.movement);
	}
	_deg=_deg+3;
	stage.style.transform = 'rotateY('+_deg+'deg) '+'rotateX('+_deg+'deg)' ;
	if(_deg == 90) {															/*当旋转至90度时，把图片的来源设成下一张图片*/
		stage.setAttribute('src', _src);						/*同时调用返回90度的方法*/
		stage.movement = setTimeout('outrotatePic('+_deg+','+interval+",'"+_src+"')", interval);
	}
	else {
		 stage.movement = setTimeout('inrotatePic('+_deg+','+interval+",'"+_src+"')", interval);
	}
}

function outrotatePic(_deg, interval, _src) {			/*图片返回旋转90度的方法*/
	if(!document.getElementById) return false;			/*传入初始角度,间隔时间和图片来源*/
	if(!document.getElementById('picture')) return false;
	var stage = document.getElementById('picture');
	if(stage.movement) {
		clearTimeout(stage.movement);
	}
	_deg=_deg-3;
	stage.style.transform = 'rotateY('+_deg+'deg) '+'rotateX('+_deg+'deg)' ;
	if(_deg == 0) {
		return true;																/*如果旋转角度回到0度时,方法停止,不再执行*/
	}
	else {
		 stage.movement = setTimeout('outrotatePic('+_deg+','+interval+",'"+_src+"')", interval);
	}
}


function showPic() {									/*为每个按钮设定图片切换的onclick事件*/
	if(!document.getElementById||!document.getElementsByTagName) return false;
	if(!document.getElementById('perShow')) return false;
	var per_Show = document.getElementById('perShow');
	if(!per_Show.getElementsByTagName('a')) return false;
	var pic = per_Show.getElementsByTagName('a');
	pic[0].onclick = function() {
		if(inrotatePic(0, 10, pic[0].getAttribute('href')) == false) {
			return true;
		}
		return false;
	}
	pic[1].onclick = function() {
		if(inrotatePic(0, 10, pic[1].getAttribute('href')) == false) {
			return true;
		}
		return false;
	}
	pic[2].onclick = function() {
		if(inrotatePic(0, 10, pic[2].getAttribute('href')) == false) {
			return true;
		}
		return false;
	}
	pic[3].onclick = function() {
		if(inrotatePic(0, 10, pic[3].getAttribute('href')) == false) {
			return true;
		}
		return false;
	}
	pic[4].onclick = function() {
		if(inrotatePic(0, 10, pic[4].getAttribute('href')) == false) {
			return true;
		}
		return false;
	}
	pic[5].onclick = function() {
		if(inrotatePic(0, 10, pic[5].getAttribute('href')) == false) {
			return true;
		}
		return false;
	}
	pic[6].onclick = function() {
		if(inrotatePic(0, 10, pic[6].getAttribute('href')) == false) {
			return true;
		}
		return false;
	}
	pic[7].onclick = function() {
		if(inrotatePic(0, 10, pic[7].getAttribute('href')) == false) {
			return true;
		}
		return false;
	}
	pic[8].onclick = function() {
		if(inrotatePic(0, 10, pic[8].getAttribute('href')) == false) {
			return true;
		}
		return false;
	}
	pic[9].onclick = function() {
		if(inrotatePic(0, 10, pic[9].getAttribute('href')) == false) {
			return true;
		}
		return false;
	}
	pic[10].onclick = function() {
		if(inrotatePic(0, 10, pic[10].getAttribute('href')) == false) {
			return true;
		}
		return false;
	}
}

addLoadEvent(showPic);

function repeatMove(ele_id, range, interval) {			/*按传入的参数位移一段距离的方法*/
	if(!document.getElementById) return false;			/*传入元素id,要移动的宽度,间隔时间*/
	if(!document.getElementById(ele_id)) return false;
	var box = document.getElementById(ele_id);
	var xp = parseInt(document.defaultView.getComputedStyle(box).left);
	if(range>0) {				/*如果参数距离是0就返回,不再执行*/
		xp=xp+3;
		range=range-3;		/*如果不是0,设定元素位移,每位移一次也改变一个参数range*/
	}
	if(range<0) {
		xp=xp-3;
		range=range+3;
	}
	if(range == 0) {
		return true;
	}
	box.style.left = xp+'px';
	box.movement = setTimeout("repeatMove('"+ele_id+"',"+range+","+interval+")", interval);
}


function movePerShow() {								/*让下方的图片栏可以左右移动*/
	if(!document.getElementById) return false;
	if(!document.getElementById('last')||!document.getElementById('next')) return false;
	if(!document.getElementById('picHideA')||!document.getElementById('picHideB')) return false;
	var b_last = document.getElementById('last');
	var b_next = document.getElementById('next');
	var box = document.getElementById('picHideA');
	var boxB = document.getElementById('picHideB');
	b_last.onclick = function() {																		/*给按钮的onclick添加移动的方法*/
		var left = parseInt(document.defaultView.getComputedStyle(box).left);
		var leftB = parseInt(document.defaultView.getComputedStyle(boxB).left);
		if(document.defaultView.getComputedStyle(box).display == 'block') {		/*如果这个图库是正在显示没有隐藏的*/
			if(left >= 0) {																										/*就移动这个图库中的图片*/
				return false;																								/*如果左边到头了就不能再移动*/
			} else {
				repeatMove('picHideA', 141, 1);
			}
		}
		if(boxB.style.display == 'block') {									/*如果是另一个图库正在显示便移动另一个图库*/
			if(leftB >= 0) {																	/*如果左边到头了就不能再移动*/		
				return false;
			} else {
				repeatMove('picHideB', 141, 1);
			}
		}
	}
	b_next.onclick = function() {																/*给按钮的onclick事件添加移动的方法*/
		var left = parseInt(document.defaultView.getComputedStyle(box).left);
		var leftB = parseInt(document.defaultView.getComputedStyle(boxB).left);
		if(document.defaultView.getComputedStyle(box).display == 'block') {		/*同样是判断该图库是否为显示出来的图库*/
				if(left <= -276) {																				/*判断右边是否已经到头,如果到头便不能再移动*/
					return false;
				} else {
					repeatMove('picHideA', -141, 1);
				}
			}
			if(boxB.style.display == 'block') {						
				if(leftB <= -138) {
					return false;
				} else {
					repeatMove('picHideB', -141, 1);
				}
			}
	}
}

addLoadEvent(movePerShow);

function perparePic() {
	if(!document.createElement) return false;
	if(!document.getElementById('img')) return false;
	var img = document.getElementById('img');
	var picture = document.createElement('img');
	var per_show = document.getElementById('perShow');
	picture.setAttribute('src', '');
	picture.setAttribute('alt', '点击图片来浏览');
	picture.setAttribute('id', 'picture');
	img.insertBefore(picture, per_show);
}

addLoadEvent(perparePic);

function changePic() {										/*为转换图库的按钮添加事件*/
	if(!document.getElementById) return false;
	if(!document.getElementById('img')||!document.getElementById('picHideA')||!document.getElementById('picHideB')) return false;
	var pic = document.getElementById('img');
	var change = pic.getElementsByTagName('button');
	var picHideA = document.getElementById('picHideA');
	var picHideB = document.getElementById('picHideB');
	change[0].onclick = function() {			/*按下可隐藏图库二显示图库一*/
		picHideA.style.display = 'block';
		picHideB.style.display = 'none';
	}
	change[1].onclick = function() {			/*按下就隐藏图库一显示图库二*/
		picHideA.style.display = 'none';
		picHideB.style.display = 'block';
	}
}

addLoadEvent(changePic);