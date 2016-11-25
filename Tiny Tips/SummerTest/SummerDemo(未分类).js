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

function ok () { 
	if(!document.getElementById) return false;
	var a = document.getElementById('a'); 
	a.style.background = 'black';
}

console.log(typeof(window.onload));
var message = null;
var num = 8; 
var n = 0  /0;
console.log(isNaN(n));
console.log(Number('123hhh'));
console.log('a'<2);

function changeName(obj) {
  obj.name = 'haha';
}

var person = new Object();
changeName(person);
console.log(person.name);

var scope = 'global';
function t () { 
  console.log(scope);
  var scope = 'local';
  console.log(scope);  
}
t();
console.log(scope);

function Person() {
  this.name = arguments[0];
  this.friend = arguments[1];
}

Person.prototype.sayF = function() {
  console.log(this.friend);
};

var p1 = new Person('bb', ['mary', 'feel']);
p1.sayF();

//闭包函数
// 1、
function aa(){
  var b=10;  
  return function cc(){                          
    b++;
    console.log(b);   
    };  
} 
var d = aa();
console.log(d());

// 2、
function p() {
  var e=0;
  (function pp() {
    e++;
    console.log(e);
  })();
}

console.log(p());

(function(){
  var name = "";
  Person = function(h) {
    name = h;
  }
  Person.prototype.getname = function() {
    console.log(name);
  }
  Person.prototype.setname = function(v) {
    name = v;
  }
})();

var p = new Person('alex');
p.getname();
p.setname('hehe');
p.getname();

var b = 'ff';

function a() {
  var b = 'bb';
  function c() {
    var b = 'dd';
    console.log(this.b);
  }
}

a();

function a() {
  var b = 0;
  (function c() {
    b++;
    console.log(b);
  })();
}

var l = a;
l();
l();

function a() {
  var b = 0;
  return function() {
    b++;
    console.log(b);
  }
}

var l = a();
l();
l();
a();

function outer() {
  return inner();
}

function inner() {
  console.log(inner.caller);
}

outer();

function a (num) {
  this.c = num
}

obj = {
  c:0;
  ch: a;
};

obj.ch(2);
console.log(obj.c);

var a = (function b() { console.log(b); }); 

var obj1 = {
  a: 2,
  foo: y
};

function y() {
  this.a = 10;
}

var k = y.bind(obj1);
k();
console.log(obj1);

function Per() {
  Per.prototype = {
    name: 'haha'
  };
}

var p = new Per();
console.log(p.name);

function isSortable() {
  return typeof object.sort == 'function';
}

isSortable();

function use () {
  return typeof document.createElement == 'function';
}

use();

console.log(window.innerHeight);
console.log(window.innerWidth);
console.log(window.outerWidth);
console.log(window.outerHeight);

console.log(document.URL);
console.log(document.domain);
console.log(document.referrer);

var b = document.getElementsByTagName('div');
console.log(b.namedItem('d').nodeName);




function fun() {
    console.log(this);
}
fun.call(1);
fun.call('a');
fun.call(true);             //输入啥输出啥
fun.call({name:'jack'});




var a = [2,3,4,5,6,7];

console.log(a.prototype.slice());




var a = 2;
b.a = 1;

function b() {
  console.log(this.a);
}

b();
b.call(b);




var a = 2;
b.a = 1;

function b() {
  console.log(this.a);
  c.a = 0;
  (function c() {
    //c.a = 0;
    console.log(this.a);
  })
  c();
}

b();




var a = 2;
b.a = 1;

function b() {
  console.log(this.a);
  //c.a = 0;
  (function c() {
    c.a = 0;
    console.log(this.a);
  }).call(b);
}

b.call(b);






var a = 2;

function b() {
  b.a = 3;
  return function c() {
    return this.a;
  }
}

var l = b();
l.call(b);






var a = 0;
function b() {
  b.a = 1;
  console.log(this.a);
  c();
}
function c () {
  console.log(this.a);
}
b.call(b);



var a = 0;
function b() {
  b.a = 1;
  console.log(this.a);
  (function c () {
    c.a = 2;
  console.log(this.a);
  })();
}

b.call(b);



var a = 0;
function b() {
  b.a = 1;
  c();
}
function c() {
  c.a = 2;
  console.log(this.a);
  d();
}
function d() {
  console.log(this.a)
}
b();




function obj() {
  var p = 10;
if(typeof this.setp != 'function'){
  obj.prototype.setp = function(s) {
    p = s;
  };
}
if(typeof this.getp != 'function'){
  obj.prototype.getp = function() {
    console.log(p);
  };
 }
}
var a = new obj();
a.getp();    10
a.setp(100);
a.getp();    100
var b = new obj();
b.getp();     100
a.getp();     100



function obj() {
  var p = 10;

  obj.prototype.setp = function(s) {
    p = s;
  };

  obj.prototype.getp = function() {
    console.log(p);
  };

 }
var a = new obj();
a.getp();    10
a.setp(100);
a.getp();    100
var b = new obj();
b.getp();     10
a.getp();     10 




(function() {
  var p = 10;

  obj = function() {};

  obj.prototype.setp = function(s) {
    p = s;
  }
  obj.prototype.getp = function() {
    console.log(p);
  }

})();   




function p() {
    var counter = 0;
    return function l() {
        return counter++;
    }
}
var a = p();
console.log(a());
console.log(a());
console.log(a());
var b = p();
console.log(b());
console.log(p()());
console.log(p()());
console.log(p()());         




function p() {
    var counter = 0;
    return function l() {
        return counter++;
    }
}
var a = p();
console.log(a());
console.log(a());
var a = p();
console.log(a());           





function close(){
  var result = new Array();
  for(var i = 0; i < 10; i++) {
    (function closure(num) {
      result[num] = function() {
        return num;
      }
    })(i);
  }
  return result;
}
console.log(close());     




function close(){
  var result = new Array();
  for(var i = 0; i < 10; i++) {
    result[i] = function closure(num) {
      return function() {
        return num;
      }
    }(i);
  }
  return result;
}
console.log(close());         




var i = document.getElementById('bt');
document.body.onclick = function(event) {
  alert(event.currentTarget);
  alert(event.target === i);
}                          



document.addEventListener('keydown', function(){
  event.stopPropagation();
  console.log(event.shiftKey);
}, false);



function a(event){
    event.stopPropagation();
}
var i = document.getElementById('bt');
i.addEventListener('mousedown', a, false);
i.addEventListener('click', function(){return i.id;}, false); 



window.addEventListener('beforeunload', function(event){
  var message = 'yes?';
  event.returnValue = message;
  return message;
})





function a(event){
    event.stopPropagation();
    console.log('haha');
}
function b () {
   console.log('vv');  
}
var i = document.getElementById('bt');
var i2 = document.getElementById('btw');
i.addEventListener('click', a, false);
i2.addEventListener('click', b, false);     



Object.prototype.x = 10;
var w = 20;
var y = 30;
console.log(x);
(function foo(){
  var w = 40;
  var x = 100;
  with({z: 50}) {
    console.log(w,x,y,z);
  }
  console.log(x,w);
  console.log(window.w);
})();                   



var x = 10;
function fzz(){
  console.log(x);
}
function foo(fun) {
  var x = 30;
  console.log(x);
  fun();
}
(function bar(funArg){
  var x = 20;
  funArg(fzz);
})(foo);          



Object.prototype.x = 10;
var w = 20;
var y = 30;
console.log(x);
(function foo(){
  var w = 40;
  var x = 100;
  with({z: 50}) {
    console.log(w,x,y,z);
    function aa() {
      console.log(y);
    }
    aa();
  }
  console.log(x,w);
  console.log(window.w);
})();                   


var a;
function aa() {
  console.log(a);
}
aa();
var a = 20;           



var x = 11;

  function aa(){
    console.log("aa's this"+"---"+this);
    console.log("aa"+"---"+x);
  }
  aa.prototype.x = 13;
  aa.call(aa);
  function bb(){
    var x = 22;
    console.log("bb's this"+"---"+this);
    function cc(){
      console.log("cc's this"+"---"+this);
      console.log("cc"+"---"+x);
    }
    cc();
    aa();
  }
  bb();

var a = bar.bind(foo);

var a = function (){
    bar.call(foo);
}

var b = bar.bind(foo).bind(baz);

var b = function(){
  function () {
    bar.call(foo);
  }
}


function fo() {
  console.log(this);
}

fo.call(2); 




var stu = {
  name : 'bobi',
  age : 10,
  school : 'ollll~'
};

var json = JSON.stringify(stu);
console.log(json);               

var a = 10;

var obj = function() {
  var a = 5;
  this.a = 6;
  this.c = function() {
    console.log(a);
  };
}

var l = new obj();
l.c();                             */  




var a = document.getElementById('lol');
document.onmouseover = function(ev) {
  var e = event || ev;
  if(e.target.className == 'lol') {
    e.target.style.backgroundColor = 'red';
}
  else if(e.target.className == 'olo') {
    e.target.style.backgroundColor = 'blue';
  }
 else if(e.target.className == 'aoa') {
  e.target.style.backgroundColor = 'orange';
 } 
  else if(e.target.className == 'oao') {
  e.target.style.backgroundColor = 'purple';
 } 
  else if(e.target.className == 'sps') {
  e.target.style.backgroundColor = 'green';
 }
}
  document.onmouseout = function(ev) {
    var e = event || ev;
    var d = ['red', 'pink', 'orange', 'green','blue', 'purple','transparent']
    function a() {
      var i = Math.random()*7;
      var i1 = Math.ceil(i);
      e.target.style.backgroundColor = d[i1];
    }
    if(e.target.nodeName == 'BODY') {
      e.target.style.backgroundColor = 'black';
    }
    else {
      var ll = e.target;
      ll.kk = setInterval(a, 300);
      if(ll.backgroundColor == 'transparent') {
        clearInterval(ll.kk);
      }
    }
  }
  
div {
  width:100px;
  height:100px;
  background-color:transparent;
}

.lol, .aoa, .sps {
  display:inline-block;
  transition: background-color 0.2s;
  animation: rako 3s infinite alternate;
  border-radius:30%;
}

.olo, .oao {
  display:inline-block;
  transition: background-color 0.2s;
  animation: rake 6s infinite alternate;
  border-radius:30%;
}

@keyframes rako {
  0% {transform:rotateZ(0deg) scale(1);margin:0px;}
  25% {transform:rotateZ(90deg) scale(0.6);margin:10px;height:100px;}
  50% {transform:rotateZ(-180deg) scale(0.38);margin:-10px;}
  75% {transform:rotateZ(270deg) scale(0.11);margin:5px;height:100px;}
  100% {transform:rotateZ(-360deg) scale(0.09);margin:-5px;}
}

@keyframes rake {
  0% {transform:rotateZ(0deg) scale(1);margin:0px;}
  25% {transform:rotateZ(-90deg) scale(0.8);margin:10px;width:100px;}
  50% {transform:rotateZ(180deg) scale(0.6);margin:-10px;}
  75% {transform:rotateZ(-270deg) scale(0.06);margin:5px;width:100px;}
  100% {transform:rotateZ(360deg) scale(0.09);margin:-5px;}
}
<div class='lol'></div>
<div class='lol'></div>
<div class='lol'></div>
<div class='lol'></div>
<div class='lol'></div>
<div class='olo'></div>
<div class='olo'></div>
<div class='olo'></div>
<div class='olo'></div>
<div class='olo'></div>
<div class='olo'></div>
<div class='olo'></div>
<div class='olo'></div>
<div class='aoa'></div>
<div class='aoa'></div>
<div class='aoa'></div>
<div class='aoa'></div>
<div class='aoa'></div>
<div class='aoa'></div>
<div class='aoa'></div>
<div class='aoa'></div>
<div class='aoa'></div>
<div class='aoa'></div>
<div class='aoa'></div>
<div class='oao'></div>
<div class='oao'></div>
<div class='oao'></div>
<div class='oao'></div>
<div class='oao'></div>
<div class='oao'></div>
<div class='oao'></div>
<div class='oao'></div>
<div class='oao'></div>
<div class='oao'></div>
<div class='oao'></div>
<div class='oao'></div>
<div class='oao'></div>
<div class='sps'></div>
<div class='sps'></div>
<div class='sps'></div>
<div class='sps'></div>
<div class='sps'></div>
<div class='sps'></div>
<div class='sps'></div>
<div class='sps'></div>
<div class='sps'></div>
<div class='sps'></div>
<div class='sps'></div>
<div class='sps'></div>



function a() {
  console.log(this.name);
}
 
var obj = {
  name: 1,
  foo: function(){
    console.log(this.name);
  }
};

var obj2 = {
  name: 2,
  foo: function() {
    (obj.foo = obj.foo)();
  }
}

var obj3 = {
  name : 3,
  foo: (obj = obj)
}
var name = 4;
obj2.foo();
obj3.foo();


var p = {name: 'haha'};
Object.preventExtensions(p);
p.age = 2;
p.name = 'fuck';
console.log(p.name);
console.log(p.age);


var p = {name: 'haha'};
Object.seal(p);
p.age = 2;
p.name = 'fuck';
console.log(p.name);
console.log(p.age);