
require.config({
	baseUrl: 'js/',
	paths: {
		'bad': 'bad',
		'hello': 'hello',
		'world': 'world'
	},
	shim: {
		'bad': {
			init: function() {
				return {
					badC: badConsole,
					badA: badAlert
				}
			}
			//exports: 'badAlert', //这他妈居然要是一个全局变量卧槽
		}
	}
});

require(['hello', 'world', 'bad'], function(hello, world, bad) {
	alert(hello.hello() + world.world());
	bad.badA('dd');			//666
	// console.log(bad);
	console.log(hello);
	document.getElementById('clickBtn').onclick = function() {
		alert(hello.sayHi(document.getElementsByClassName('inputText')[0].value));
	}
});