require.config({
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

define(['bad'], function(bad) {		//这里也要配置...
	var hello = function() {
		return 'Hello~';
	};
	var sayHi = function(word) {
		return 'You are this~' + (word === ''? 'shit' : word);
	}
	var bad1 = bad.badA;
	return {
		hello: hello,
		sayHi: sayHi,
		bad2: bad1
	};
});