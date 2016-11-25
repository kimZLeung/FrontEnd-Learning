function moveTextArea() {        /*使这个文本域被选中时会改变背景颜色和里面字体的颜色*/
	if(!document.getElementById||!document.getElementsByTagName) return false;
   if(!document.getElementById('message')) return false;
	var mes = document.getElementById("message");
   var label = mes.getElementsByTagName('label')[0];
	var text_Area = mes.getElementsByTagName("textarea")[0];
	text_Area.onfocus = function() {
		text_Area.style.backgroundColor = '#1DC31D';        /*被选中时设定颜色*/
		text_Area.style.color = 'white';
      label.className = 'labelStyle';
	}
	text_Area.onblur = function(){
		text_Area.style.backgroundColor = 'white';          /*没被选中时恢复为原来的样式*/
		text_Area.style.color = 'black';
      label.className = 'oldLabelStyle';
	}
}

addLoadEvent(moveTextArea);

function createMessage() {          /*用于增加留言的方法*/
	if(!document.getElementById||!document.getElementsByTagName) return false;
  if(!document.createElement||!document.createTextNode) return false;
  if(!document.getElementById('messageHolder')) return false;
  getE('~li');
	var time_Model = '';         /*创建了一个变量用于装时间的字符串*/
	var o = Date().split(' ');
  for (var i=0; i<4; i++) {
    time_Model += (o[i]+" ");    /*调用Date对象的方法获取当前的时间，并且取出其中一部分放到字符串里面*/
   }
   var time = document.createTextNode(time_Model);  /*创建时间为字符串的文本节点*/
   var mes = document.getElementById('message');   
   var text = mes.getElementsByTagName('textarea')[0].value;   /*取出文本域中的内容*/
   if(text.replace(/\s+/g, '') == '') {
      alert('内容不能为空');         /*输入的空判断*/
      return false;
   }
   var context = document.createTextNode(text);                /*以文本域内容为基础创建文本节点*/
   var context_Hold = document.createElement('p');             /*创建元素节点添加留言内容的文本节点*/
   var art = document.createElement('article');                /*创建article文本检点用于*/
   var time_Hold = document.createElement('span');             /*创建节点来装时间的字符串*/
   var container = document.getElementById('messageHolder');   /*从html里找到装留言的容器*/
   var del_a = document.createElement('a');
   var del_text = document.createTextNode('删除');              /*创建删除按钮*/
   var tail = document.createElement('div');                    /*这个是每条留言框左边的小三角形*/
   var head_pic = document.createElement('img');               /*为每条留言添加头像*/
   head_pic.setAttribute('src', 'image/A95BD923080E8C752CDC2AF88A6B158C.jpg');
   del_a.appendChild(del_text);                  /*删除按钮添加文本*/
   time_Hold.appendChild(time);                  /*时间节点添加时间文本*/
   context_Hold.appendChild(context);            /*留言内容添加p元素中*/
   art.appendChild(time_Hold);                   /*添加时间到article中*/
   art.appendChild(context_Hold);                /*添加内容到article中*/
   art.appendChild(del_a);                       /*删除按钮添加到article中*/
   art.appendChild(tail);                        /*左边的小三角形添加到article中*/
   art.appendChild(head_pic);                    /*头像添加到article中*/
   del_a.setAttribute('href', '#');
   del_a.onclick = function() {                 /*为删除按钮添加删除功能*/
   	 container.removeChild(art);
   	 return false;
   }
   var message = container.getElementsByTagName('article');    /*检测html里面是否已经有留言*/
   if(message.length>0) {
   	container.insertBefore(art, message[0]);          /*如果有就加到上一条留言前面*/
   }
   else {
   	container.appendChild(art);                       /*如果没有就知道加进去*/
   }
   mes.getElementsByTagName('textarea')[0].value = '';   /*把textarea的内容清空*/
   return false;
}

function addCreate() {
	if(!document.getElementById) return false;
   if(!document.getElementById('sButton')) return false;
	var b = document.getElementById('sButton');
   var old_color = document.defaultView.getComputedStyle(b).backgroundColor;
	b.onclick = createMessage;                /*为按钮添加onclick事件，用于增加留言*/
   b.onmousedown = function() {
      b.style.backgroundColor = '#1DC31D';   /*onmousedown事件，按下去会变色*/
      b.style.color = 'white';
   }
   b.onmouseup = function() {
      b.style.backgroundColor = old_color;   /*鼠标按钮上来会变回来*/
      b.style.color = 'black';
   }
}

addLoadEvent(addCreate);

function moveQuote() {
   if(!document.getElementById) return false;       /*这个是实现留言板上方提示语跳动的方法*/
   if(!document.getElementById('quoteHolder')) return false;
   var holder = document.getElementById('quoteHolder');
   if(!holder.style.top) {                   /*如果没有top属性直接把top设为0*/
     holder.style.top = '0px';
   }
   var _top = parseInt(holder.style.top);   /*得到top的数字形式*/                             
   _top -= 1;
   if(_top <= -61) {
      _top = 0;
   }
   holder.style.top = _top+'px';           /*把数字加上单位设置属性*/
   if(_top == 0) {
      setTimeout('moveQuote()', 3000);     /*如果到了特定的显示文字的位置就停顿一下*/
      return true;
   }
   if(_top == -20) {
      setTimeout('moveQuote()', 3000);     /*如果到了特定的显示文字的位置就停顿一下*/
      return true;
   }
   if(_top == -40) {
      setTimeout('moveQuote()', 3000);
      return true;
   }
   if(_top == -60) {
      setTimeout('moveQuote()', 3000);
      return true;
   }
   setTimeout('moveQuote()', 10);         /*设定计时器*/
}

addLoadEvent(moveQuote);