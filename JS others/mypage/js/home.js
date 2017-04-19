function fontFall(ele_id, final_x, final_y, interval) {		/*传入元素的id,最后要到的x和y的位置,间隔时间*/
	if(!document.getElementById) return false;
	if(!document.getElementById(ele_id)) return false;		/*移动字体的方法*/
	var ele = document.getElementById(ele_id);
	if(ele.movement) {
  	clearTimeout(ele.movement);		
  }
  if(!ele.style.left) {					/*如果没有设置style的left值,则设为0%*/
  	ele.style.left = '0%';
  }
  if(!ele.style.top) {					/*如果没有设置style的top值,则设为0%*/
  	ele.style.top = '0%';
  }
  var x = parseInt(ele.style.left.split('%')[0]);		/*因为已经通过别的方法移动字体位置，可直接用*/
  var y = parseInt(ele.style.top.split('%')[0]);		/*style来获取字体的位置属性*/
  if(x == final_x && y == final_y) {
  	return true;
  }
  if(x < final_x) {
  	x++;
  }
  if(x > final_x) {
  	x--;
  }
  if(y < final_y) {
  	y++;
  }
  if(y > final_y) {
  	y--;
  }
  ele.style.left = x + '%';			/*设置字体位置*/
  ele.style.top = y + '%';
  ele.movement = setTimeout("fontFall('"+ele_id+"',"+final_x+','+final_y+','+interval+')' , interval);
}			/*设置定时*/

function inRow(ele_id, r, max_r, min_r, first_deg, interval) {		/*传入元素的id,初始半径,最小的半径,最大的半径,初始角度,间隔时间*/
	if(!document.getElementById) return false;
	if(!document.getElementById(ele_id)) return false;
	var ele = document.getElementById(ele_id);						/*控制箭头旋转的方法，这是旋转半径逐渐缩小的*/
	var x = 0;
	var y = 0;
	if(first_deg == -360) {				/*检测旋转角度是否已满360度，如果已满从0度重新开始*/
		first_deg = 0;
	}
	else {
		first_deg = first_deg - 5;	/*如果没满一周360度，则改变角度*/
		r--;
	}
	x = Math.cos(first_deg*Math.PI/180)*r;			/*调用Math对象方法和属性来进行图片位置的确定*/
	y = Math.sin(first_deg*Math.PI/180)*r;
	ele.style.left = x+'px';
	ele.style.top = y+'px';
	ele.style.transform = 'rotate('+first_deg+'deg)';			/*根据角度来旋转图片*/
	if(r == min_r) {
		ele.move = setTimeout("outRow('"+ele_id+"',"+r+','+max_r+','+min_r+','+first_deg+','+interval+')' , interval);
	}							/*判断如果还没到最小半径则仅需缩小*/
	else {
		ele.move = setTimeout("inRow('"+ele_id+"',"+r+','+max_r+','+min_r+','+first_deg+','+interval+')' , interval);
	}							/*如果已经到了最小半径，则调用另一个放大半径的方法*/
}

function outRow(ele_id, r, max_r, min_r, first_deg, interval) {		/*传入元素的id,初始半径,最大最小半径,初始角度,间隔时间*/
	if(!document.getElementById) return false;
	if(!document.getElementById(ele_id)) return false;			/*这个是放大半径的方法*/
	var ele = document.getElementById(ele_id);
	var x = 0;
	var y = 0;
	if(first_deg == -360) {
		first_deg = 0;
	}
	else {
		first_deg = first_deg - 5;
		r++;
	}
	x = Math.cos(first_deg*Math.PI/180)*r;
	y = Math.sin(first_deg*Math.PI/180)*r;
	ele.style.left = x+'px';
	ele.style.top = y+'px';
	ele.style.transform = 'rotate('+first_deg+'deg)';
	if(r == max_r) {
		ele.move = setTimeout("inRow('"+ele_id+"',"+r+','+max_r+','+min_r+','+first_deg+','+interval+')' , interval);
	}				/*判断如果到了最大半径又开始调用缩小半径的方法*/
	else {
		ele.move = setTimeout("outRow('"+ele_id+"',"+r+','+max_r+','+min_r+','+first_deg+','+interval+')' , interval);
	}				/*还没到最大就继续*/
}

function setLocal(ele_id, x, y) {		/*传入要设位置的元素的id和要设定的坐标X和y*/
	if(!document.getElementById) return false;
	if(!document.getElementById(ele_id)) return false;
	var ele = document.getElementById(ele_id);				/*一个设定元素位置的方法*/
	ele.style.left = x + '%';
	ele.style.top = y + '%';
}

function rowFont(ele_id, first_deg, row_deg, interval) {	/*实现了简单的字体旋转的方法,传入元素id,初始角度*/
	if(!document.getElementById) return false;							/*要旋转多少角度,和设定的间隔时间*/
	if(!document.getElementById(ele_id)) return false;
	var ele = document.getElementById(ele_id);	
	if(row_deg == 0) {
		return true;									/*如果要旋转的角度为0就结束*/
	}
	else {
		if(row_deg>0) {
			first_deg=first_deg+1;							
			row_deg=row_deg-1;				/*改变元素初始度数的同时改变row_deg,令其趋向0*/
		}
		if(row_deg<0) {
			first_deg=first_deg-1;  		/*改变元素初始度数的同时改变row_deg,令其趋向0*/
			row_deg=row_deg+1;
		}
		ele.style.transform = 'rotateZ('+first_deg+'deg'+')';  /*改变元素的角度*/
		setTimeout("rowFont('"+ele_id+"',"+first_deg+','+row_deg+','+interval+')', interval); /*设置时间调用下一次*/
	}
}

function homeMove() {
	if(!document.getElementById) return false;
	inRow('icon1', 100, 120, 30, 0, 20);		/*设定三个箭头的运动*/
	inRow('icon2', 100, 120, 30, -120, 20);					
	inRow('icon3', 100, 120, 30, -240, 20);
	setLocal('face1', 10, -25);					/*设定字体和图片的位置*/
	setLocal('face2', 70, -20);								
	setLocal('face3', 10, -30);
	setLocal('face4', 70, -20);
	setLocal('welcome', 24, -20);
	setLocal('enter', 36, -20);
	setLocal('myPage', 51, -20);
	fontFall('welcome', 24, 45, 10);		/*调用方法使字体和图片下落*/
	fontFall('face3', 10, 70, 10);					
	fontFall('face4', 70, 80, 10);
	setTimeout("fontFall('face1', 10, 5, 10)", 3500);		/*延迟调用字体和图片的下落*/
	setTimeout("fontFall('face2', 70, 15, 10)", 1000);
	setTimeout("fontFall('enter', 36, 45, 10)", 1000);		
	setTimeout("rowFont('enter', 45, -45, 10)", 2500);
	setTimeout("fontFall('welcome', 20, 45, 50)", 2500);
	setTimeout("fontFall('myPage', 51, 45, 10)", 2500);
}

function clear(ele_id) {
	if(!document.getElementById) return false;
	if(!document.getElementById(ele_id)) return false;
	var ele = document.getElementById(ele_id);
	clearTimeout(ele.move);
}

addLoadEvent(homeMove);