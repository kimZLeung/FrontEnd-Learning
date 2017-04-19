function todos() {
	var td = new Array();
	td.add = function(word, index) {
	 	this.push(new todo(word, index, 'false'));
	};

	td.remove = function(num) {
		for(var i = 0; i<this.length; i++) {
			if(this[i].index == num) {
				this.splice(i, 1);
			}
		}
	};

	td.print = function() {
		console.log(this.slice(0));
	};

	td.isCom = function(num) {
		for(var i = 0; i<this.length; i++) {
			if(this[i].index == num) {
				if(this[i].completed == 'false') {
					this[i].completed = 'true';
				}
				else {
					this[i].completed = 'false';
				}
			}
		}
	};
	td.clear = function() {
		for(var i = 0; i<this.length; i++) {
			if(this[i].completed == 'true') {
				this.splice(i, 1);
				i--;
			}
		}
	}
	td.change = function(index, v, c) {
		var l;
		if(c == 'comple') {
			l = 'true';
		}
		else {
			l = 'false';
		}
		for(var i = 0; i<this.length; i++) {
			if(this[i].index == index) {
				this.splice(i, 1, new todo(v, parseInt(index), l));
			}
		}
	}
	return td;
}



function todo(value, index, com) {
	this.value = value;
	this.index = index;
	this.completed = com;
}


function view() {
	this.position = document.getElementById('container');
	this.login = document.getElementById('log');
	this.log_part = document.getElementById('logPart');
}

view.prototype.append = function(word, index, isCom) {
	var contain = document.createElement('li');
	var choose = document.createElement('input');
	var fade = document.createElement('label');
	var del = document.createElement('button');
	var p = document.createElement('div');
	var del_t = document.createTextNode('X');
	del.appendChild(del_t);
	del.className = 'display';
	choose.type = 'checkbox';
	fade.appendChild(document.createTextNode('√'));
	fade.setAttribute('for', index);
	del.setAttribute('data-num', index);
	choose.setAttribute('id', index);
	var value = document.createTextNode(word);
	p.appendChild(value);
	if(isCom == 'false') {
		p.className = 'imcom';
	}
	else {
		p.className = 'comple';
	}
	contain.appendChild(fade);
	contain.appendChild(del);
	contain.appendChild(choose);
	contain.appendChild(p);
	this.position.appendChild(contain);
	return {d:del,c:choose};
} 

view.prototype.delete = function(index) {
	var but = document.getElementsByTagName('button');
	for(var i = 0; i < but.length; i++) {
		if(but[i].getAttribute('data-num') == index) {
			var e = i;
			but[i].parentNode.className = 'slide';
			// console.log(but[i].parentNode)
			function d() {
				this.position.removeChild(but[e].parentNode);
			} 
			setTimeout(d.bind(this), 500);
		}
	}
}
view.prototype.comple = function(index) {
	var cho = document.getElementsByTagName('input');
	for(var i = 0; i < cho.length; i++) {
		if(cho[i].getAttribute('id') == index) {
			if(cho[i].checked) {
				cho[i].nextSibling.className = 'comple';
				cho[i].previousSibling.previousSibling.style.backgroundColor = 'blue';
				cho[i].previousSibling.previousSibling.style.left = '0%';
				cho[i].style.marginRight = '50px';
			}
			else {
				cho[i].nextSibling.className = 'imcomp';
				cho[i].previousSibling.previousSibling.style.backgroundColor = 'white';
				cho[i].previousSibling.previousSibling.style.left = '-2%';
				cho[i].style.marginRight = '0px';
			}
		}
	}
}
view.prototype.act = function(li) {
	var self = this;
	for(var i = 0; i < li.length; i++) {
		 if(li[i].lastChild.className.indexOf('comple') != -1) {
		 	li[i].className = 'display';
		 }
		 else {
		 	li[i].className = 'displays';
		 }
		 li[i].onclick = function(){
		 	 self.act(li);
		 }
	}
}
view.prototype.all = function(li) {
	for(var i = 0; i < li.length; i++) {
		if(li[i].className) {
		 	if(li[i].className.indexOf('display') != -1) {
		 		li[i].className = 'displays';
		 	}
		 	li[i].onclick = null;
		}
	}
}
view.prototype.com = function(li) {
	var self = this;
	for(var i = 0;i < li.length; i++) {
		if(li[i].lastChild.className.indexOf('comple') == -1) {
		 	li[i].className = 'display';
		}
		else {
		 	li[i].className = 'displays';
		}
		li[i].onclick = function(){
		 	 self.com(li);
		 }
 	}
}
view.prototype.clear = function(li) {
  for(var i = 0;i < li.length; i++) {
	  if(li[i].lastChild.className.indexOf('comple') != -1) {
	 	  this.position.removeChild(li[i]);
	 		i--;
	 	}
	}
}

view.prototype.log = function() {
	var status = document.defaultView.getComputedStyle(this.log_part).display;
	if(status == 'none'){
		this.log_part.style.display = 'block';
		this.log_part.style.animation = 'disp 0.5s 1 forwards';
	}
	else {
		function dis() {
			this.log_part.style.display = 'none';
		}
		setTimeout(dis.bind(this),500);
		this.log_part.style.animation = 'pdis 0.5s 1 forwards';
	}
}


function controller(todo, v) {
	var _this = this;
	if(todo.length>0) {
		 _this.accumulate = todo[todo.length-1].index+1;
	} 
	 else {
	 	 _this.accumulate = 0;
	 }
	_this.v = v;
	_this.word = document.getElementsByTagName('input')[0];
	_this.active = document.getElementById('active');
	_this.completed = document.getElementById('completed');
	_this.all = document.getElementById('all');
	_this.clear = document.getElementById('cac');
	var exit = document.getElementById('exit');
	_this.m = todo;
	this.word.onchange = function() {
		var a = _this.v.append(_this.word.value, _this.accumulate, 'false');
		_this.m.add(_this.word.value, _this.accumulate);
		_this.word.value = '';
		a.d.onclick = function(i) {
			return function() {
				_this.v.delete(i);
				_this.m.remove(i);
			}
		}(_this.accumulate);
		a.c.onclick = function(i) {
			return function() {
				_this.v.comple(i);
				_this.m.isCom(i);
			}
		}(_this.accumulate);
		_this.accumulate++;
	};
	this.active.onclick = function() {
		var ul = document.getElementsByTagName('li');
		_this.v.act(ul);
	}
	this.all.onclick = function() {
		var ul = document.getElementsByTagName('li');
		_this.v.all(ul);
	}
	this.completed.onclick = function() {
		var ul = document.getElementsByTagName('li');
		_this.v.com(ul);
	}
	this.clear.onclick = function() {
		var ul = document.getElementsByTagName('li');
		_this.v.clear(ul);
		_this.m.clear();
	}		
	this.v.position.ondblclick = function(event) {
		if(event.target.nodeName == 'DIV') {
			var context = event.target.innerHTML;
			event.target.innerHTML = "<input type='text' value ='"+ context +"' class='change' maxlength='30' placeHolder='好好改,不能为空喔' />"
				event.target.firstChild.onchange = function() {
					if(this.value) {
						this.parentNode.innerHTML =  this.value;
						_this.m.change(event.target.previousSibling.getAttribute('id'), this.value, event.target.getAttribute('class'));
					}
					else {
						event.preventDefault();
					}
			}
		}
	}
	exit.onclick = function() {
		location.reload();
	}
}


function storageSet() {

}

storageSet.prototype.set = function(todo, username) {
	var jAry = JSON.stringify(todo);
	localStorage.setItem('MyTodo'+username, jAry);
	alert('aa');
}


function storageGet() {
 var self = this; 
 var word = document.getElementsByTagName('input')[0];
 var login = document.getElementById('login');
 var sign = document.getElementById('sign');
 var user = document.getElementById('userName');
 var pass = document.getElementById('pass'); 
 var u = new saveUser();
 this.v = new view();
 u.get();
 this.v.login.onclick = function() {
 	 self.v.log();
 }
 sign.onclick = function() {
 	if(!u.confirm(user.value, pass.value)) {
 		u.add(user.value, pass.value);
 	 	user.value = '';
 	 	pass.value = '';
 	 	alert('OK!now U r a legal user');
 	}
 	else {
 		alert('this user has been herE!!!!!');
 	}
 }
 login.onclick = function() { 
 	 var data = u.confirm(user.value, pass.value);
 	 if(data) {
 	 	 var a = self.get(data);
 	 	 self.a_todo = self.come(a);
 	 	 self.create();
 	 	 user.value = '';
 	 	 pass.value = '';
 	 	 word.disabled = false;
 	 	 this.disabled = true;
 	 	 function dis() {
 	 	 	 this.parentNode.style.display = 'none';
 	 	 }
 	 	 this.parentNode.style.animation = 'pdis 1s 1 forwards';
 	 	 setTimeout(dis.bind(this), 1000);
 	 	 exit.style.display = 'inline-block';
 	 	 new controller(self.a_todo, self.v);
 	 	 var st = new storageSet();
 	 	 window.onbeforeunload = function() {
 	 	 	 st.set(self.a_todo, data);	
 	 	 	 u.save();
 	 	 }
 	 }
 	 else {
 	 	 alert('fuck');
 	 }
 }
}
storageGet.prototype.get = function(username) {
	if(localStorage.getItem('MyTodo' + username)) {
		var a_todo = localStorage.getItem('MyTodo' + username);
		var aTodo = JSON.parse(a_todo);
	}
  else {
  	var aTodo = new todos();
  }
	return aTodo; 
}

storageGet.prototype.come = function(td) {
	var Todo = new todos();
	for(var i = 0; i<td.length; i++) {
		var l = new todo(td[i].value, parseInt(td[i].index), td[i].completed);
		Todo.push(l);
	}
	return Todo;
}

storageGet.prototype.create = function() {
	var _this = this;
	for(var i = 0; i<this.a_todo.length; i++) {
		var flag = parseInt(this.a_todo[i].index);
		var a = this.v.append(this.a_todo[i].value, flag, this.a_todo[i].completed);
		a.d.onclick = function(e) {
			return function() {
				_this.v.delete(e);
				_this.a_todo.remove(e);
			}
		}(flag);
		a.c.onclick = function(e) {
			return function(event) {
				_this.v.comple(e);
				_this.a_todo.isCom(e);
			}
		}(flag);
		if(this.a_todo[i].completed == 'true') {
			a.c.checked = 'true';
			a.d.previousSibling.style.backgroundColor = 'blue';
			a.d.previousSibling.style.left = '0%';
			a.d.nextSibling.style.marginRight = '50px';
		}
	}
};


function log_in(username, password) {
	this.username = username;
	this.password = password;
}

function saveUser() {
	var su = new Array();
	su.add = function(un, pw) {
		this.push(new log_in(un, pw));
	};
	su.save = function() {
		var juser = JSON.stringify(this);
		localStorage.setItem('user',juser);
	};
	su.get = function() {
		if(localStorage.getItem('user')) {
			var u = localStorage.getItem('user');
			var u_data = JSON.parse(u);
			for(var i = 0; i<u_data.length; i++) {
				this.add(u_data[i].username, u_data[i].password);
			}
		}
		else {

		}
	};
	su.confirm = function(un, pw) {
		if(this.length) {
			for(var i = 0; i<this.length; i++) {
				if(this[i].username == un && this[i].password == pw) {
					return un;
				}
			}
		}
		else {
			return false;
		}
	};
	return su;
}



var sss = new storageGet();
 // localStorage.clear();
 sessionStorage.setItem('gaga',666);