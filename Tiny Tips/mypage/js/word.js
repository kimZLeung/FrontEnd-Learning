function showArt(num) {							/*用于隐藏和显示日志的方法,传入一个序号,用来标识日志*/
	if(!document.getElementsByTagName||!document.getElementById) return false;
	if(!document.getElementById('word')) return false;
	var _word = document.getElementById('word');
	var art = _word.getElementsByTagName('article');
	for(var i=0; i<art.length; i++) {							/*获取所有的日志并遍历利用编号设置其能否显示*/
		if(i == num) {
			art[i].style.display = 'block';
		}
		else {
			art[i].style.display = 'none';
		}
	}
}

function display() {				/*用于首先把所有日志都隐藏起来的方法*/
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById('word')) return false;
	var _word = document.getElementById('word');
	var art = _word.getElementsByTagName('article');
	var word_list = _word.getElementsByTagName('ul')[0];
	var li = word_list.getElementsByTagName('a');
	for (var i=0; i<art.length; i++) {
		art[i].style.display = 'none';			/*遍历所有日志并把其隐藏起来*/
	}
	li[0].onclick = function() {					/*利用上面写的showArt方法为每个日志标题设定点击事件*/
		showArt(0);
		return false;
	}
	li[1].onclick = function() {
		showArt(1);
		return false;
	}
	li[2].onclick = function() {
		showArt(2);
		return false;
	}
}

addLoadEvent(display);

function stopSubmit() {									/*用于阻止表单提交跳转*/
	return false;
}

function changeTitle() {							/*用于修改日志题目的*/
	if(!document.getElementById||!document.getElementsByTagName) return false;
	if(!document.getElementById('word')||!document.getElementById('personalWord')) return false;
	var word = document.getElementById('word');
	var title_list = word.getElementsByTagName('ul')[0];
	var per_title = title_list.getElementsByTagName('a');
	var title = word.getElementsByTagName('header');
	var home_word = document.getElementById('personalWord');
	var home_title = home_word.getElementsByTagName('li');
	title[1].ondblclick = function () {										/*对第一篇日志的标题添加点击事件*/
		title[1].innerHTML = "<input type='text' />";	/*双击日志题目的时候会把标题变成一个文本框*/	
		var _result = title[1].getElementsByTagName('input')[0];
		_result.onblur = function () {											/*对文本框添加失去焦点的事件*/
			if(_result.value.replace(/\s+/g, '') != '') {			/*使对文本框失去焦点时确认日志题目的修改*/
				title[1].innerHTML = _result.value;							/*同时修改日志的题目,主页的日志题目和日志栏的题目*/
				per_title[0].firstChild.nodeValue = _result.value;					/*这个验证为了防止不输入或者输入空格会确定修改,使文章标题消失*/
				home_title[0].firstChild.nodeValue = _result.value; /*思路是把空格都替换为空字符串的时候文本框的值是否为空*/
			}
			else {																						/*如果文本框为空,则不会确认*/
				alert('不能输入空值或空格');
				return false;																		/*下面分别对第二第三篇日志标题添加该事件*/
			}
		}
	}
	title[2].ondblclick = function () {
		title[2].innerHTML = "<input type='text' />";
		var _result = title[2].getElementsByTagName('input')[0];
		_result.onblur = function () {
			if(_result.value.replace(/\s+/g, '') != '') {
				title[2].innerHTML = _result.value;
				per_title[1].firstChild.nodeValue = _result.value;
				home_title[1].firstChild.nodeValue = _result.value;
			}
			else {
				alert('不能输入空值或空格');
				return false;
			}
		}
	}
	title[3].ondblclick = function () {
		title[3].innerHTML = "<input type='text' />";
		var _result = title[3].getElementsByTagName('input')[0];
		_result.onblur = function () {
			if(_result.value.replace(/\s+/g, '') != '') {
				title[3].innerHTML = _result.value;
				per_title[2].firstChild.nodeValue = _result.value;
				home_title[2].firstChild.nodeValue = _result.value;
			}
			else {
				alert('不能输入空值或空格');
				return false;
			}
		}
	}
}

addLoadEvent(changeTitle);

function addArticle() {						/*这是日志的创建*/
	if(!document.getElementById||!document.getElementsByTagName) return false;
	if(!document.createElement||!document.createTextNode) return false;
	if(!document.getElementById('word')||!document.getElementById('but')) return false;
	var _word = document.getElementById('word');
	var but = document.getElementById('but');
	var write = _word.getElementsByTagName('button')[0];			/*通过tagname得到‘写日志’按钮*/
	var write_form = _word.getElementsByTagName('form')[0];		/*写日志的表单*/
	but.onclick = function () {
		if(!document.getElementById) return false;
		var title = _word.getElementsByTagName('input')[0].value;		/*取得标题表单里的文字*/
		var text = _word.getElementsByTagName('textarea')[0].value;	/*取得文本域里的日志内容*/
		if(title.replace(/\s+/g, '') == ''||text.replace(/\s+/g, '') == '') {
			alert("内容不能为空");																		/*对日志框和标题栏进行空判断*/
			return false;
		}
		var art = document.createElement('article');								/*创建article元素节点用于装载日志*/
		var head = document.createElement('header');								/*创建blockquote用于装载标题*/
		var time = document.createElement('p');											/*p用于装载时间*/
		var list = _word.getElementsByTagName('ul')[0];							/*获得日志列表*/
		var li_s = document.createElement('li');										/*创建li元素节点用于装载标题在日志列表中的位置*/
		var alink = document.createElement('a');										/*创建a用于给日志列表的标题提供超链接*/
		var titleTot1 = document.createTextNode(title);							/*以标题为文本创建文本节点,放在日志列表和日志头部*/
		var titleTot2 = document.createTextNode(title);							/*之所以创建两个是因为一个不能append到两个地方*/
		var o = Date().split(' ');
		var timeTexted = '';
   	for (var i=0; i<4; i++) {
    	timeTexted += (o[i]+" ");																	/*利用时间对象的方法获取当前的时间*/
   	}
   	var timeText = document.createTextNode(timeTexted);					/*以时间为文本创建文本节点*/
   	var context = document.createTextNode(text);								/*以日志内容为文本基础创建文本节点*/
   	var list_timeHolder = document.createElement('span');
   	var list_timeText = document.createTextNode(timeTexted);
  	list_timeHolder.appendChild(list_timeText);
		head.appendChild(titleTot2);																/*把标题加到日志头部*/
		time.appendChild(timeText);																	/*把时间加到日志中*/
		art.appendChild(head);																			/*把头部加入日志*/
		art.appendChild(time);																			/*把时间加入日志*/
		art.appendChild(context);																		/*把内容加入日志*/
		_word.appendChild(art);																			/*把日志加入到html中*/
		art.style.display="none";																		/*把日志设为不可见*/
		
		alink.appendChild(titleTot1);																/*把标题加入a元素中*/
		alink.setAttribute('href','#');															
		li_s.appendChild(alink);																		/*把a元素加入li元素中*/
		li_s.appendChild(list_timeHolder);
		list.appendChild(li_s);																			/*把li元素加入html中*/
		_word.getElementsByTagName('input')[0].value='';						/*把写文章的表单元素的内容设为空*/
		_word.getElementsByTagName('textarea')[0].value='';
		alink.onclick = function() {
			var word_art = _word.getElementsByTagName('article');
			var len = word_art.length;
			for(var i=0; i<len; i++) {
				word_art[i].style.display = 'none';
			}
			art.style.display='block';
			return false;
		}
		var homeWord = document.getElementById('personalWord');			/*在主页的‘我的日志部分’*/
		var word_list = homeWord.getElementsByTagName('ul')[0];			/*增加新写的文章的标题*/
		var home_title = document.createElement('li');
		var title_name = document.createTextNode(title);
		home_title.appendChild(title_name);
		word_list.appendChild(home_title);
		head.ondblclick = function() {															/*为该篇日志添加标题的事件*/
			head.innerHTML = "<input type='text' />";								/*同样是双击标题可以更改标题*/
			var _result = head.getElementsByTagName('input')[0];
			_result.onblur = function () {
				if(_result.value.replace(/\s+/g, '') != '') {
					head.innerHTML = _result.value;
					alink.firstChild.nodeValue = _result.value;
					home_title.firstChild.nodeValue = _result.value;
				}
				else {
					alert('不能输入空值或空格');
					return false;
				}
			}
		}																														/*把新写的文章的标题加到主页的右栏里*/
		write_form.style.display = 'none';													/*把写日志的表单元素设置为不可见*/
	}
	write.onclick = function () {
		write_form.style.display = 'block';													/*为‘写日志’按钮添加事件,按下显示写日志的表单*/
	}
}

addLoadEvent(addArticle);

function changeTextArea() {																			/*改变写日志内容的方法*/
	if(!document.getElementById('word')) return false;
	var _word = document.getElementById('word');
	var text = _word.getElementsByTagName('textarea')[0];
	text.onfocus = function() {																		/*当日志内容的文本域被选中时高度会增加*/
		 text.style.height = '150px';
	}
	text.onblur = function() {																		/*不被选中时高度又会缩减*/
		text.style.height = '30px';
	}
}

addLoadEvent(changeTextArea);

function formOnSub() {																					/*阻止写日志表单的提交,避免刷新页面*/
	if (!document.getElementById||!document.getElementsByTagName) return false;
	var word = document.getElementById('word');
	var write_form = word.getElementsByTagName('form')[0];
	write_form.onsubmit = stopSubmit;
}

addLoadEvent(formOnSub);