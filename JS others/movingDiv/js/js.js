var a = document.getElementsByTagName('div');
var b = document.getElementById('btn');
var num = document.getElementById('num');
var tex = document.getElementById('word');
var accumul = 4;

b.addEventListener('click', function(){
	var d = document.createElement('div');
	d.appendChild(document.createTextNode((accumul++)+tex.value));
	document.body.insertBefore(d, a[num.value]);
});


for(var i = 0; i<a.length; i++ ) {
		a[i].onmousedown = function(pp) {
			return function(event) {
				if(event.target) {
				var scrollTop =  document.documentElement.scrollTop + document.body.scrollTop;
				var disX = event.clientX - event.target.offsetLeft;
				var disY = event.clientY + scrollTop - event.target.offsetTop;
				event.preventDefault();
				this.style.position = 'absolute';
				this.style.zIndex = '99';
				a[pp].onmousemove = function(event) {
					var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
					var l = event.clientX-disX;
					var t = (event.clientY+scrollTop)-disY;
					if(l<0)
					{
						l=0;
					}
					else if(l>document.documentElement.clientWidth-event.target.offsetWidth)
					{
						l=document.documentElement.clientWidth-event.target.offsetWidth;
					}
					this.style.left = l + 'px';
					this.style.top = t + 'px';
				}
				a[pp].onmouseup = function() {
					this.onmousemove=null;
					this.onmouseup=null;
					this.style.zIndex = '0';
				}
			}
		}
	}(i);
}



var bb = document.getElementById('go');

bb.onclick = function() {
	var a = location.href.split('/');console.log(a);
	var b = '';
	for(var i = 0; i < a.length-1; i++) {
		b+=a[i]+'/';
	}
	console.log(b);
	b+='jump.html';
	console.log(b);
 	location.href = b;
}

// localStorage.removeItem('gaga','666');

