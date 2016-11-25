function TodoModel() {
	function todo(value, index, com) {
		this.value = value;
		this.index = index;
		this.completed = com;
	}
	var todoAry = new Array();
	return {
		add: function(value, index, com) {
			todoAry.push(new todo(value, index, com));
		},
		remove: function(index) {
			for(var i = 0; i<todoAry.length; i++) {
				if(todoAry[i].index == index) {
					todoAry.splice(i, 1);
				}
			}
		},
		isCom: function(index) {
			for(var i = 0; i<todoAry.length; i++) {
				if(todoAry[i].index == index) {
					if(todoAry[i].completed == 'false') {
						todoAry[i].completed = 'true';
					}
					else {
						todoAry[i].completed = 'false';
					}
				}
			}
		},
		clear: function() {
			for(var i = 0; i<todoAry.length; i++) {
				if(todoAry[i].completed == 'true') {
					todoAry.splice(i, 1);
					i--;
				}
			}
		},
		change: function(index, v, c) {
			var l;
			if(c == 'comple') {
				l = 'true';
			}
			else {
				l = 'false';
			}
			for(var i = 0; i<todoAry.length; i++) {
				if(todoAry[i].index == index) {
					todoAry.splice(i, 1, new todo(v, parseInt(index), l));
				}
			}
		},
		create: function() {
			var key = localStorage.getItem('keyname');
			if(localStorage.getItem('MyTodo' + key)) {
				var jAry = localStorage.getItem('MyTodo' + key);
				var atodo = JSON.parse(jAry);
			}
			else {
				var atodo = [];
			}	
			for(var i = 0; i<atodo.length; i++) {
				todoAry.push(new todo(atodo[i].value, parseInt(atodo[i].index), atodo[i].completed));
			}
			return {a:todoAry,k:key}; 	//返回数组方便view层create
		},
		save: function() {
			var key = localStorage.getItem('keyname');
			var atodo = JSON.stringify(todoAry);
			localStorage.setItem('MyTodo' + key, atodo);
		},
		exit: function() {
			var a = location.href.split('/');
			a[a.length-1] = 'loging.html';
			location.href = a.join('/');
		}
	};
}


function TodoView() {
	var position = document.getElementById('container');
	return {
		add: function(word, index, isCom) {
			var a = '';
			if(isCom == 'true') {
				a = 'comple';
			}
			else {
				a = 'imcom';
			}
			var li = "<label for='"+index+"'>√</label><button class='display' data-num='"+index+"'>X</button><input type='checkbox' id='"+index+"'><div class='"+a+"'>"+ word +"</div>"
			var l = document.createElement('li');
			l.innerHTML = li;
			if(isCom == 'true') {
				l.firstChild.nextSibling.nextSibling.checked = 'true';
				l.firstChild.style.transform = 'scale(1) rotateZ(0deg)';
				l.firstChild.style.color = 'green';
			}
			position.appendChild(l);
			// return l;   //返回节点用于添加事件
		},
		remove: function(index) {
			var but = document.getElementsByTagName('button');
			for(var i = 0; i < but.length; i++) {
				if(but[i].dataset.num == index) {
					var e = i;
					function r() {
						position.removeChild(but[e].parentNode);
					}
					but[i].parentNode.className = 'shortHeight';
					setTimeout(r, 300);
				}
			}
		},
		comple: function(index) {
			var check = document.getElementsByTagName('input');
			for(var i = 0;i < check.length; i++) {
				if(check[i].id == index) {
					if(check[i].checked) {
						check[i].nextSibling.className = 'imcom';
						check[i].previousSibling.previousSibling.style.transform = 'scale(2) rotateZ(-180deg)';
						check[i].previousSibling.previousSibling.style.color = 'white';
					}
					else {
						check[i].nextSibling.className = 'comple';
						check[i].previousSibling.previousSibling.style.transform = 'scale(1) rotateZ(0deg)';
						check[i].previousSibling.previousSibling.style.color = 'green';
					}
				}
			}
		},
		active: function(li) {
			var self = this;
			for(var i = 0; i < li.length; i++) {
				if(li[i].lastChild.className.indexOf('comple') != -1) {
					li[i].className = 'shortHeight';
				}
				else {
				 	li[i].className = 'displays';
				 }
				 li[i].onclick = function(){
				 	 self.active(li);
				 }
			}
		},
		com: function(li) {
			var self = this;
			for(var i = 0; i < li.length; i++) {
				if(li[i].lastChild.className.indexOf('imcom') != -1) {
					li[i].className = 'shortHeight';
				}
				else {
				 	li[i].className = 'displays';
				 }
				 li[i].onclick = function(){
				 	 self.com(li);
				 }
			}
		},
		all: function(li) {
			for(var i = 0; i<li.length; i++) {
				if(li[i].className) {
				 	if(li[i].className.indexOf('shortHeight') != -1) {
				 		li[i].className = 'displays';
				 	}
			 		li[i].onclick = null;
			 	}
			}
		},
		clear: function(li) {
			for(var i = 0;i < li.length; i++) {
			  	if(li[i].lastChild.className.indexOf('comple') != -1) {
			 	  	position.removeChild(li[i]);
			 		i--;
			 	}
			 	position.parentNode.style.width = '520px';
			 	function r () {
			 		position.parentNode.style.width = '75%'; 
			 	}
			 	setTimeout(r, 500);
			}
		},
		create: function(todoA) {
			var self = this;
			for(var i = 0; i < todoA.length; i++) {
				var flag = parseInt(todoA[i].index);
				self.add(todoA[i].value, flag, todoA[i].completed);
			}
		}
	};
}

function TodoController() {
	var m = TodoModel();
	var v = TodoView();
	var accumul;
	var word = document.getElementById('word');
	var all = document.getElementById('all');
	var act = document.getElementById('active');
	var com = document.getElementById('completed');
	var cac = document.getElementById('cac');
	var ul = document.getElementById('container');
	var wel = document.getElementById('wel');
	var exit = document.getElementById('exit');
	window.onload = function() {
		var ary = m.create();
		v.create(ary.a);
		if(ary.a.length > 0) {
			accumul = ary.a[ary.a.length-1].index + 1;
		}
		else {
			accumul = 0;
		}
		wel.innerHTML = 'Welcome! ' + ary.k;
	}
	word.onchange = function() {
		m.add(word.value, accumul, 'false');
		v.add(word.value, accumul, 'false');
		word.value = '';
		accumul++;
	}
	all.onclick = function() {
		var ul = document.getElementsByTagName('li');
		v.all(ul);
	}
	act.onclick = function() {
		var ul = document.getElementsByTagName('li');
		v.active(ul);
	}
	com.onclick = function() {
		var ul = document.getElementsByTagName('li');
		v.com(ul);
	}
	cac.onclick = function() {
		var ul = document.getElementsByTagName('li');
		v.clear(ul);
		m.clear();
	}
	ul.onclick = function(ev) {
		var oEvent = ev||window.event;
		if(oEvent.target.nodeName == 'BUTTON') {
			var num = oEvent.target.getAttribute('data-num');
			v.remove(num);
			m.remove(num);
		}
		else if(oEvent.target.nodeName == 'LABEL') {
			var num = oEvent.target.getAttribute('for');
			v.comple(num);
			m.isCom(num);
		}
		else {

		}
	}
	ul.ondblclick = function(ev) {
		var oEvent = ev||window.event;
		if(oEvent.target.nodeName == 'DIV') {
			var self = oEvent.target;
			console.log(self);
			var context = oEvent.target.innerText;
			oEvent.target.innerHTML = "<input type='text' value ='"+ context +"' class='change' maxlength='30' placeHolder='好好改,不能为空喔' />";
			oEvent.target.firstChild.onchange = function(ev) {
				var oEvent = ev||window.event;
				if(this.value) {
					this.parentNode.innerHTML =  this.value;
					m.change(self.previousSibling.getAttribute('id'), this.value, self.getAttribute('class'));
				}
				else {
					oEvent.preventDefault();
				}
			}
		}
	}
	exit.onclick = function() {
		m.save();
		m.exit();
	}
	window.onbeforeunload = function() {
		m.save();
	}
}

new TodoController();
// localStorage.clear();