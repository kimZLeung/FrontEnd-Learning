function superMove(ele_id, final_x, final_y, interval) {    /*这个方法是抄书的,用来移动导航栏图标的*/
  if(!document.getElementById) return false;                /*传入了元素id,最后位置的X坐标和Y坐标,间隔时间*/
  if(!document.getElementById(ele_id)) return false;
  var ele = document.getElementById(ele_id);
  if(ele.movement) {
  	clearTimeout(ele.movement);
  }
  var xp = parseInt(document.defaultView.getComputedStyle(ele).left); /*用这个方法获取外部css中的left和top属性*/
  var yp = parseInt(document.defaultView.getComputedStyle(ele).top);
  if(xp == final_x && yp == final_y) {
  	return true;
  }
  if(xp < final_x) {
  	d = Math.ceil((final_x-xp)/10);
  	xp = xp+d;
  }
  if(xp > final_x) {
  	d = Math.ceil((xp-final_x)/10);
  	xp = xp-d;
  }
  if(yp < final_y) {
  	d = Math.ceil((final_y-yp)/10);
  	yp=yp+d;
  }
  if(yp > final_y) {
  	d = Math.ceil((yp-final_y)/10);
  	yp=yp-d;
  }
  ele.style.left = xp +'px';
  ele.style.top = yp + 'px';
  var repeat = "superMove('"+ele_id+"',"+final_x+","+final_y+","+interval+")";  /*设置定时*/
  ele.movement = setTimeout(repeat, interval);
}


function changeCol (li_l) {   /*用于对导航栏连接的样式改变*/
  if(!document.getElementById||!document.getElementsByTagName) return false;
  var li = document.getElementsByTagName("li");
  for(var i=0; i<6; i++) {    /*如果传入的参数和哪个相同，便改变这个连接的样式，使它更突出*/
    if(li[i] == li_l) {
      li[i].className = 'listStyle';
    } else {                  /*如果不是则把样式设为普通样式*/
      li[i].className = 'oldListStyle';
    }
  }
}

var n = 0;

function changeBattery(battery) {        /*头栏上的电池的转换方法,传入了一个图片节点*/
  if(!battery) return false;
  if(battery.nodeName != 'IMG') return false;     
  if(n == 6) {
    battery.setAttribute('src', 'image/center_battery.jpg'); 
  }
  if(n == 12) {
    battery.setAttribute('src', 'image/battery.jpg'); 
  }
}

function move3D () {
  if(!document.getElementById||!document.getElementsByTagName) return false;
  var li = document.getElementsByTagName('li');         /*获取所有导航栏的连接*/
  var a_home = document.getElementById('aHome');        /*和所有主要内容的页面*/
  var a_word = document.getElementById('aWord');
  var a_img = document.getElementById('aImg');
  var a_mes = document.getElementById('aMessage');
  var a_music = document.getElementById('aMusic');
  var a_per = document.getElementById('aPersonal');
  var h = document.getElementById('home');
  var w = document.getElementById('word');
  var im = document.getElementById('img');
  var me = document.getElementById('message');
  var mu = document.getElementById('music');
  var p = document.getElementById('personal');
  var m_3d = document.getElementById('to3d');
  var _battery = document.getElementById('battery');
  a_home.onclick = function() {         /*为主页连接按钮设定点击事件，使主页能转来转去*/
    n=n+1;
    changeBattery(_battery);
    h.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(370px)';
    w.style.transform = 'rotateX(0deg) rotateY(90deg) translateZ(370px)';
    im.style.transform ='rotateX(0deg) rotateY(180deg) translateZ(370px)';
    me.style.transform = 'rotateX(0deg) rotateY(270deg) translateZ(370px)';
    mu.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(350px)';
    p.style.transform = 'rotateX(0deg) rotateY(90deg) translateZ(350px)';
    inRow('icon1', 100, 120, 30, 0, 20);    /*设定三个箭头的运动*/
    inRow('icon2', 100, 120, 30, -120, 20);         
    inRow('icon3', 100, 120, 30, -240, 20);
    changeCol(li[0]);
    return false;
  }
  a_word.onclick = function () {      /*为各个按钮设定旋转事件，使其内容能够显示在可视范围*/
    n=n+1;
    changeBattery(_battery);
    h.style.transform = 'rotateX(0deg) rotateY(-90deg) translateZ(370px)';
    w.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(370px)';
    im.style.transform ='rotateX(0deg) rotateY(90deg) translateZ(370px)';
    me.style.transform = 'rotateX(0deg) rotateY(180deg) translateZ(370px)';
    mu.style.transform = 'rotateX(0deg) rotateY(-90deg) translateZ(350px)';
    p.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(350px)';
    clear('icon1');
    clear('icon2');
    clear('icon3');
    changeCol(li[1]);
    return false;
  }
  a_img.onclick = function () {       /*为各个按钮设定旋转事件，使其内容能够显示在可视范围*/
    n=n+1;
    changeBattery(_battery);
    h.style.transform = 'rotateX(0deg) rotateY(-180deg) translateZ(370px)';
    w.style.transform = 'rotateX(0deg) rotateY(-90deg) translateZ(370px)';
    im.style.transform ='rotateX(0deg) rotateY(0deg) translateZ(370px)';
    me.style.transform = 'rotateX(0deg) rotateY(90deg) translateZ(370px)';
    mu.style.transform = 'rotateX(0deg) rotateY(-180deg) translateZ(350px)';
    p.style.transform = 'rotateX(0deg) rotateY(-90deg) translateZ(350px)';
    clear('icon1');
    clear('icon2');
    clear('icon3');
    changeCol(li[2]);
    return false;
  }
  a_mes.onclick = function () {     /*为各个按钮设定旋转事件，使其内容能够显示在可视范围*/
    n=n+1;
    changeBattery(_battery);
    h.style.transform = 'rotateX(0deg) rotateY(-270deg) translateZ(370px)';
    w.style.transform = 'rotateX(0deg) rotateY(-180deg) translateZ(370px)';
    im.style.transform ='rotateX(0deg) rotateY(-90deg) translateZ(370px)';
    me.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(370px)';
    mu.style.transform = 'rotateX(0deg) rotateY(-270deg) translateZ(350px)';
    p.style.transform = 'rotateX(0deg) rotateY(-180deg) translateZ(350px)';
    clear('icon1');
    clear('icon2');
    clear('icon3');
    changeCol(li[3]);
    return false;
  }
  a_music.onclick = function () {     /*为各个按钮设定旋转事件，使其内容能够显示在可视范围*/
    n=n+1;
    changeBattery(_battery);
    h.style.transform = 'rotateX(90deg) rotateY(0deg) translateZ(400px)';
    w.style.transform = 'rotateX(90deg) rotateY(0deg) translateZ(400px)';
    im.style.transform ='rotateX(90deg) rotateY(0deg) translateZ(400px)';
    me.style.transform = 'rotateX(90deg) rotateY(0deg) translateZ(400px)';
    mu.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(350px)';
    p.style.transform = 'rotateX(0deg) rotateY(90deg) translateZ(350px)';
    clear('icon1');
    clear('icon2');
    clear('icon3');
    changeCol(li[4]);
    return false;
  }
  a_per.onclick = function () {       /*为各个按钮设定旋转事件，使其内容能够显示在可视范围*/
    n=n+1;
    changeBattery(_battery);
    h.style.transform = 'rotateX(90deg) rotateY(0deg) translateZ(400px)';
    w.style.transform = 'rotateX(90deg) rotateY(0deg) translateZ(400px)';
    im.style.transform ='rotateX(90deg) rotateY(0deg) translateZ(400px)';
    me.style.transform = 'rotateX(90deg) rotateY(0deg) translateZ(400px)';
    mu.style.transform = 'rotateX(0deg) rotateY(-90deg) translateZ(350px)';
    p.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(350px)';
    clear('icon1');
    clear('icon2');
    clear('icon3');
    changeCol(li[5]);
    return false;
  }
  a_home.onmouseover = function() {   /*为各个按钮添加事件,使鼠标放在上面时按钮可移动*/
    superMove('aHome',20, 0, 20);     /*移走鼠标,按钮又会回归原位*/
  }
  a_home.onmouseout = function() {
    superMove('aHome',0, 0, 20);
  }
  a_word.onmouseover = function() {
    superMove('aWord',20, 0, 20);
  }
  a_word.onmouseout = function() {
    superMove('aWord',0, 0, 20);
  }
  a_img.onmouseover = function() {
    superMove('aImg',20, 0, 20);
  }
  a_img.onmouseout = function() {
    superMove('aImg',0, 0, 20);
  }
  a_mes.onmouseover = function() {
    superMove('aMessage',20, 0, 20);
  }
  a_mes.onmouseout = function() {
    superMove('aMessage',0, 0, 20);
  }
  a_music.onmouseover = function() {
    superMove('aMusic',20, 0, 20);
  }
  a_music.onmouseout = function() {
    superMove('aMusic',0, 0, 20);
  }
  a_per.onmouseover = function() {
    superMove('aPersonal',20, 0, 20);
  }
  a_per.onmouseout = function() {
    superMove('aPersonal',0, 0, 20);
  }
}

addLoadEvent(move3D);

function changeFooter() {
  if(!document.getElementsByTagName||!document.getElementById) return false;
  var footer = document.getElementsByTagName('footer')[0];
  setLocal('fight', 0, -100);
  footer.onmouseover = function() {
    superMove('design', 0, 35, 10);
    setTimeout("fontFall('fight', 0, -50, 10)", 500);    /*当鼠标移到footer上时触发的动画*/
  }
}

addLoadEvent(changeFooter);