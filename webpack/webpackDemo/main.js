// var style = require('./c.css');
// require('./c.css');
// var data = require('data');

require.ensure(['./a.js', './b.js', './c.css', './data.js'], function(require) {
	// var con1 = require('./a');
	// var data = require('./data');
	var con2 = require('./b');
	var style = require('./c.css');
	$('#aa').text();
	// document.getElementById('aa').innerHTML = con1;
	$('#bb').text(con2);
});

// document.write('hello webpack');